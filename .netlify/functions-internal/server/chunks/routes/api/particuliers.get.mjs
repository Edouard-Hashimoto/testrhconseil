import { d as defineEventHandler } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@libsql/client';

const particuliers_get = defineEventHandler(async () => {
  const db = useDb();
  const particuliers = await db.prepare("SELECT * FROM particuliers ORDER BY created_at ASC").all();
  return particuliers;
});

export { particuliers_get as default };
//# sourceMappingURL=particuliers.get.mjs.map
