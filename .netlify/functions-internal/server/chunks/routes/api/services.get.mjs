import { d as defineEventHandler } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const services_get = defineEventHandler(async () => {
  const db = useDb();
  const services = await db.prepare("SELECT * FROM services ORDER BY created_at ASC").all();
  return services;
});

export { services_get as default };
//# sourceMappingURL=services.get.mjs.map
