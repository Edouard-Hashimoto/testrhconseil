import { createClient } from '@libsql/client';

let _client: any = null;
let _initPromise: Promise<any> | null = null;

// Initialisation asynchrone des tables
const initializeDatabase = async (client: any, wrapper: any) => {
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

    // Insert default settings
    await wrapper.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`).run('qualiopi_visible', '1');
    await wrapper.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`).run('qualiopi_text', "La certification qualité a été délivrée au titre des catégories d'actions suivantes :\nACTIONS DE FORMATION\nBILANS DE COMPÉTENCES");
    await wrapper.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`).run('qualiopi_logo', '');
    
    console.log('Database initialized successfully');
  } catch (e) {
    console.error('Database initialization error:', e);
    // On ne jette pas l'erreur ici pour laisser les futures requêtes tenter leur chance
  }
};

export const useDb = () => {
  if (!_client) {
    // Utiliser fallback si variables manquantes
    const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || 'file:data.db';
    const authToken = process.env.TURSO_AUTH_TOKEN || '';

    // Détection si on est sur Netlify (Linux) pour choisir le bon driver si nécessaire
    // Mais ici createClient est universel
    const client = createClient({
      url: url,
      authToken: authToken,
    });

    // Wrapper to maintain compatibility
    _client = {
      client,
      async exec(sql: string) {
        if (_initPromise) await _initPromise;
        return await client.execute(sql);
      },
      prepare(sql: string) {
        return {
          async all(...args: any[]) {
            if (_initPromise) await _initPromise;
            const params = args.length > 0 && Array.isArray(args[0]) ? args[0] : args;
            const res = await client.execute({ sql, args: params });
            return res.rows;
          },
          async get(...args: any[]) {
            if (_initPromise) await _initPromise;
            const params = args.length > 0 && Array.isArray(args[0]) ? args[0] : args;
            const res = await client.execute({ sql, args: params });
            return res.rows[0];
          },
          async run(...args: any[]) {
            if (_initPromise) await _initPromise;
            const params = args.length > 0 && Array.isArray(args[0]) ? args[0] : args;
            return await client.execute({ sql, args: params });
          }
        };
      }
    };

    // Lancer l'initialisation et stocker la Promise
    _initPromise = initializeDatabase(client, _client);
  }
  return _client;
};
