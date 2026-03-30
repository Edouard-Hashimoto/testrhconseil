import { d as defineEventHandler, b as useRuntimeConfig } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const testDb_get = defineEventHandler(async (event) => {
  useRuntimeConfig();
  const diagnostic = {
    dbUrl: process.env.TURSO_DATABASE_URL ? process.env.TURSO_DATABASE_URL.substring(0, 15) + "..." : "MISSING",
    hasToken: !!process.env.TURSO_AUTH_TOKEN,
    nodeVersion: process.version,
    error: null,
    step: "start"
  };
  try {
    const db = useDb();
    diagnostic.step = "connecting";
    const result = await db.prepare("SELECT 1 as test").get();
    diagnostic.step = "connected";
    return {
      status: "success",
      message: "Connexion \xE0 la base de donn\xE9es r\xE9ussie !",
      diagnostic,
      result
    };
  } catch (e) {
    return {
      status: "error",
      message: "\xC9chec du diagnostic de la base de donn\xE9es",
      diagnostic: {
        ...diagnostic,
        error: {
          name: e.name,
          message: e.message,
          stack: e.stack,
          code: e.code
        }
      }
    };
  }
});

export { testDb_get as default };
//# sourceMappingURL=test-db.get.mjs.map
