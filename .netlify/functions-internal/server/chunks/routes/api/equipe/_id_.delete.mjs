import { d as defineEventHandler, f as getRouterParam } from '../../../_/nitro.mjs';
import { u as useDb } from '../../../_/db.mjs';
import { r as requireAuth } from '../../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'better-sqlite3';

const _id__delete = defineEventHandler((event) => {
  requireAuth(event);
  const id = getRouterParam(event, "id");
  const db = useDb();
  const stmt = db.prepare("DELETE FROM equipe WHERE id = ?");
  stmt.run(id);
  return { success: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
