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
  const user = await db.prepare("SELECT * FROM equipe WHERE id = ?").get(id);
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "Membre non trouv\xE9" });
  }
  return user;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
