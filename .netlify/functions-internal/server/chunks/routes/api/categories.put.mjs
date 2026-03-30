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

const categories_put = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.id) || !(body == null ? void 0 : body.titre)) {
    throw createError({ statusCode: 400, statusMessage: "ID et titre sont requis" });
  }
  const db = useDb();
  const stmt = db.prepare("UPDATE categories SET titre = ?, image = ?, description = ?, parent_id = ? WHERE id = ?");
  await stmt.run(body.titre, body.image || null, body.description || null, body.parent_id || null, body.id);
  return { success: true };
});

export { categories_put as default };
//# sourceMappingURL=categories.put.mjs.map
