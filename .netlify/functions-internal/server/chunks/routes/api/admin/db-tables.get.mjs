import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { u as useDb } from '../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const dbTables_get = defineEventHandler(async (event) => {
  const db = useDb();
  try {
    const tables = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
    return tables;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de la r\xE9cup\xE9ration des tables",
      data: error.message
    });
  }
});

export { dbTables_get as default };
//# sourceMappingURL=db-tables.get.mjs.map
