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

const particuliers_put = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.id)) {
    throw createError({ statusCode: 400, statusMessage: "L'id est requis" });
  }
  const db = useDb();
  db.prepare("UPDATE particuliers SET titre = ?, description_courte = ?, description_complete = ?, picto = ?, image = ?, color = ? WHERE id = ?").run(body.titre, body.description_courte || "", body.description_complete || "", (_a = body.picto) != null ? _a : null, (_b = body.image) != null ? _b : null, body.color || "#42B9B5", body.id);
  return { success: true };
});

export { particuliers_put as default };
//# sourceMappingURL=particuliers.put.mjs.map
