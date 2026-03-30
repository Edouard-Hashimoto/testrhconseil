import { d as defineEventHandler } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const index_get = defineEventHandler(async (event) => {
  const db = useDb();
  return await db.prepare("SELECT * FROM equipe ORDER BY id ASC").all();
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
