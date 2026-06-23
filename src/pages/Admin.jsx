import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Database,
  Edit,
  Eye,
  FileText,
  LayoutDashboard,
  Lock,
  LogIn,
  Mail,
  Newspaper,
  Plus,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
  Users,
  X,
} from 'lucide-react';
import { categories } from '../data/projects.js';
import { deleteRecord, getCollection, saveRecord } from '../lib/api.js';

const tabs = [
  { id: 'projects', label: 'Projects', icon: LayoutDashboard },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'blogs', label: 'Blogs', icon: Edit },
  { id: 'resources', label: 'Resources', icon: FileText },
  { id: 'teamMembers', label: 'Team Members', icon: Users },
  { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  { id: 'privacy', label: 'Privacy Policy', icon: Lock },
];

const emptyRecords = {
  projects: {
    title: '',
    category: 'education',
    location: '',
    beneficiaries: '',
    summary: '',
    duration: 'Current',
    budget: 'TBD',
  },
  news: {
    title: '',
    category: 'education',
    date: new Date().toISOString().slice(0, 10),
    author: 'ABC Development Team',
    excerpt: '',
    body: '',
  },
  blogs: {
    title: '',
    category: 'education',
    date: new Date().toISOString().slice(0, 10),
    author: 'ABC Development Team',
    excerpt: '',
    body: '',
  },
  resources: {
    title: '',
    type: 'Publication',
    description: '',
  },
  teamMembers: {
    name: '',
    role: '',
    email: '',
    bio: '',
  },
  terms: {
    title: 'Terms & Conditions',
    content: '',
  },
  privacy: {
    title: 'Privacy Policy',
    content: '',
  },
};

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        <div>
          <div className="text-xs text-slate-500">{label}</div>
          <div className="font-display font-bold text-2xl text-slate-900">{value}</div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function fileLabel(type) {
  if (type === 'resources') return 'Upload PDF or Word document';
  if (type === 'projects') return 'Upload project image';
  if (type === 'teamMembers') return 'Upload team member photo';
  return 'Upload cover image';
}

