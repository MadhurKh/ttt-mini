export type RAG = "RED" | "AMBER" | "GREEN";
export interface Project {
  orgId: string; projectId: string;
  name: string; owner?: string; valueUSD?: number;
  createdAt: string; updatedAt: string;
}
export interface Initiative {
  orgId: string; projectId: string; initiativeId: string;
  title: string; owner?: string; rag?: RAG;
  createdAt: string; updatedAt: string;
}
