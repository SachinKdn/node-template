import dotenv from "dotenv";
import path from "path";

export const loadConfig = () => {
  const env = process.env.NODE_ENV || "development";
  const filepath = path.resolve(process.cwd(), `.env.${env}`);
  dotenv.config({ path: filepath });
};