import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@libsql/client';

const particuliers_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.titre)) {
    throw createError({ statusCode: 400, statusMessage: "Le titre est requis" });
  }
  const db = useDb();
  const stmt = db.prepare("INSERT INTO particuliers (titre, description_courte, description_complete, picto, image, color) VALUES (?, ?, ?, ?, ?, ?)");
  const result = await stmt.run(body.titre, body.description_courte || "", body.description_complete || "", body.picto || null, body.image || null, body.color || "#42B9B5");
  return { id: result.lastInsertRowid, ...body };
});

export { particuliers_post as default };
//# sourceMappingURL=particuliers.post.mjs.map
