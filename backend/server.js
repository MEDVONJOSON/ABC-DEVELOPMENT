import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects as projectSeed } from '../src/data/projects.js';
import { news as newsSeed } from '../src/data/news.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
const uploadDir = path.join(__dirname, 'uploads');
const dbPath = path.join(dataDir, 'db.json');
const port = Number(process.env.API_PORT || 4174);

const resourceSeed = [
  {
    id: 1,
    type: 'Annual Report',
    title: '2023 Annual Report',
    description: 'Our programs, financials, and impact for 2023.',
    size: '2.4 MB',
    fileUrl: '',
    fileName: '',
  },
  {
    id: 2,
    type: 'Publication',
    title: 'Education Program Impact Study',
    description: 'A multi-year study of literacy and enrollment outcomes in partner schools.',
    size: '1.6 MB',
    fileUrl: '',
    fileName: '',
  },
];

const teamMemberSeed = [
  { id: 1, name: 'Mohamed Haddi', role: 'Leadership Team', email: 'Mohamedhaddi@abcdevsl.org', bio: '', image: '' },
  { id: 2, name: 'Nabieu Conteh', role: 'Programs Team', email: 'Nabieuconteh@abcdevsl.org', bio: '', image: '' },
  { id: 3, name: 'Bafoday Suma', role: 'Operations Team', email: 'Bafoday.suma@abcsl.org', bio: '', image: '' },
];

const termsSeed = [
  {
    id: 1,
    title: 'Terms & Conditions',
    content:
      'By using this website, visitors agree to use ABC Development content, resources, and contact channels respectfully and lawfully.\n\nWebsite content is provided for information about our programs, reports, news, and community development work. Documents may be downloaded for personal, educational, or partner reference.\n\nABC Development may update website content, resources, and these terms as programs and organizational needs change.',
    updatedAt: new Date().toISOString(),
  },
];

const privacySeed = [
  {
    id: 1,
    title: 'Privacy Policy',
    content:
      'ABC Development respects the privacy of visitors, partners, volunteers, and community members who contact us through this website.\n\nInformation submitted through forms or email links is used to respond to inquiries, coordinate programs, manage partnerships, and improve our services.\n\nWe do not sell personal information. Access to submitted information is limited to authorized team members who need it for organizational work.',
    updatedAt: new Date().toISOString(),
  },
];

const defaultDb = {
  projects: projectSeed,
  news: newsSeed,
  blogs: [],
  resources: resourceSeed,
  teamMembers: teamMemberSeed,
  terms: termsSeed,
  privacy: privacySeed,
};

const collections = new Set(['projects', 'news', 'blogs', 'resources', 'teamMembers', 'terms', 'privacy']);
const allowedExtensions = new Set(['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg', '.webp']);

async function ensureDb() {
  await mkdir(dataDir, { recursive: true });
  await mkdir(uploadDir, { recursive: true });
  if (!existsSync(dbPath)) {
    await writeFile(dbPath, JSON.stringify(defaultDb, null, 2));
  }
}

async function readDb() {
  await ensureDb();
  const db = JSON.parse(await readFile(dbPath, 'utf8'));
  let changed = false;

  for (const [key, value] of Object.entries(defaultDb)) {
    if (!Array.isArray(db[key])) {
      db[key] = value;
      changed = true;
    }
  }

  if (changed) await writeDb(db);
  return db;
}

async function writeDb(db) {
  await writeFile(dbPath, JSON.stringify(db, null, 2));
}

function send(res, status, data, headers = {}) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...headers,
  });
  res.end(JSON.stringify(data));
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function parseMultipart(buffer, contentType) {
  const boundary = contentType.match(/boundary=(.+)$/)?.[1];
  if (!boundary) return { fields: {}, file: null };

  const raw = buffer.toString('binary');
  const parts = raw.split(`--${boundary}`).slice(1, -1);
  const fields = {};
  let file = null;

  for (const part of parts) {
    const clean = part.replace(/^\r\n/, '').replace(/\r\n$/, '');
    const splitAt = clean.indexOf('\r\n\r\n');
    if (splitAt === -1) continue;

    const rawHeaders = clean.slice(0, splitAt);
    const body = clean.slice(splitAt + 4);
    const name = rawHeaders.match(/name="([^"]+)"/)?.[1];
    const filename = rawHeaders.match(/filename="([^"]*)"/)?.[1];
    const content = Buffer.from(body, 'binary');

    if (filename) {
      file = {
        field: name,
        filename,
        contentType: rawHeaders.match(/Content-Type:\s*([^\r\n]+)/i)?.[1] || 'application/octet-stream',
        content,
      };
    } else if (name) {
      fields[name] = content.toString('utf8');
    }
  }

  return { fields, file };
}

async function parseRequest(req) {
  const contentType = req.headers['content-type'] || '';
  const body = await getBody(req);

  if (contentType.includes('multipart/form-data')) {
    return parseMultipart(body, contentType);
  }

  if (!body.length) return { fields: {}, file: null };
  return { fields: JSON.parse(body.toString('utf8')), file: null };
}

