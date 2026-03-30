import { d as defineEventHandler, f as getRouterParam, c as createError } from '../../../_/nitro.mjs';
import { u as useDb } from '../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@libsql/client';

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const db = useDb();
  const service = await db.prepare(`
    SELECT services.*, 
           categories.titre as category_titre, 
           categories.image as category_image, 
           categories.description as category_description 
    FROM services 
    LEFT JOIN categories ON services.category_id = categories.id 
    WHERE services.id = ?
  `).get(id);
  if (!service) {
    throw createError({
      statusCode: 404,
      statusMessage: "Service non trouv\xE9"
    });
  }
  return service;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
