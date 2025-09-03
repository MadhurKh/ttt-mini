import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';
console.log('TTT-mini: API baseURL =', API);
export const client = axios.create({
  baseURL: API,
  headers: { 'x-org-id': 'demo-org', 'x-role': 'admin' }
});
export async function listProjects(){ const {data}=await client.get('/api/projects'); return data; }
export async function createProject(p:any){ const {data}=await client.post('/api/projects', p); return data; }
export async function listInitiatives(){ const {data}=await client.get('/api/initiatives'); return data; }
export async function createInitiative(i:any){ const {data}=await client.post('/api/initiatives', i); return data; }
