import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const output = resolve("out");
const routes = ["/", "/about/", "/production/", "/products/", "/quality/", "/partners/", "/contacts/"];
const configured = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://champio.arcode-dev.ru");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? configured.pathname).replace(/\/$/, "");
const root = `${configured.origin}${basePath}/`;
const indexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";
const canonical = (route) => `${root}${route.slice(1)}`;
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map(([text]) => Object.fromEntries([...text.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)])));
const meta = (html, name) => tags(html, "meta").filter((tag) => tag.name === name || tag.property === name).map((tag) => tag.content);
const text = (html) => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
const htmlByRoute = new Map(routes.map((route) => [route, readFileSync(resolve(output, `.${route}`, "index.html"), "utf8")]));
const graph = (html) => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].flatMap(([, json]) => {
  const data = JSON.parse(json);
  assert.equal(data["@context"], "https://schema.org");
  return data["@graph"] || [data];
});
function walk(value, fn) {
  if (!value || typeof value !== "object") return;
  if (!Array.isArray(value)) fn(value);
  for (const child of Object.values(value)) walk(child, fn);
}

test("all seven pages have unique metadata, one H1 and consistent canonical URLs", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [route, html] of htmlByRoute) {
    assert.match(html, /<html[^>]*lang="ru"/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route);
    const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || "");
    assert.ok(title.includes("Champio") && title.length > 20, route);
    assert.equal((title.match(/Champio/g) || []).length, 1, `${route}: duplicate brand`);
    assert.ok(!titles.has(title), `${route}: duplicate title`);
    titles.add(title);
    const description = meta(html, "description");
    assert.equal(description.length, 1, route);
    assert.ok(description[0].length > 70 && !descriptions.has(description[0]), route);
    descriptions.add(description[0]);
    assert.deepEqual(tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href), [canonical(route)], route);
    assert.deepEqual(meta(html, "og:url"), [canonical(route)], route);
    assert.deepEqual(meta(html, "og:title"), [title], route);
    assert.deepEqual(meta(html, "og:description"), description, route);
    assert.deepEqual(meta(html, "twitter:card"), ["summary_large_image"], route);
    assert.deepEqual(meta(html, "og:image"), [`${root}og.png`], route);
    assert.ok(meta(html, "robots").some((value) => indexable ? /\bindex\b/.test(value) && !/noindex/.test(value) : /noindex/.test(value)), route);
    assert.doesNotMatch(html, /https:\/\/champio-(corporate|supply)\./, route);
    for (const [key, tag] of [["NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION", "google-site-verification"], ["NEXT_PUBLIC_YANDEX_SITE_VERIFICATION", "yandex-verification"]]) {
      if (process.env[key]) assert.deepEqual(meta(html, tag), [process.env[key]], `${route}: verification code`);
    }
  }
});

