import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'better-sqlite3';

const particuliers_delete = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.id)) {
    throw createError({ statusCode: 400, statusMessage: "L'id est requis" });
  }
  const db = useDb();
  db.prepare("DELETE FROM particuliers WHERE id = ?").run(body.id);
  return { success: true };
});

export { particuliers_delete as default };
//# sourceMappingURL=particuliers.delete.mjs.map
