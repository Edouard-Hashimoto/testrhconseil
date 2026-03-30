import { createClient } from '@libsql/client';

let _client: any = null;

export const useDb = () => {
  if (!_client) {
    const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || 'file:data.db';
    const authToken = process.env.TURSO_AUTH_TOKEN;

    const client = createClient({
      url: url.startsWith('libsql://') ? url : `file:${url}`,
      authToken: authToken,
    });

    // Wrapper to maintain compatibility with the .prepare().all() syntax used in the project
    _client = {
      client,
      async exec(sql: string) {
        return await client.execute(sql);
      },
      prepare(sql: string) {
        return {
          async all(...args: any[]) {
            const res = await client.execute({ sql, args: args.length > 0 && Array.isArray(args[0]) ? args[0] : args });
            return res.rows;
          },
          async get(...args: any[]) {
            const res = await client.execute({ sql, args: args.length > 0 && Array.isArray(args[0]) ? args[0] : args });
            return res.rows[0];
          },
          async run(...args: any[]) {
            return await client.execute({ sql, args: args.length > 0 && Array.isArray(args[0]) ? args[0] : args });
          }
        };
      }
    };

    // Async initialization of tables if they don't exist
    // Note: In production with Turso, you might want to use migration scripts instead.
    (async () => {
      try {
        await _client.exec(`
          CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            date DATETIME DEFAULT CURRENT_TIMESTAMP
          );
          CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            color TEXT NOT NULL DEFAULT '#6b21a8',
            logo TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            description TEXT,
            category_id INTEGER
          );
          CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS particuliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT NOT NULL,
            description_courte TEXT NOT NULL,
            description_complete TEXT NOT NULL,
            picto TEXT,
            image TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            color TEXT DEFAULT '#42B9B5'
          );
          CREATE TABLE IF NOT EXISTS equipe (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT NOT NULL,
            nom TEXT NOT NULL,
            role TEXT NOT NULL,
            description TEXT,
            image TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
          CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT NOT NULL,
            image TEXT,
            description TEXT,
            parent_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
          CREATE TABLE IF NOT EXISTS statistics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            text TEXT NOT NULL,
            image TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);

        // Insert default settings
        await _client.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`).run('qualiopi_visible', '1');
        await _client.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`).run('qualiopi_text', "La certification qualité a été délivrée au titre des catégories d'actions suivantes :\nACTIONS DE FORMATION\nBILANS DE COMPÉTENCES");
        await _client.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`).run('qualiopi_logo', '');
      } catch (e) {
        console.error('Database initialization error:', e);
      }
    })();
  }
  return _client;
};

