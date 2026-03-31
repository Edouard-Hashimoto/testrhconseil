import { d as defineEventHandler } from '../../../_/nitro.mjs';
import { u as useDb } from '../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'better-sqlite3';

const navigation_get = defineEventHandler(async () => {
  const db = useDb();
  const categories = db.prepare("SELECT * FROM categories ORDER BY titre ASC").all();
  const categoriesWithServices = categories.map((cat) => {
    const services = db.prepare("SELECT id, title FROM services WHERE category_id = ? ORDER BY created_at ASC").all(cat.id);
    return {
      ...cat,
      services
    };
  });
  const uncategorizedServices = db.prepare("SELECT id, title FROM services WHERE category_id IS NULL ORDER BY created_at ASC").all();
  return {
    categories: categoriesWithServices,
    uncategorized: uncategorizedServices
  };
});

export { navigation_get as default };
//# sourceMappingURL=navigation.get.mjs.map
