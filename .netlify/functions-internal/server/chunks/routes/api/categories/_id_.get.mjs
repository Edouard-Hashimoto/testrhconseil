import { d as defineEventHandler, f as getRouterParam, c as createError } from '../../../_/nitro.mjs';
import { u as useDb } from '../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const db = useDb();
  const category = await db.prepare("SELECT * FROM categories WHERE id = ?").get(id);
  if (!category) {
    throw createError({
      statusCode: 404,
      statusMessage: "Cat\xE9gorie non trouv\xE9e"
    });
  }
  const subcategories = await db.prepare("SELECT * FROM categories WHERE parent_id = ? ORDER BY titre ASC").all(id);
  const services = await db.prepare("SELECT * FROM services WHERE category_id = ? ORDER BY created_at ASC").all(id);
  return {
    ...category,
    subcategories,
    services
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