async function saveUpload(file) {
  if (!file || !file.filename) return null;

  const extension = path.extname(file.filename).toLowerCase();
  if (!allowedExtensions.has(extension)) {
    throw new Error('Unsupported file type. Upload PDF, Word document, or image files only.');
  }

  const safeBase = slugify(path.basename(file.filename, extension)) || 'upload';
  const storedName = `${Date.now()}-${safeBase}${extension}`;
  await writeFile(path.join(uploadDir, storedName), file.content);

  return {
    fileName: file.filename,
    fileUrl: `/uploads/${storedName}`,
    size: `${(file.content.length / 1024 / 1024).toFixed(1)} MB`,
  };
}

function normalizeRecord(collection, values, upload) {
  const record = { ...values };
  record.id = record.id ? Number(record.id) : Date.now();
  record.slug = record.slug || slugify(record.title);

  if (collection === 'projects') {
    record.beneficiaries = Number(record.beneficiaries || 0);
    record.image = upload?.fileUrl || record.image || '/images/featured.png';
    record.districts = record.location ? String(record.location).split(',').map((item) => item.trim()) : [];
    record.duration = record.duration || 'Current';
    record.budget = record.budget || 'TBD';
    record.partners = Array.isArray(record.partners) ? record.partners : [];
    record.objectives = Array.isArray(record.objectives) ? record.objectives : [];
    record.story = record.story || record.summary || '';
  }

  if (collection === 'news' || collection === 'blogs') {
    record.cover = upload?.fileUrl || record.cover || '/images/hero-community.jpg';
    record.author = record.author || 'ABC Development Team';
    record.date = record.date || new Date().toISOString().slice(0, 10);
    record.body = Array.isArray(record.body)
      ? record.body
      : String(record.body || record.excerpt || '').split(/\n{2,}/).filter(Boolean);
  }

  if (collection === 'resources') {
    record.type = record.type || 'Publication';
    record.description = record.description || '';
    record.fileName = upload?.fileName || record.fileName || '';
    record.fileUrl = upload?.fileUrl || record.fileUrl || '';
    record.size = upload?.size || record.size || '';
  }

  if (collection === 'teamMembers') {
    record.name = record.name || record.title || '';
    record.title = record.name;
    record.role = record.role || '';
    record.email = record.email || '';
    record.bio = record.bio || '';
    record.image = upload?.fileUrl || record.image || '';
  }

  if (collection === 'terms' || collection === 'privacy') {
    record.title = record.title || (collection === 'terms' ? 'Terms & Conditions' : 'Privacy Policy');
    record.content = record.content || '';
    record.updatedAt = new Date().toISOString();
  }

  return record;
}

async function handleApi(req, res, pathname) {
  const [, , collection, rawId] = pathname.split('/');
  if (!collections.has(collection)) {
    send(res, 404, { error: 'Unknown collection.' });
    return;
  }

  const db = await readDb();

  if (req.method === 'GET') {
    send(res, 200, db[collection] || []);
    return;
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    const { fields, file } = await parseRequest(req);
    const upload = await saveUpload(file);
    const record = normalizeRecord(collection, fields, upload);
    const list = db[collection] || [];

    db[collection] =
      req.method === 'PUT'
        ? list.map((item) => (String(item.id) === String(rawId) ? { ...item, ...record, id: item.id } : item))
        : [record, ...list];

    await writeDb(db);
    send(res, req.method === 'POST' ? 201 : 200, record);
    return;
  }

  if (req.method === 'DELETE') {
    db[collection] = (db[collection] || []).filter((item) => String(item.id) !== String(rawId));
    await writeDb(db);
    send(res, 200, { ok: true });
    return;
  }

  send(res, 405, { error: 'Method not allowed.' });
}

async function handleUpload(req, res, pathname) {
  const filename = decodeURIComponent(pathname.replace('/uploads/', ''));
  const target = path.join(uploadDir, path.basename(filename));
  if (!existsSync(target)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const extension = path.extname(filename).toLowerCase();
  const contentType = extension === '.pdf'
    ? 'application/pdf'
    : extension === '.doc'
      ? 'application/msword'
      : extension === '.docx'
        ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        : 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
  });
  res.end(await readFile(target));
}

await ensureDb();

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'OPTIONS') {
      send(res, 200, { ok: true });
      return;
    }

    if (url.pathname === '/api/health') {
      send(res, 200, { ok: true });
      return;
    }

    if (url.pathname.startsWith('/api/')) {
      await handleApi(req, res, url.pathname);
      return;
    }

    if (url.pathname.startsWith('/uploads/')) {
      await handleUpload(req, res, url.pathname);
      return;
    }

    send(res, 404, { error: 'Not found.' });
  } catch (error) {
    send(res, 500, { error: error.message || 'Server error.' });
  }
}).listen(port, () => {
  console.log(`ABC Development API running at http://127.0.0.1:${port}`);
});
