// src/pages/Dashboard.tsx
import React, { useEffect, useMemo, useState } from "react";
import { listProjects, listInitiatives, Project, Initiative } from "../api";

type RagKey = "GREEN" | "AMBER" | "RED";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inits, setInits] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [p, i] = await Promise.all([listProjects(), listInitiatives()]);
        if (mounted) {
          setProjects(p);
          setInits(i);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const stats = useMemo(() => {
    const projectsCount = projects.length;
    const initiativesCount = inits.length;
    const valueDelivered =
      (projects.reduce((s, p) => s + (p.valueUSDDelivered || 0), 0)) +
      (inits.reduce((s, x) => s + (x.valueUSDDelivered || 0), 0));
    const pipelineTarget =
      projects.reduce((s, p) => s + (p.valueUSDTarget || 0), 0);

    const rag: Record<RagKey, number> = { GREEN: 0, AMBER: 0, RED: 0 };
    projects.forEach(p => {
      const k = (p.rag || "GREEN") as RagKey;
      rag[k] = (rag[k] ?? 0) + 1;
    });

    const byStage: Record<string, number> = {};
    projects.forEach(p => {
      const st = p.stage || "IN_PROGRESS";
      byStage[st] = (byStage[st] ?? 0) + 1;
    });

    return { projectsCount, initiativesCount, valueDelivered, pipelineTarget, rag, byStage };
  }, [projects, inits]);

  return (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, Arial" }}>
      <h1 style={{ marginBottom: 8 }}>TTT-mini</h1>
      <p style={{ color: "#666", marginTop: 0 }}>Portfolio Dashboard</p>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <>
          {/* Tiles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
            <Tile label="Projects" value={stats.projectsCount} />
            <Tile label="Initiatives" value={stats.initiativesCount} />
            <Tile label="Value Delivered (USD)" value={fmt(stats.valueDelivered)} />
            <Tile label="Pipeline Target (USD)" value={fmt(stats.pipelineTarget)} />
          </div>

          {/* RAG + Stage */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, marginTop: 16 }}>
            <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
              <h3 style={{ marginTop: 0, marginBottom: 12 }}>RAG</h3>
              <div style={{ display: "flex", gap: 8 }}>
                <Badge color="#16a34a" text={`GREEN: ${stats.rag.GREEN}`} />
                <Badge color="#f59e0b" text={`AMBER: ${stats.rag.AMBER}`} />
                <Badge color="#dc2626" text={`RED: ${stats.rag.RED}`} />
              </div>
            </div>
            <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
              <h3 style={{ marginTop: 0, marginBottom: 12 }}>By Stage</h3>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {Object.entries(stats.byStage).map(([k, v]) => (
                  <li key={k}>{k}: {v}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tables */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 16 }}>
            <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
              <h3 style={{ marginTop: 0 }}>Active Projects</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Name", "Owner", "Stage", "RAG", "Target", "Delivered"].map(h => (
                      <th key={h} style={th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p.projectId}>
                      <td style={td}>{p.name}</td>
                      <td style={td}>{p.owner || "-"}</td>
                      <td style={td}>{p.stage || "IN_PROGRESS"}</td>
                      <td style={td}>
                        <span style={ragStyle(p.rag || "GREEN" as RagKey)}>{p.rag || "GREEN"}</span>
                      </td>
                      <td style={td}>{fmt(p.valueUSDTarget || 0)}</td>
                      <td style={td}>{fmt(p.valueUSDDelivered || 0)}</td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr><td style={td} colSpan={6}>No projects yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
              <h3 style={{ marginTop: 0 }}>Recent Initiatives</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Title", "Project", "Approach", "Owner", "RAG", "Value Delivered"].map(h => (
                      <th key={h} style={th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inits.map(x => (
                    <tr key={x.initiativeId}>
                      <td style={td}>{x.title}</td>
                      <td style={td}>{x.projectId}</td>
                      <td style={td}>{x.approach || "-"}</td>
                      <td style={td}>{x.owner || "-"}</td>
                      <td style={td}>
                        <span style={ragStyle(x.rag || "GREEN" as RagKey)}>{x.rag || "GREEN"}</span>
                      </td>
                      <td style={td}>{fmt(x.valueUSDDelivered || 0)}</td>
                    </tr>
                  ))}
                  {inits.length === 0 && (
                    <tr><td style={td} colSpan={6}>No initiatives yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function Badge({ color, text }: { color: string; text: string }) {
  return (
    <span style={{
      background: color, color: "white", padding: "4px 8px",
      borderRadius: 999, fontSize: 12, fontWeight: 600
    }}>
      {text}
    </span>
  );
}

const th: React.CSSProperties = { textAlign: "left", fontSize: 12, color: "#666", borderBottom: "1px solid #eee", padding: "8px 4px" };
const td: React.CSSProperties = { borderBottom: "1px solid #f3f3f3", padding: "8px 4px", fontSize: 14 };

function ragStyle(rag: RagKey): React.CSSProperties {
  const bg = rag === "GREEN" ? "#dcfce7" : rag === "AMBER" ? "#fef3c7" : "#fee2e2";
  const fg = rag === "GREEN" ? "#166534" : rag === "AMBER" ? "#92400e" : "#991b1b";
  return { background: bg, color: fg, padding: "2px 8px", borderRadius: 999, fontSize: 12, fontWeight: 700 };
}

function fmt(n: number) {
  try { return n.toLocaleString("en-US", { maximumFractionDigits: 0 }); }
  catch { return String(n); }
}
