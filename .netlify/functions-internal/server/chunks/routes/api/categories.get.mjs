import { d as defineEventHandler, a as getQuery } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const categories_get = defineEventHandler(async (event) => {
  const db = useDb();
  const query = getQuery(event);
  if (query.full) {
    const categories2 = await db.prepare(`
      SELECT c1.*, c2.titre as parent_titre 
      FROM categories c1
      LEFT JOIN categories c2 ON c1.parent_id = c2.id
      ORDER BY c1.created_at DESC
    `).all();
    return categories2;
  }
  const categories = await db.prepare("SELECT * FROM categories ORDER BY created_at DESC").all();
  return categories;
});

export { categories_get as default };
//# sourceMappingURL=categories.get.mjs.map
