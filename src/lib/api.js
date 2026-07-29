const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function apiUrl(path) {
  return `${apiBaseUrl}${path}`;
}

function assetUrl(value) {
  if (!value || typeof value !== 'string') return value;
  if (!apiBaseUrl || !value.startsWith('/uploads/')) return value;
  return `${apiBaseUrl}${value}`;
}

function normalizeRecord(record) {
  return {
    ...record,
    image: assetUrl(record.image),
    cover: assetUrl(record.cover),
    fileUrl: assetUrl(record.fileUrl),
  };
}

export async function getCollection(collection, fallback = []) {
  try {
    const response = await fetch(apiUrl(`/api/${collection}`), {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`Failed to load ${collection}`);
    const data = await response.json();
    return Array.isArray(data) ? data.map(normalizeRecord) : fallback;
  } catch {
    return fallback;
  }
}

export async function saveRecord(collection, values, file, id) {
  const form = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      form.append(key, value);
    }
  });

  if (file) {
    form.append('file', file);
  }

  const response = await fetch(apiUrl(id ? `/api/${collection}/${id}` : `/api/${collection}`), {
    method: id ? 'PUT' : 'POST',
    body: form,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Unable to save content.');
  }

  return normalizeRecord(await response.json());
}

export async function deleteRecord(collection, id) {
  const response = await fetch(apiUrl(`/api/${collection}/${id}`), {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Unable to delete content.');
  }
}
