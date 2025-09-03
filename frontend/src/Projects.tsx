import { useEffect, useState } from 'react';
import { listProjects, createProject } from './api';
export default function Projects(){
  const [items,setItems]=useState<any[]>([]);
  const [form,setForm]=useState<any>({name:'',owner:'',valueUSD:0});
  const load=async()=>setItems(await listProjects());
  useEffect(()=>{load()},[]);
  return <div style={{padding:20}}>
    <h2>Projects</h2>
    <div>
      <input placeholder="Name"   value={form.name}   onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Owner"  value={form.owner}  onChange={e=>setForm({...form,owner:e.target.value})}/>
      <input placeholder="Value"  type="number" value={form.valueUSD} onChange={e=>setForm({...form,valueUSD:Number(e.target.value)})}/>
      <button onClick={async()=>{await createProject(form); setForm({name:'',owner:'',valueUSD:0}); await load();}}>Create</button>
    </div>
    <ul>{items.map(p=><li key={p.projectId}>{p.name} — ${p.valueUSD||0}</li>)}</ul>
  </div>;
}
