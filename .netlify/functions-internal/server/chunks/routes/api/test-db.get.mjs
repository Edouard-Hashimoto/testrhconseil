import { d as defineEventHandler } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'better-sqlite3';

const testDb_get = defineEventHandler(async (event) => {
  const db = useDb();
  const insert = db.prepare("INSERT INTO test (name) VALUES (?)");
  insert.run(`Test at ${(/* @__PURE__ */ new Date()).toISOString()}`);
  const rows = db.prepare("SELECT * FROM test").all();
  return {
    message: "Base de donn\xE9es SQLite op\xE9rationnelle !",
    data: rows
  };
});

export { testDb_get as default };
//# sourceMappingURL=test-db.get.mjs.map
