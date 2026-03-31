import { d as defineEventHandler, r as readBody } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'better-sqlite3';

const settings_put = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDb();
  const upsert = db.prepare(`INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`);
  for (const [key, value] of Object.entries(body)) {
    upsert.run(key, value);
  }
  return { success: true };
});

export { settings_put as default };
//# sourceMappingURL=settings.put.mjs.map
