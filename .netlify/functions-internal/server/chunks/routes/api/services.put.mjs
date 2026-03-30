import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const services_put = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.id)) {
    throw createError({ statusCode: 400, statusMessage: "L'id est requis" });
  }
  const db = useDb();
  db.prepare("UPDATE services SET title = ?, color = ?, logo = ?, description = ?, category_id = ? WHERE id = ?").run(body.title, body.color, (_a = body.logo) != null ? _a : null, (_b = body.description) != null ? _b : null, (_c = body.category_id) != null ? _c : null, body.id);
  return { success: true };
});

export { services_put as default };
//# sourceMappingURL=services.put.mjs.map
