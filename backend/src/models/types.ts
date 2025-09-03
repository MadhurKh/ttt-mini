export type RAG = "RED" | "AMBER" | "GREEN";
export type Stage = "IDEA" | "POC" | "IN_PROGRESS" | "SCALED" | "DONE";
export type Approach = "LEAN" | "RPA" | "GENAI" | "PROC_MINING" | "DATA" | "OTHER";

export interface Project {
  orgId: string;
  projectId: string;
  name: string;
  problem?: string;
  solution?: string;
  owner?: string;
  sponsor?: string;
  stage?: Stage;
  rag?: RAG;
  valueUSDTarget?: number;
  valueUSDDelivered?: number;
  startDate?: string;
  targetEndDate?: string;
  actualEndDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Initiative {
  orgId: string;
  initiativeId: string;
  projectId: string;
  title: string;
  approach?: Approach;
  tech?: string;
  owner?: string;
  rag?: RAG;
  valueUSDDelivered?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}