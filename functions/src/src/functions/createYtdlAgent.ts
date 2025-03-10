import ytdl from "@distube/ytdl-core";
import { configDotenv } from "dotenv";

configDotenv();

// export default ytdlAgent;

export default function createYtdlAgent() {
  const host = process.env.PROXY_HOST;
  const port = process.env.PROXY_PORT;
  const username = process.env.PROXY_USERNAME;
  const password = process.env.PROXY_PASSWORD;

  const proxyUri = `http://${encodeURIComponent(
    username
  )}:${password}@${host}:${port}`;
  console.log(proxyUri);

  const ytdlAgent = ytdl.createProxyAgent({ uri: proxyUri });

  return ytdlAgent;
}
