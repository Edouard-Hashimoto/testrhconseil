import { d as defineEventHandler, a as getQuery, c as createError, h as readMultipartFormData } from '../../_/nitro.mjs';
import { r as requireAuth } from '../../_/auth.mjs';
import { u as useDb } from '../../_/db.mjs';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'better-sqlite3';

const statistics_put = defineEventHandler(async (event) => {
  requireAuth(event);
  const db = useDb();
  const query = getQuery(event);
  const id = query.id;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID manquant" });
  }
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: "FormData manquant" });
  }
  let title = "";
  let text = "";
  let imageFilename = void 0;
  for (const item of formData) {
    if (item.name === "title" && item.data) {
      title = item.data.toString();
    } else if (item.name === "text" && item.data) {
      text = item.data.toString();
    } else if (item.name === "image" && item.filename && item.data.length > 0) {
      const ext = item.filename.split(".").pop();
      imageFilename = `stat-${Date.now()}.${ext}`;
      const uploadDir = join(process.cwd(), "public/uploads/stats");
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }
      writeFileSync(join(uploadDir, imageFilename), item.data);
    }
  }
  if (!title || !text) {
    throw createError({
      statusCode: 400,
      statusMessage: "Le titre et le texte sont requis"
    });
  }
  if (imageFilename) {
    db.prepare("UPDATE statistics SET title = ?, text = ?, image = ? WHERE id = ?").run(title, text, imageFilename, id);
  } else {
    db.prepare("UPDATE statistics SET title = ?, text = ? WHERE id = ?").run(title, text, id);
  }
  return { success: true };
});

export { statistics_put as default };
//# sourceMappingURL=statistics.put.mjs.map
