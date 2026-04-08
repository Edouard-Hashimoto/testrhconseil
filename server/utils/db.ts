import { createClient } from '@libsql/client';

let _client: ReturnType<typeof createClient> | null = null;

export const useDb = () => {
  if (!_client) {
    const config = useRuntimeConfig();
    
    const url = config.tursoUrl || process.env.TURSO_DATABASE_URL;
    const authToken = config.tursoAuthToken || process.env.TURSO_AUTH_TOKEN;

    if (!url) {
      // Fallback local for dev if no Turso URL
      _client = createClient({
        url: 'file:data.db',
      });
    } else {
      _client = createClient({
        url,
        authToken,
      });
    }
  }
  return _client;
};

// Initialisation de la base de données (optionnel car Turso est persistant)
export const initDb = async () => {
  const db = useDb();
  
  await db.batch([
    `CREATE TABLE IF NOT EXISTS test (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      image TEXT,
      date DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      color TEXT NOT NULL DEFAULT '#6b21a8',
      logo TEXT,
      description TEXT,
      category_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
      color TEXT DEFAULT '#42B9B5',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
    )`,
    `CREATE TABLE IF NOT EXISTS service_categories (
      service_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
      PRIMARY KEY (service_id, category_id),
      FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      email TEXT NOT NULL,
      telephone TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS service_themes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      objectives TEXT NOT NULL,
      FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
    )`
  ], "write");

  // Migration des données existantes vers la table de jointure
  await db.execute(`
    INSERT OR IGNORE INTO service_categories (service_id, category_id)
    SELECT id, category_id FROM services WHERE category_id IS NOT NULL
  `);

  // Initialisation des settings par défaut
  await db.execute({
    sql: "INSERT OR IGNORE INTO settings (key, value) VALUES ('qualiopi_visible', '1')",
    args: []
  });
  await db.execute({
    sql: "INSERT OR IGNORE INTO settings (key, value) VALUES ('qualiopi_text', ?)",
    args: ["La certification qualité a été délivrée au titre des catégories d'actions suivantes :\nACTIONS DE FORMATION\nBILANS DE COMPÉTENCES"]
  });
  await db.execute({
    sql: "INSERT OR IGNORE INTO settings (key, value) VALUES ('qualiopi_logo', '')",
    args: []
  });
};
