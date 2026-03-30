import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@libsql/client';

const services_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.title)) {
    throw createError({ statusCode: 400, statusMessage: "Le titre est requis" });
  }
  const db = useDb();
  const stmt = db.prepare("INSERT INTO services (title, color, logo, description, category_id) VALUES (?, ?, ?, ?, ?)");
  const result = await stmt.run(body.title, body.color || "#6b21a8", body.logo || null, body.description || null, body.category_id || null);
  return { id: result.lastInsertRowid, ...body };
});

export { services_post as default };
//# sourceMappingURL=services.post.mjs.map
