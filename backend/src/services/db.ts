import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
export const ddb = DynamoDBDocumentClient.from(client);
export const tables = {
  projects: process.env.PROJECTS_TABLE!,
  initiatives: process.env.INITIATIVES_TABLE!,
  statusLogs: process.env.STATUS_LOGS_TABLE!
};
