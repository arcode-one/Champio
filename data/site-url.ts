const defaultSiteUrl = "https://champio.arcode-dev.ru";
const configuredSiteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
);

if (!/^https?:$/.test(configuredSiteUrl.protocol) || configuredSiteUrl.username || configuredSiteUrl.password || configuredSiteUrl.search || configuredSiteUrl.hash) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) URL without credentials, query or fragment.");
}

export const basePath = (
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (configuredSiteUrl.pathname === "/" ? "" : configuredSiteUrl.pathname)
).replace(/\/$/, "");

export const siteOrigin = configuredSiteUrl.origin;
export const siteUrl = `${siteOrigin}${basePath}`;

export const indexingEnabled = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

export function withBasePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) {
    return path;
  }

  return `${basePath}${path}`;
}

export function absoluteUrl(path = "/") {
  return new URL(withBasePath(path), `${siteOrigin}/`).toString();
}

/** HTML routes follow the deployment's redirect policy; asset URLs do not. */
export function canonicalUrl(path = "/") {
  const url = new URL(absoluteUrl(path));
  url.search = "";
  url.hash = "";
  if (!url.pathname.endsWith("/")) {
    url.pathname += "/";
  }
  return url.toString();
}
