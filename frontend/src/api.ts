// src/api.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";
console.log("TTT-mini: API baseURL =", baseURL);

export const api = axios.create({
  baseURL,
  headers: {
    "x-org-id": "demo-org",
    "x-role": "admin"
  }
});

export type RAG = "RED" | "AMBER" | "GREEN";
export type Stage = "IDEA" | "POC" | "IN_PROGRESS" | "SCALED" | "DONE";

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
  approach?: "LEAN" | "RPA" | "GENAI" | "PROC_MINING" | "DATA" | "OTHER";
  tech?: string;
  owner?: string;
  rag?: RAG;
  valueUSDDelivered?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export async function listProjects(): Promise<Project[]> {
  const r = await api.get("/api/projects");
  return r.data ?? [];
}

export async function listInitiatives(): Promise<Initiative[]> {
  const r = await api.get("/api/initiatives");
  return r.data ?? [];
}
