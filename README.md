# TTT-mini — Transformation Tracking Tool (Mini SaaS Demo)

TTT-mini is a **cloud-native SaaS-style platform** for managing transformation initiatives.  
It demonstrates how business leaders can track **Projects → Initiatives → Value delivered** in a structured way, with a modern full-stack architecture.

---

## 🚀 Features

- **Dashboard** with key portfolio stats:
  - Projects & Initiatives count
  - Delivered vs Target business value
  - RAG (Red/Amber/Green) status distribution
  - Projects by stage (Idea → POC → In Progress → Scaled → Done)
- **Projects**
  - Capture problem, solution, sponsor, owner, stage, RAG, target/delivered value, timeline
- **Initiatives**
  - Linked to projects
  - Track approach (Lean, RPA, GenAI, Process Mining…), tech used, RAG, delivered impact
- **Cloud-native backend**
  - Express + TypeScript, deployed as AWS Lambda via Serverless Framework
  - DynamoDB for persistence
- **Frontend**
  - React + Vite + TypeScript
  - Live API integration with Axios
  - Responsive tiles & tables
- **Infrastructure-as-Code**
  - Serverless framework + AWS resources provisioned automatically

---

## 🏗️ Tech Stack

- **Frontend:** React, Vite, Axios, TypeScript
- **Backend:** Express.js, AWS Lambda (via Serverless Framework), TypeScript
- **Database:** DynamoDB (NoSQL, serverless)
- **Cloud:** AWS (API Gateway, Lambda, DynamoDB, IAM)
- **Dev Tools:** GitHub Codespaces, npm, ts-node, curl

---

## 📸 Screenshots (to add later)

- Dashboard view  
- Project detail page  
- Initiative list  

---

## ⚡ Quickstart (Local Dev)

### 1. Backend
```bash