function singularLabel(tab) {
  if (tab.id === 'teamMembers') return 'Team Member';
  if (tab.id === 'terms') return 'Terms Page';
  if (tab.id === 'privacy') return 'Privacy Page';
  return tab.label.slice(0, -1);
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [query, setQuery] = useState('');
  const [records, setRecords] = useState({
    projects: [],
    news: [],
    blogs: [],
    resources: [],
    teamMembers: [],
    terms: [],
    privacy: [],
  });
  const [modal, setModal] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const loadRecords = async () => {
    const [projects, news, blogs, resources, teamMembers, terms, privacy] = await Promise.all([
      getCollection('projects'),
      getCollection('news'),
      getCollection('blogs'),
      getCollection('resources'),
      getCollection('teamMembers'),
      getCollection('terms'),
      getCollection('privacy'),
    ]);
    setRecords({ projects, news, blogs, resources, teamMembers, terms, privacy });
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if ((cleanEmail === 'abcdevelopmentsl.org' || cleanEmail === 'admin@abcdevelopmentsl.org') && password === '1234') {
      setAuthed(true);
      setStatus('');
    } else {
      setStatus('Invalid email or password.');
    }
  };

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return records[activeTab];

    return records[activeTab].filter((item) =>
      [item.title, item.name, item.role, item.email, item.category, item.type, item.location, item.author, item.summary, item.excerpt, item.description, item.content]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search))
    );
  }, [activeTab, query, records]);

  const openCreate = () => {
    setFile(null);
    setModal({ type: activeTab, mode: 'create', values: emptyRecords[activeTab] });
  };

  const openEdit = (type, item) => {
    setFile(null);
    setModal({
      type,
      mode: 'edit',
      values: {
        ...emptyRecords[type],
        ...item,
        beneficiaries: item.beneficiaries ? String(item.beneficiaries) : '',
        body: Array.isArray(item.body) ? item.body.join('\n\n') : item.body || '',
        content: item.content || '',
      },
    });
  };

  const updateModalValue = (field, value) => {
    setModal((current) => ({
      ...current,
      values: { ...current.values, [field]: value },
    }));
  };

  const saveModal = async (e) => {
    e.preventDefault();
    setStatus('Saving...');

    try {
      await saveRecord(
        modal.type,
        modal.values,
        file,
        modal.mode === 'edit' ? modal.values.id : null
      );
      await loadRecords();
      setModal(null);
      setFile(null);
      setStatus('Saved.');
    } catch (error) {
      setStatus(error.message);
    }
  };

  const removeItem = async (type, id) => {
    setStatus('Deleting...');
    try {
      await deleteRecord(type, id);
      await loadRecords();
      setStatus('Deleted.');
    } catch (error) {
      setStatus(error.message);
    }
  };

  if (!authed) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-500/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-sky-500/20 blur-[120px]" />
        </div>

        <div className="container-page max-w-md relative z-10 w-full">
          <div className="card p-8 md:p-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl">
            <div className="flex justify-center mb-8">
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <img
                  src="/images/logo.png"
                  alt="ABC Development logo"
                  className="h-12 w-auto"
                />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="font-display font-bold text-3xl text-white">Welcome Back</h1>
              <p className="text-slate-300 mt-2 text-sm">Sign in to the admin dashboard.</p>
            </div>

            {status && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-100 text-sm text-center">
                {status}
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Email address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white/10 transition-all"
                    placeholder="abcdevelopmentsl.org"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white/10 transition-all"
                    placeholder="••••"
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-teal-500 text-white font-bold text-lg hover:from-brand-600 hover:to-teal-600 shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5">
                Sign In
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link to="/" className="text-sm text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                <ArrowRight size={14} className="rotate-180" /> Return to website
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <h1 className="font-display font-bold text-lg text-slate-800 hidden sm:block">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 mr-4 bg-slate-100 px-3 py-1.5 rounded-full">
              <Settings size={14} />
              <span>{status || 'All systems operational'}</span>
            </div>
            <Link to="/" className="text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors flex items-center gap-1.5 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg">
              <Eye size={16} /> <span className="hidden sm:inline">View Site</span>
            </Link>
            <button onClick={() => setAuthed(false)} className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Content Modules</h2>
            </div>
            <div className="p-2 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setQuery('');
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive 
                        ? 'bg-brand-50 text-brand-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-brand-600' : 'text-slate-400'} /> 
                    {tab.label}
                    
                    {/* Count badge */}
                    {records[tab.id]?.length > 0 && (
                      <span className={`ml-auto text-xs py-0.5 px-2 rounded-full ${isActive ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'}`}>
                        {records[tab.id].length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={FileText} label="Projects" value={records.projects.length} color="bg-blue-100 text-blue-700" />
            <StatCard icon={Newspaper} label="News & Updates" value={records.news.length} color="bg-emerald-100 text-emerald-700" />
            <StatCard icon={Users} label="Team Members" value={records.teamMembers.length} color="bg-purple-100 text-purple-700" />
            <StatCard icon={Database} label="Resources" value={records.resources.length} color="bg-amber-100 text-amber-700" />
          </div>

          {/* Data Table Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Table Header / Toolbar */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
              <h2 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2">
                {tabs.find(t => t.id === activeTab)?.label} Management
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-shadow"
                    placeholder="Search records..."
                  />
                </div>
                <button type="button" onClick={openCreate} className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
                  <Plus size={16} /> <span className="hidden sm:inline">New {singularLabel(tabs.find((tab) => tab.id === activeTab))}</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-white text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">{activeTab === 'teamMembers' ? 'Name' : 'Title'}</th>
                    <th className="px-6 py-4 font-semibold">{activeTab === 'resources' ? 'Type' : activeTab === 'teamMembers' ? 'Role' : activeTab === 'terms' || activeTab === 'privacy' ? 'Page' : 'Category'}</th>
                    <th className="px-6 py-4 font-semibold">{activeTab === 'projects' ? 'Location' : activeTab === 'resources' ? 'File' : activeTab === 'teamMembers' ? 'Email' : activeTab === 'terms' || activeTab === 'privacy' ? 'Updated' : 'Date'}</th>
                    <th className="px-6 py-4 font-semibold hidden md:table-cell">{activeTab === 'projects' ? 'Beneficiaries' : activeTab === 'resources' ? 'Size' : activeTab === 'teamMembers' ? 'Photo' : activeTab === 'terms' || activeTab === 'privacy' ? 'Content' : 'Author'}</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4 font-medium text-slate-900 max-w-[200px] truncate">{item.name || item.title}</td>
                      <td className="px-6 py-4 capitalize text-slate-600">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium">
                          {item.role || item.type || item.category || item.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {activeTab === 'projects' && item.location}
                        {(activeTab === 'news' || activeTab === 'blogs') && item.date}
                        {activeTab === 'resources' && (item.fileUrl ? <a className="text-brand-600 hover:underline font-medium flex items-center gap-1" href={item.fileUrl} target="_blank" rel="noreferrer"><FileText size={14}/> {item.fileName || 'View file'}</a> : 'No file')}
                        {activeTab === 'teamMembers' && item.email}
                        {(activeTab === 'terms' || activeTab === 'privacy') && (item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Not saved')}
                      </td>
                      <td className="px-6 py-4 text-slate-500 hidden md:table-cell truncate max-w-[150px]">
                        {activeTab === 'projects' && Number(item.beneficiaries || 0).toLocaleString()}
                        {(activeTab === 'news' || activeTab === 'blogs') && item.author}
                        {activeTab === 'resources' && item.size}
                        {activeTab === 'teamMembers' && (item.image ? <span className="text-emerald-600 flex items-center gap-1"><CheckCircle size={14}/> Uploaded</span> : 'No photo')}
                        {(activeTab === 'terms' || activeTab === 'privacy') && `${String(item.content || '').slice(0, 42)}...`}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(activeTab, item)} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors shadow-sm" aria-label="Edit">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => removeItem(activeTab, item.id)} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm" aria-label="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <Database size={48} className="mb-4 text-slate-200" />
                          <p className="text-lg font-medium text-slate-600">No {activeTab} found</p>
                          <p className="text-sm mt-1">Try adjusting your search or add a new record.</p>
                          <button onClick={openCreate} className="mt-4 text-brand-600 font-medium hover:underline">
                            Create new {singularLabel(tabs.find((tab) => tab.id === activeTab))}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm px-4 py-6 flex items-center justify-center overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto transform transition-all">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-0.5">
                  {modal.mode === 'edit' ? 'Edit Record' : 'Create New Record'}
                </div>
                <h2 className="font-display font-bold text-xl text-slate-800">
                  {tabs.find((tab) => tab.id === modal.type)?.label}
                </h2>
              </div>
              <button type="button" onClick={() => setModal(null)} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm" aria-label="Close editor">
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto">
              <form id="modal-form" onSubmit={saveModal} className="p-6 space-y-5">
                <Field label={modal.type === 'teamMembers' ? 'Full Name' : 'Title'}>
                  <input
                    type="text"
                    required
                    value={modal.type === 'teamMembers' ? modal.values.name : modal.values.title}
                    onChange={(e) => updateModalValue(modal.type === 'teamMembers' ? 'name' : 'title', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-shadow bg-slate-50 focus:bg-white"
                  />
                </Field>

                {modal.type === 'teamMembers' && (
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Role / Title">
                      <input
                        type="text"
                        required
                        value={modal.values.role}
                        onChange={(e) => updateModalValue('role', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white"
                      />
                    </Field>
                    <Field label="Email Address">
                      <input
                        type="email"
                        value={modal.values.email}
                        onChange={(e) => updateModalValue('email', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white"
                      />
                    </Field>
                  </div>
                )}

                {(modal.type === 'terms' || modal.type === 'privacy') && (
                  <Field label="Page Content (Markdown supported)">
                    <textarea
                      required
                      rows={12}
                      value={modal.values.content}
                      onChange={(e) => updateModalValue('content', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white resize-y font-mono text-sm"
                      placeholder="Enter content here..."
                    />
                  </Field>
                )}

                {modal.type === 'resources' ? (
                  <Field label="Resource Type">
                    <select
                      value={modal.values.type}
                      onChange={(e) => updateModalValue('type', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white"
                    >
                      <option>Annual Report</option>
                      <option>Publication</option>
                      <option>Report</option>
                      <option>Toolkit</option>
                      <option>Research</option>
                    </select>
                  </Field>
                ) : !['teamMembers', 'terms', 'privacy'].includes(modal.type) ? (
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Category">
                      <select
                        value={modal.values.category}
                        onChange={(e) => updateModalValue('category', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </Field>

                    {modal.type === 'projects' ? (
                      <Field label="Number of Beneficiaries">
                        <input
                          type="number"
                          min="0"
                          value={modal.values.beneficiaries}
                          onChange={(e) => updateModalValue('beneficiaries', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white"
                        />
                      </Field>
                    ) : (
                      <Field label="Publish Date">
                        <input
                          type="date"
                          value={modal.values.date}
                          onChange={(e) => updateModalValue('date', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white"
                        />
                      </Field>
                    )}
                  </div>
                ) : null}

                {modal.type === 'teamMembers' && (
                  <Field label="Biography">
                    <textarea
                      rows={5}
                      value={modal.values.bio}
                      onChange={(e) => updateModalValue('bio', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white resize-none"
                    />
                  </Field>
                )}

                {modal.type === 'projects' && (
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Location">
                      <input
                        type="text"
                        value={modal.values.location}
                        onChange={(e) => updateModalValue('location', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white"
                      />
                    </Field>
                    <Field label="Budget">
                      <input
                        type="text"
                        value={modal.values.budget}
                        onChange={(e) => updateModalValue('budget', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white"
                        placeholder="e.g. $50,000 or TBD"
                      />
                    </Field>
                  </div>
                )}

                {(modal.type === 'news' || modal.type === 'blogs') && (
                  <Field label="Author">
                    <input
                      type="text"
                      value={modal.values.author}
                      onChange={(e) => updateModalValue('author', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white"
                    />
                  </Field>
                )}

                {!['teamMembers', 'terms', 'privacy'].includes(modal.type) && (
                  <Field label={modal.type === 'resources' ? 'Description' : modal.type === 'projects' ? 'Summary' : 'Excerpt'}>
                    <textarea
                      required
                      rows={3}
                      value={modal.values.description ?? modal.values.summary ?? modal.values.excerpt}
                      onChange={(e) => updateModalValue(modal.type === 'resources' ? 'description' : modal.type === 'projects' ? 'summary' : 'excerpt', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white resize-none"
                    />
                  </Field>
                )}

                {(modal.type === 'news' || modal.type === 'blogs') && (
                  <Field label={modal.type === 'blogs' ? 'Blog Content' : 'Article Content'}>
                    <textarea
                      rows={8}
                      value={modal.values.body}
                      onChange={(e) => updateModalValue('body', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow bg-slate-50 focus:bg-white resize-y"
                      placeholder="Use a blank line between paragraphs."
                    />
                  </Field>
                )}

                {!['terms', 'privacy'].includes(modal.type) && (
                  <Field label={fileLabel(modal.type)}>
                    <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-brand-400 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload size={24} className="text-slate-400 mb-2" />
                        <p className="text-sm text-slate-600 font-medium">Click to upload file</p>
                        <p className="text-xs text-slate-400 mt-1">{file ? file.name : (modal.type === 'resources' ? 'PDF or Word (.doc, .docx)' : 'PNG, JPG or WebP')}</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept={modal.type === 'resources' ? '.pdf,.doc,.docx' : 'image/png,image/jpeg,image/webp'}
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </Field>
                )}
              </form>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex justify-end gap-3 rounded-b-2xl">
              <button type="button" onClick={() => setModal(null)} className="px-5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 shadow-sm transition-colors">
                Cancel
              </button>
              <button type="submit" form="modal-form" className="px-5 py-2 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-sm shadow-brand-500/20 flex items-center gap-2 transition-colors">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
