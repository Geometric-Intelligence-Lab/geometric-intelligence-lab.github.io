import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the Geometric Intelligence site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Geometric Intelligence Lab \| Tel Aviv University<\/title>/i);
  assert.match(html, /eometric/);
  assert.match(html, /\/research\/bsb\.png/);
  assert.match(html, /\/research\/geometry-in-style\.png/);
  assert.match(html, /3D Generative AI/);
  assert.match(html, /Itai Lang/);
  assert.match(html, /Recent/);
  assert.match(html, /Rotem Gatenyo/);
  assert.match(html, /\/brand\/gi-logo\.png/);
  assert.match(html, /\/people\/itai-lang\.png/);
  assert.match(html, /\/people\/rotem-gatenyo\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("includes core navigation and contact paths", async () => {
  const html = await (await render()).text();
  assert.match(html, /href="#research"/);
  assert.match(html, /href="#work"/);
  assert.match(html, /href="#people"/);
  assert.match(html, /https:\/\/itailang\.github\.io\//);
  assert.match(html, /https:\/\/rotemgat\.github\.io\//);
  assert.match(html, /linkedin\.com/);
  assert.match(html, /scholar\.google\.com/);
});
