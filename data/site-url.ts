const defaultSiteUrl = "https://champio-corporate.ntcoder-1.chatgpt.site";
const configuredSiteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
);

export const basePath = (
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (configuredSiteUrl.pathname === "/" ? "" : configuredSiteUrl.pathname)
).replace(/\/$/, "");

export const siteOrigin = configuredSiteUrl.origin;
export const siteUrl = `${siteOrigin}${basePath}`;

export function withBasePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) {
    return path;
  }

  return `${basePath}${path}`;
}

export function absoluteUrl(path = "/") {
  return new URL(withBasePath(path), `${siteOrigin}/`).toString();
}