test("JSON-LD IDs resolve and breadcrumb markup matches visible navigation", () => {
  for (const [route, html] of htmlByRoute) {
    const nodes = graph(html);
    const definitions = new Map();
    walk(nodes, (node) => { if (node["@id"] && node["@type"]) definitions.set(node["@id"], node); });
    walk(nodes, (node) => {
      if (node["@id"] && !node["@type"]) assert.ok(definitions.has(node["@id"]), `${route}: unresolved ${node["@id"]}`);
    });
    const page = definitions.get(`${canonical(route)}#webpage`);
    assert.ok(page, route);
    assert.equal(page.url, canonical(route));
    assert.equal(page.isPartOf["@id"], `${root}#website`);
    assert.equal(page.publisher["@id"], `${root}#organization`);
    const image = new URL(page.primaryImageOfPage.url);
    assert.ok(existsSync(resolve("public", image.pathname.slice(basePath.length + 1))), image.href);
    if (route !== "/") {
      const crumbs = definitions.get(page.breadcrumb["@id"]);
      assert.equal(crumbs["@type"], "BreadcrumbList");
      assert.deepEqual(crumbs.itemListElement.map((item) => item.position), [1, 2]);
      assert.deepEqual(crumbs.itemListElement.map((item) => item.item), [root, canonical(route)]);
      const nav = html.match(/<nav\b[^>]*aria-label="Хлебные крошки"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
      assert.ok(nav, route);
      for (const item of crumbs.itemListElement) assert.ok(text(nav).includes(item.name), `${route}: invisible breadcrumb`);
    }
  }
});

test("product, service and FAQ markup describe visible content without invented offers", () => {
  const html = htmlByRoute.get("/products/");
  const nodes = graph(html);
  const list = nodes.find((node) => node["@type"] === "ItemList");
  assert.equal(list.numberOfItems, 3);
  assert.equal(list.itemListElement.length, 3);
  for (const { item } of list.itemListElement) {
    assert.equal(item["@type"], "Product");
    assert.ok(text(html).includes(item.description));
    assert.ok(text(html).includes(item.size));
    assert.ok(html.includes(`id="${new URL(item.url).hash.slice(1)}"`));
    assert.ok(!item.offers && !item.review && !item.aggregateRating);
  }
  const partners = htmlByRoute.get("/partners/");
  const partnerNodes = graph(partners);
  assert.ok(partnerNodes.some((node) => node["@type"] === "Service"));
  const faq = partnerNodes.find((node) => node["@type"] === "FAQPage");
  assert.equal(faq.mainEntity.length, 5);
  assert.equal((partners.match(/<details\b/g) || []).length, 5);
  for (const question of faq.mainEntity) {
    assert.ok(text(partners).includes(question.name));
    assert.ok(text(partners).includes(question.acceptedAnswer.text));
  }
  const org = graph(htmlByRoute.get("/contacts/")).find((node) => node["@type"] === "Organization");
  const contacts = htmlByRoute.get("/contacts/");
  assert.ok(contacts.includes(`tel:${org.telephone}`));
  assert.ok(contacts.includes(`mailto:${org.email}`));
});

test("internal links, fragment targets and local images exist in the exported site", () => {
  for (const [route, html] of htmlByRoute) {
    for (const { href } of tags(html, "a")) {
      if (!href || /^(mailto:|tel:)/.test(href)) continue;
      const target = new URL(href, canonical(route));
      if (target.origin !== configured.origin) continue;
      const targetRoute = target.pathname.slice(basePath.length).replace(/\/?$/, "/");
      const targetHtml = htmlByRoute.get(targetRoute);
      assert.ok(targetHtml, `${route}: broken internal link ${href}`);
      if (target.hash) assert.ok(targetHtml.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${route}: missing target ${href}`);
    }
    for (const img of tags(html, "img")) {
      // The remote Metrika fallback is an invisible tracking pixel, not content.
      if (img.src === "https://mc.yandex.ru/watch/112723824") {
        assert.equal(img.alt, "", `${route}: tracking pixel must have empty alt`);
        assert.match(img.style ?? "", /position:\s*absolute/, `${route}: tracking pixel must be positioned offscreen`);
        assert.match(img.style ?? "", /left:\s*-9999px/, `${route}: tracking pixel must be positioned offscreen`);
        continue;
      }
      assert.ok(img.alt?.trim(), `${route}: missing alt ${img.src}`);
      assert.ok(Number(img.width) > 0 && Number(img.height) > 0, `${route}: missing image dimensions ${img.src}`);
      const target = new URL(img.src, root);
      assert.ok(existsSync(resolve("public", target.pathname.slice(basePath.length + 1))), img.src);
    }
  }
});

test("robots, image sitemap and 404 follow the indexing policy", () => {
  const sitemap = readFileSync(resolve(output, "sitemap.xml"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => decode(url));
  assert.deepEqual(urls.sort(), indexable ? routes.map(canonical).sort() : []);
  assert.equal((sitemap.match(/<image:loc>/g) || []).length, indexable ? routes.length + 3 : 0);
  assert.doesNotMatch(sitemap, /<lastmod>/);
  const robots = readFileSync(resolve(output, "robots.txt"), "utf8");
  assert.match(robots, /Allow: \//);
  assert.ok(!robots.includes("Disallow: /\n"));
  assert.equal(robots.includes(`Sitemap: ${root}sitemap.xml`), indexable);
  const missing = readFileSync(resolve(output, "404.html"), "utf8");
  assert.ok(meta(missing, "robots").some((value) => value.includes("noindex")));
});
