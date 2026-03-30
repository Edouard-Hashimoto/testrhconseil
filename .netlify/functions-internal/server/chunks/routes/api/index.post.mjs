import { d as defineEventHandler, r as readBody } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import { r as requireAuth } from '../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@libsql/client';

const index_post = defineEventHandler(async (event) => {
  requireAuth(event);
  const body = await readBody(event);
  const { nom, role, image, description } = body;
  const slug = nom.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const db = useDb();
  const stmt = db.prepare("INSERT INTO equipe (slug, nom, role, image, description) VALUES (?, ?, ?, ?, ?)");
  const result = await stmt.run(slug, nom, role, image || null, description);
  return { id: result.lastInsertRowid };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
