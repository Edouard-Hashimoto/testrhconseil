import { d as defineEventHandler, a as getQuery, c as createError } from '../../../_/nitro.mjs';
import { u as useDb } from '../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'better-sqlite3';

const dbData_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const table = query.table;
  if (!table) {
    throw createError({
      statusCode: 400,
      statusMessage: "Le nom de la table est requis"
    });
  }
  const db = useDb();
  try {
    const existingTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map((t) => t.name);
    if (!existingTables.includes(table)) {
      throw createError({
        statusCode: 404,
        statusMessage: "Table non trouv\xE9e"
      });
    }
    const data = db.prepare(`SELECT * FROM "${table}"`).all();
    return data;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erreur lors de la lecture de la table ${table}`,
      data: error.message
    });
  }
});

export { dbData_get as default };
//# sourceMappingURL=db-data.get.mjs.map
