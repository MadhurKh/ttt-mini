import { useEffect, useState } from 'react';
import { listInitiatives, createInitiative } from './api';
export default function Initiatives(){
  const [items,setItems]=useState<any[]>([]);
  const [form,setForm]=useState<any>({projectId:'',title:'',owner:'',rag:'GREEN'});
  const load=async()=>setItems(await listInitiatives());
  useEffect(()=>{load()},[]);
  return <div style={{padding:20}}>
    <h2>Initiatives</h2>
    <div>
      <input placeholder="Project ID" value={form.projectId} onChange={e=>setForm({...form,projectId:e.target.value})}/>
      <input placeholder="Title"      value={form.title}     onChange={e=>setForm({...form,title:e.target.value})}/>
      <input placeholder="Owner"      value={form.owner}     onChange={e=>setForm({...form,owner:e.target.value})}/>
      <select value={form.rag} onChange={e=>setForm({...form,rag:e.target.value})}>
        <option>GREEN</option><option>AMBER</option><option>RED</option>
      </select>
      <button onClick={async()=>{await createInitiative(form); setForm({projectId:'',title:'',owner:'',rag:'GREEN'}); await load();}}>Add</button>
    </div>
    <ul>{items.map(i=><li key={i.initiativeId}>{i.title} [{i.rag}]</li>)}</ul>
  </div>;
}
