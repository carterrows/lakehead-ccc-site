import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, relative, resolve, sep } from "node:path";

const root = resolve("dist");
const port = Number.parseInt(process.env.PORT ?? "3030", 10);
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

createServer(async (request, response) => {
  try {
    const rawPath = new URL(request.url ?? "/", "http://localhost").pathname;
    const decodedPath = decodeURIComponent(rawPath);
    let requestedPath = normalize(decodedPath).replace(/^([/\\])+/, "");
    if (!requestedPath || requestedPath.endsWith(sep)) requestedPath = join(requestedPath, "index.html");

    let filePath = resolve(root, requestedPath);
    if (relative(root, filePath).startsWith("..")) throw new Error("Invalid path");

    let fileStat;
    try {
      fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        filePath = join(filePath, "index.html");
        fileStat = await stat(filePath);
      }
    } catch {
      filePath = join(root, "404.html");
      fileStat = await stat(filePath);
      response.statusCode = 404;
    }

    response.setHeader("Content-Type", types[extname(filePath).toLowerCase()] ?? "application/octet-stream");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Cache-Control", extname(filePath) === ".html" ? "no-cache" : "public, max-age=604800");
    response.setHeader("Content-Length", fileStat.size);
    if (request.method === "HEAD") return response.end();
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad request");
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`Lakehead CCC site listening on port ${port}`);
});
