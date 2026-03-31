import { d as defineEventHandler, k as readFormData, c as createError } from '../../_/nitro.mjs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const uploadCategoryImage_post = defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const file = formData.get("file");
  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "Aucun fichier fourni" });
  }
  if (!file.type.startsWith("image/")) {
    throw createError({ statusCode: 400, statusMessage: "Seules les images sont accept\xE9es" });
  }
  const dir = join(process.cwd(), "public", "categories");
  await mkdir(dir, { recursive: true });
  const ext = file.name.split(".").pop();
  const filename = `cat_${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(dir, filename), buffer);
  return { filename };
});

export { uploadCategoryImage_post as default };
//# sourceMappingURL=upload-category-image.post.mjs.map
