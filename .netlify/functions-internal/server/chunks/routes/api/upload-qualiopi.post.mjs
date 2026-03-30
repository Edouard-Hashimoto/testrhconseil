import { d as defineEventHandler, k as readFormData, c as createError } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const uploadQualiopi_post = defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const file = await formData.get("file");
  if (!file) throw createError({ statusCode: 400, statusMessage: "Aucun fichier fourni" });
  if (!file.type.startsWith("image/")) throw createError({ statusCode: 400, statusMessage: "Seules les images sont accept\xE9es" });
  const dir = join(process.cwd(), "public", "uploads", "settings");
  await mkdir(dir, { recursive: true });
  const ext = file.name.split(".").pop();
  const filename = `qualiopi_${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(dir, filename), buffer);
  const db = useDb();
  db.prepare(`INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run("qualiopi_logo", `/uploads/settings/${filename}`);
  return { filename, path: `/uploads/settings/${filename}` };
});

export { uploadQualiopi_post as default };
//# sourceMappingURL=upload-qualiopi.post.mjs.map
