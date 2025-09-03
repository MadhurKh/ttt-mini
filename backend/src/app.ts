import "dotenv/config";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import health from "./routes/health.js";
import orgs from "./routes/orgs.js";
import projects from "./routes/projects.js";
import initiatives from "./routes/initiatives.js";
import statusLogs from "./routes/statusLogs.js";
import { authStub } from "./middleware/authStub.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(authStub);

app.use("/health", health);
app.use("/api/orgs", orgs);
app.use("/api/projects", projects);
app.use("/api/initiatives", initiatives);
app.use("/api/status-logs", statusLogs);

export const handler = serverless(app);

if (process.env.LOCAL_DEV === "true") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`TTT-mini backend @ http://localhost:${PORT}`));
}
