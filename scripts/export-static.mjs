import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "out");

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, "dist/client"), out, { recursive: true });
await cp(
  path.join(root, "google136550285820a757.html"),
  path.join(out, "google136550285820a757.html"),
);

const workerUrl = pathToFileURL(path.join(root, "dist/server/index.js"));
workerUrl.searchParams.set("static-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://geometric-intelligence-lab.github.io/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Static render failed with ${response.status}`);
const html = await response.text();
if (!html.includes("Geometric Intelligence Lab")) throw new Error("Static render did not contain the site content");

await writeFile(path.join(out, "index.html"), html);
await writeFile(path.join(out, "404.html"), html);
await writeFile(path.join(out, ".nojekyll"), "");

const index = await readFile(path.join(out, "index.html"), "utf8");
console.log(`Exported ${index.length} bytes to out/index.html`);
