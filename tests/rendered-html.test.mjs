import assert from "node:assert/strict";
import test from "node:test";

let workerPromise;

function getWorker() {
  if (workerPromise) return workerPromise;
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  workerPromise = import(workerUrl.href).then((module) => module.default);
  return workerPromise;
}

async function fetchSite(path) {
  const worker = await getWorker();
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders complete SEO metadata on the home page", async () => {
  const response = await fetchSite("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<html[^>]*\blang=["']ru["']/i);
  assert.match(html, /<title>Шампиньоны оптом от производителя — Champio<\/title>/i);
  assert.match(html, /<meta(?=[^>]*\bname=["']description["'])[^>]*>/i);
  assert.match(html, /<link(?=[^>]*\brel=["']canonical["'])[^>]*>/i);
  assert.match(html, /<meta(?=[^>]*\bproperty=["']og:image["'])(?=[^>]*og\.png)[^>]*>/i);
  assert.match(html, /<meta(?=[^>]*\bname=["']twitter:card["'])(?=[^>]*summary_large_image)[^>]*>/i);
  assert.match(html, /<script[^>]*type=["']application\/ld\+json["'][^>]*>/i);
  assert.doesNotMatch(html, /codex-preview|chatgpt-auth/i);
});

test("serves robots, sitemap and web manifest", async () => {
  const [robots, sitemap, manifest] = await Promise.all([
    fetchSite("/robots.txt"),
    fetchSite("/sitemap.xml"),
    fetchSite("/manifest.webmanifest"),
  ]);

  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: .*\/sitemap\.xml/i);

  assert.equal(sitemap.status, 200);
  const sitemapXml = await sitemap.text();
  assert.match(sitemapXml, /<urlset/i);
  assert.match(sitemapXml, /\/products/i);

  assert.equal(manifest.status, 200);
  const manifestJson = await manifest.json();
  assert.equal(manifestJson.lang, "ru-RU");
  assert.equal(manifestJson.name, "Champio — свежие шампиньоны оптом");
});

test("every indexable page has one H1, canonical and structured data", async () => {
  const pages = [
    "/",
    "/about",
    "/contacts",
    "/partners",
    "/production",
    "/products",
    "/quality",
  ];

  for (const path of pages) {
    const response = await fetchSite(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${path} must have one H1`);
    assert.match(html, /<link(?=[^>]*\brel=["']canonical["'])[^>]*>/i, path);
    assert.match(html, /<meta(?=[^>]*\bname=["']description["'])[^>]*>/i, path);
    assert.match(html, /<script[^>]*type=["']application\/ld\+json["'][^>]*>/i, path);
  }
});
