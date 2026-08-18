/**
 * One-off uploader: pushes the project's raster images to Cloudinary under
 * stable public IDs, so `src/lib/cloudinary.js` can reference them by name.
 *
 *   node scripts/upload-to-cloudinary.mjs          # upload what is missing
 *   node scripts/upload-to-cloudinary.mjs --force  # re-upload everything
 *
 * Reads the API key/secret from .env, which is gitignored. Nothing in here is
 * imported by the app — the secret must never reach the browser bundle.
 *
 * SVGs are deliberately not included: they are vectors, so Cloudinary's
 * f_auto/q_auto has nothing to optimise, and routing them through a transform
 * pipeline risks rasterising them.
 */
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const FOLDER = "wasif-portfolio";

// Every raster the app references, mapped to the public ID it gets on
// Cloudinary. Keys are paths relative to the repo root.
const ASSETS = {
  "myimg.png": "portrait",
  // Kept at the repo root, not in public/ — Vite copies public/ verbatim into
  // the build whether or not anything references it, so an original left there
  // would still ship the 1.9 MB file this move was meant to remove.
  "journey-visual.png": "journey-visual",
  "src/assets/developer-systems/noise.png": "noise",
  "src/assets/developer-systems/indus-logo.png": "indus-logo",
  "src/assets/developer-systems/indus-shape.png": "indus-shape",
  "src/assets/developer-systems/gradient.png": "gradient",
  "src/assets/developer-systems/gradient02.png": "gradient02",
  // Used only by components that are not currently mounted, moved anyway so
  // nothing is left pointing at a local file.
  "1.png": "glasses-white",
  "2.png": "glasses-black",
  "sunglasses.png": "sunglasses",
  "whiteglass.png": "whiteglass",

  // Project screenshots. These were already on Cloudinary, but on someone
  // else's cloud and delivered as raw PNG with no transform — 18 MB across the
  // five of them. Pulled down and re-hosted here so they run through f_auto.
  "project-shots/offplan-dxb.png": "projects/offplan-dxb",
  "project-shots/petroc-energy.png": "projects/petroc-energy",
  "project-shots/pinnacle.png": "projects/pinnacle",
  "project-shots/abet-global.png": "projects/abet-global",
  "project-shots/vampire-tools.png": "projects/vampire-tools",
};

async function loadEnv() {
  const raw = await readFile(join(ROOT, ".env"), "utf8").catch(() => {
    throw new Error("No .env found. Copy .env.example to .env and fill it in.");
  });

  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (match) env[match[1]] = match[2].trim();
  }

  for (const key of ["VITE_CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"]) {
    if (!env[key]) throw new Error(`Missing ${key} in .env`);
  }

  return env;
}

// Cloudinary signs the alphabetically-sorted params, minus file/api_key, with
// the secret appended.
function sign(params, secret) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return createHash("sha1").update(payload + secret).digest("hex");
}

async function alreadyThere(env, publicId) {
  const auth = Buffer.from(`${env.CLOUDINARY_API_KEY}:${env.CLOUDINARY_API_SECRET}`).toString("base64");
  const url =
    `https://api.cloudinary.com/v1_1/${env.VITE_CLOUDINARY_CLOUD_NAME}` +
    `/resources/image/upload/${encodeURIComponent(`${FOLDER}/${publicId}`)}`;

  const response = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  return response.ok;
}

async function upload(env, relativePath, publicId) {
  const bytes = await readFile(join(ROOT, relativePath));
  const timestamp = Math.floor(Date.now() / 1000);

  const signed = { folder: FOLDER, overwrite: "true", public_id: publicId, timestamp };
  const form = new FormData();
  form.set("file", new Blob([bytes]), basename(relativePath));
  form.set("api_key", env.CLOUDINARY_API_KEY);
  for (const [key, value] of Object.entries(signed)) form.set(key, String(value));
  form.set("signature", sign(signed, env.CLOUDINARY_API_SECRET));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: form },
  );

  const body = await response.json();
  if (!response.ok) throw new Error(body?.error?.message ?? `HTTP ${response.status}`);
  return body;
}

const env = await loadEnv();
const force = process.argv.includes("--force");
let uploaded = 0;
let skipped = 0;

for (const [relativePath, publicId] of Object.entries(ASSETS)) {
  if (!force && (await alreadyThere(env, publicId))) {
    console.log(`skip    ${publicId.padEnd(16)} (already on Cloudinary)`);
    skipped += 1;
    continue;
  }

  try {
    const result = await upload(env, relativePath, publicId);
    console.log(
      `upload  ${publicId.padEnd(16)} ${String(Math.round(result.bytes / 1024)).padStart(5)} KB` +
        `  ${result.width}x${result.height}`,
    );
    uploaded += 1;
  } catch (error) {
    console.error(`FAILED  ${publicId.padEnd(16)} ${error.message}`);
    process.exitCode = 1;
  }
}

console.log(`\n${uploaded} uploaded, ${skipped} already present, folder "${FOLDER}".`);
