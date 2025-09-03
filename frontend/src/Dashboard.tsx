import { useEffect, useState } from 'react';
import { listProjects, listInitiatives } from './api';
export default function Dashboard(){
  const [summary,setSummary]=useState<any>({});
  useEffect(()=>{(async()=>{
    const [projects, initiatives]=await Promise.all([listProjects(), listInitiatives()]);
    const total = projects.reduce((s:any,p:any)=>s+(p.valueUSD||0),0);
    const rag = initiatives.reduce((acc:any,i:any)=>{acc[i.rag||'GREEN']=(acc[i.rag||'GREEN']||0)+1;return acc;},{});
    setSummary({projects:projects.length, initiatives:initiatives.length, valueUSD:total, rag});
  })()},[]);
  return <div style={{padding:20}}>
    <h2>Portfolio Dashboard</h2>
    <pre>{JSON.stringify(summary,null,2)}</pre>
  </div>;
}
