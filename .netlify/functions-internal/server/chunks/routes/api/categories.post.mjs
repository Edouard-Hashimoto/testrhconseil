import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const categories_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.titre)) {
    throw createError({ statusCode: 400, statusMessage: "Le titre est requis" });
  }
  const db = useDb();
  const stmt = db.prepare("INSERT INTO categories (titre, image, description, parent_id) VALUES (?, ?, ?, ?)");
  const result = await stmt.run(body.titre, body.image || null, body.description || null, body.parent_id || null);
  return { id: result.lastInsertRowid, ...body };
});

export { categories_post as default };
//# sourceMappingURL=categories.post.mjs.map
