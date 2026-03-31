import Database from 'better-sqlite3';

let db = null;
const useDb = () => {
  if (!db) {
    const dbPath = process.env.DATABASE_URL || "data.db";
    db = new Database(dbPath, { verbose: console.log });
    db.exec(`
      CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
        parent_id INTEGER REFERENCES categories(id),
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
    const catCols = db.prepare("PRAGMA table_info(categories)").all();
    if (!catCols.some((c) => c.name === "parent_id")) {
      db.exec("ALTER TABLE categories ADD COLUMN parent_id INTEGER REFERENCES categories(id)");
    }
    const cols = db.prepare("PRAGMA table_info(news)").all();
    if (!cols.some((c) => c.name === "image")) {
      db.exec("ALTER TABLE news ADD COLUMN image TEXT");
    }
    const serviceCols = db.prepare("PRAGMA table_info(services)").all();
    if (!serviceCols.some((c) => c.name === "description")) {
      db.exec("ALTER TABLE services ADD COLUMN description TEXT");
    }
    if (!serviceCols.some((c) => c.name === "category_id")) {
      db.exec("ALTER TABLE services ADD COLUMN category_id INTEGER REFERENCES categories(id)");
    }
    const partCols = db.prepare("PRAGMA table_info(particuliers)").all();
    if (!partCols.some((c) => c.name === "color")) {
      db.exec("ALTER TABLE particuliers ADD COLUMN color TEXT DEFAULT '#42B9B5'");
    }
    const insertSetting = db.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`);
    insertSetting.run("qualiopi_visible", "1");
    insertSetting.run("qualiopi_text", "La certification qualit\xE9 a \xE9t\xE9 d\xE9livr\xE9e au titre des cat\xE9gories d'actions suivantes :\nACTIONS DE FORMATION\nBILANS DE COMP\xC9TENCES");
    insertSetting.run("qualiopi_logo", "");
  }
  return db;
};

export { useDb as u };
//# sourceMappingURL=db.mjs.map
