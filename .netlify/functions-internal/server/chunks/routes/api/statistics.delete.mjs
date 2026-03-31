import { d as defineEventHandler, a as getQuery, c as createError } from '../../_/nitro.mjs';
import { r as requireAuth } from '../../_/auth.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'better-sqlite3';

const statistics_delete = defineEventHandler(async (event) => {
  requireAuth(event);
  const db = useDb();
  const query = getQuery(event);
  const id = query.id;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID manquant" });
  }
  db.prepare("DELETE FROM statistics WHERE id = ?").run(id);
  return { success: true };
});

export { statistics_delete as default };
//# sourceMappingURL=statistics.delete.mjs.map
