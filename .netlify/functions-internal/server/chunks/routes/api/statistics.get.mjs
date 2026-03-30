import { d as defineEventHandler, a as getQuery, c as createError } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@libsql/client';

const statistics_get = defineEventHandler(async (event) => {
  const db = useDb();
  const query = getQuery(event);
  const id = query.id;
  if (id) {
    const stat = await db.prepare("SELECT * FROM statistics WHERE id = ?").get(id);
    if (!stat) {
      throw createError({
        statusCode: 404,
        statusMessage: "Statistique non trouv\xE9e"
      });
    }
    return stat;
  }
  const statistics = await db.prepare("SELECT * FROM statistics ORDER BY created_at DESC").all();
  return statistics;
});

export { statistics_get as default };
//# sourceMappingURL=statistics.get.mjs.map
