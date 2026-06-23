export async function getCollection(collection, fallback = []) {
  try {
    const response = await fetch(`/api/${collection}`);
    if (!response.ok) throw new Error(`Failed to load ${collection}`);
    return await response.json();
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

  const response = await fetch(id ? `/api/${collection}/${id}` : `/api/${collection}`, {
    method: id ? 'PUT' : 'POST',
    body: form,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Unable to save content.');
  }

  return response.json();
}

export async function deleteRecord(collection, id) {
  const response = await fetch(`/api/${collection}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Unable to delete content.');
  }
}
