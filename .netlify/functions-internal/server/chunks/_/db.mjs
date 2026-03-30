const TURSO_URL = (process.env.TURSO_DATABASE_URL || "").replace("libsql://", "https://");
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN || "";
async function tursoExecute(sql, args = []) {
  var _a, _b, _c, _d, _e, _f, _g;
  if (!TURSO_URL) {
    throw new Error("TURSO_DATABASE_URL is not configured");
  }
  const endpoint = `${TURSO_URL}/v2/pipeline`;
  const stmtArgs = args.map((a) => {
    if (a === null || a === void 0) return { type: "null" };
    if (typeof a === "number") return { type: "integer", value: String(a) };
    return { type: "text", value: String(a) };
  });
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${TURSO_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      requests: [
        { type: "execute", stmt: { sql, args: stmtArgs } },
        { type: "close" }
      ]
    })
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Turso HTTP error ${response.status}: ${errText}`);
  }
  const data = await response.json();
  if (((_b = (_a = data.results) == null ? void 0 : _a[0]) == null ? void 0 : _b.type) === "error") {
    throw new Error(`Turso error: ${(_c = data.results[0].error) == null ? void 0 : _c.message}`);
  }
  const result = (_f = (_e = (_d = data.results) == null ? void 0 : _d[0]) == null ? void 0 : _e.response) == null ? void 0 : _f.result;
  if (!result) return { rows: [], rowsAffected: 0 };
  const cols = ((_g = result.cols) == null ? void 0 : _g.map((c) => c.name)) || [];
  const rows = (result.rows || []).map((row) => {
    const obj = {};
    cols.forEach((col, i) => {
      const cell = row[i];
      obj[col] = (cell == null ? void 0 : cell.value) !== void 0 ? cell.value : null;
    });
    return obj;
  });
  return {
    rows,
    rowsAffected: result.affected_row_count || 0,
    lastInsertRowid: result.last_insert_rowid
  };
}
async function tursoBatch(statements) {
  if (!TURSO_URL) {
    throw new Error("TURSO_DATABASE_URL is not configured");
  }
  const endpoint = `${TURSO_URL}/v2/pipeline`;
  const requests = [
    ...statements.map((sql) => ({ type: "execute", stmt: { sql } })),
    { type: "close" }
  ];
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${TURSO_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ requests })
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Turso batch HTTP error ${response.status}: ${errText}`);
  }
}
let _initPromise = null;
async function initializeDatabase() {
  try {
    await tursoBatch([
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
      )`,
      `INSERT OR IGNORE INTO settings (key, value) VALUES ('qualiopi_visible', '1')`,
      `INSERT OR IGNORE INTO settings (key, value) VALUES ('qualiopi_text', 'La certification qualit\xE9 a \xE9t\xE9 d\xE9livr\xE9e au titre des cat\xE9gories d''actions suivantes :
ACTIONS DE FORMATION
BILANS DE COMP\xC9TENCES')`,
      `INSERT OR IGNORE INTO settings (key, value) VALUES ('qualiopi_logo', '')`
    ]);
    console.log("[db] Database initialized successfully");
  } catch (e) {
    console.error("[db] Database initialization error:", e);
  }
}
const dbWrapper = {
  prepare(sql) {
    return {
      async all(...args) {
        if (_initPromise) await _initPromise;
        const params = args.length > 0 && Array.isArray(args[0]) ? args[0] : args;
        const result = await tursoExecute(sql, params);
        return result.rows;
      },
      async get(...args) {
        var _a;
        if (_initPromise) await _initPromise;
        const params = args.length > 0 && Array.isArray(args[0]) ? args[0] : args;
        const result = await tursoExecute(sql, params);
        return (_a = result.rows[0]) != null ? _a : null;
      },
      async run(...args) {
        if (_initPromise) await _initPromise;
        const params = args.length > 0 && Array.isArray(args[0]) ? args[0] : args;
        return await tursoExecute(sql, params);
      }
    };
  }
};
const useDb = () => {
  if (!_initPromise) {
    _initPromise = initializeDatabase();
  }
  return dbWrapper;
};

export { useDb as u };
//# sourceMappingURL=db.mjs.map
