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

const categories_delete = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.id)) {
    throw createError({ statusCode: 400, statusMessage: "ID requis" });
  }
  const db = useDb();
  await db.prepare("UPDATE services SET category_id = NULL WHERE category_id = ?").run(body.id);
  const stmt = db.prepare("DELETE FROM categories WHERE id = ?");
  await stmt.run(body.id);
  return { success: true };
});

export { categories_delete as default };
//# sourceMappingURL=categories.delete.mjs.map
