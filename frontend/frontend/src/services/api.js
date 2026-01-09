const API = 'http://localhost:5000/api';

console.log('API URL:', API);

export async function apiFetch(path, options = {}, withAuth = false) {
  let headers = { 'Content-Type': 'application/json', ...options.headers };
  if (withAuth) {
    const token = JSON.parse(localStorage.getItem('foodhub_user'))?.token;
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API}${path}`, { ...options, headers });
  const text = await res.text();
  
  let data;
  try {
    data = JSON.parse(text);
  } catch(e) {
    console.error('API response is not JSON:', text.substring(0, 100));
    throw new Error(`Server error: ${res.status} ${res.statusText}`);
  }
  
  if (!res.ok) throw new Error(data.message || 'API Error');
  return data;
}








