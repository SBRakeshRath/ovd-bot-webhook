import ytdl from "@distube/ytdl-core";
import { configDotenv } from "dotenv";
configDotenv()

const host = process.env.PROXY_HOST;
const port = process.env.PROXY_PORT;
const username = process.env.PROXY_USERNAME;
const password = process.env.PROXY_PASSWORD;

const proxyUri = `http://${encodeURIComponent(username)}:${password}@${host}:${port}`;


const ytdlAgent = ytdl.createProxyAgent({ uri: proxyUri });

export default ytdlAgent;
