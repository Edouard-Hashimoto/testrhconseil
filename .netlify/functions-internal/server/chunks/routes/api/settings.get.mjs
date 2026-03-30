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

const settings_get = defineEventHandler(async () => {
  const db = useDb();
  const rows = await db.prepare("SELECT key, value FROM settings").all();
  const settings = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return settings;
});

export { settings_get as default };
//# sourceMappingURL=settings.get.mjs.map
