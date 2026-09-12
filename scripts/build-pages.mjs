import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Set the export flag without shell-specific syntax (Windows, macOS and Linux).
const result = spawnSync(process.execPath, [fileURLToPath(import.meta.resolve("next/dist/bin/next")), "build"], {
  stdio: "inherit",
  env: { ...process.env, GITHUB_PAGES: "true" },
});
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
