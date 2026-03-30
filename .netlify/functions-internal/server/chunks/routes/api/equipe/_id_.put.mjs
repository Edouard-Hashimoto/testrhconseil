import { d as defineEventHandler, f as getRouterParam, r as readBody } from '../../../_/nitro.mjs';
import { u as useDb } from '../../../_/db.mjs';
import { r as requireAuth } from '../../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@libsql/client';

const _id__put = defineEventHandler(async (event) => {
  requireAuth(event);
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const { nom, role, image, description } = body;
  const slug = nom.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const db = useDb();
  const stmt = db.prepare("UPDATE equipe SET slug = ?, nom = ?, role = ?, image = ?, description = ? WHERE id = ?");
  await stmt.run(slug, nom, role, image || null, description, id);
  return { success: true };
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
