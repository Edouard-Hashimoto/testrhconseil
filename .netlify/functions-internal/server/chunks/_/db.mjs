import { createClient } from '@libsql/client';

let _client = null;
const useDb = () => {
  if (!_client) {
    const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || "file:data.db";
    const authToken = process.env.TURSO_AUTH_TOKEN;
    const client = createClient({
      url: url.startsWith("libsql://") ? url : `file:${url}`,
      authToken
    });
    _client = {
      client,
      async exec(sql) {
        return await client.execute(sql);
      },
      prepare(sql) {
        return {
          async all(...args) {
            const res = await client.execute({ sql, args: args.length > 0 && Array.isArray(args[0]) ? args[0] : args });
            return res.rows;
          },
          async get(...args) {
            const res = await client.execute({ sql, args: args.length > 0 && Array.isArray(args[0]) ? args[0] : args });
            return res.rows[0];
          },
          async run(...args) {
            return await client.execute({ sql, args: args.length > 0 && Array.isArray(args[0]) ? args[0] : args });
          }
        };
      }
    };
    (async () => {
      try {
        const statements = [
          `CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            date DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
          `CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            color TEXT NOT NULL DEFAULT '#6b21a8',
            logo TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            description TEXT,
            category_id INTEGER
          )`,
          `CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
          )`,
          `CREATE TABLE IF NOT EXISTS particuliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT NOT NULL,
            description_courte TEXT NOT NULL,
            description_complete TEXT NOT NULL,
            picto TEXT,
            image TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            color TEXT DEFAULT '#42B9B5'
          )`,
          `CREATE TABLE IF NOT EXISTS equipe (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT NOT NULL,
            nom TEXT NOT NULL,
            role TEXT NOT NULL,
            description TEXT,
            image TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
          `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT NOT NULL,
            image TEXT,
            description TEXT,
            parent_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
          `CREATE TABLE IF NOT EXISTS statistics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            text TEXT NOT NULL,
            image TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`
        ];
        await client.batch(statements, "write");
        await _client.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`).run("qualiopi_visible", "1");
        await _client.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`).run("qualiopi_text", "La certification qualit\xE9 a \xE9t\xE9 d\xE9livr\xE9e au titre des cat\xE9gories d'actions suivantes :\nACTIONS DE FORMATION\nBILANS DE COMP\xC9TENCES");
        await _client.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`).run("qualiopi_logo", "");
      } catch (e) {
        console.error("Database initialization error:", e);
      }
    })();
  }
  return _client;
};

export { useDb as u };
//# sourceMappingURL=db.mjs.map
