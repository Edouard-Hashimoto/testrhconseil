/**
 * Turso HTTP REST API client - aucune dépendance externe.
 * Utilise fetch() natif (disponible dans Node 18+ et sur Netlify).
 * Contourne les problèmes de bundling de @libsql/client sur Netlify.
 */

const TURSO_URL = (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://');
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN || '';

interface TursoRow {
  [key: string]: any;
}

interface TursoResult {
  rows: TursoRow[];
  rowsAffected: number;
  lastInsertRowid?: string;
}

async function tursoExecute(sql: string, args: any[] = []): Promise<TursoResult> {
  if (!TURSO_URL) {
    throw new Error('TURSO_DATABASE_URL is not configured');
  }
  
  const endpoint = `${TURSO_URL}/v2/pipeline`;
  
  const stmtArgs = args.map(a => {
    if (a === null || a === undefined) return { type: 'null' };
    if (typeof a === 'number') return { type: 'integer', value: String(a) };
    return { type: 'text', value: String(a) };
  });
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        { type: 'execute', stmt: { sql, args: stmtArgs } },
        { type: 'close' },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Turso HTTP error ${response.status}: ${errText}`);
  }

  const data: any = await response.json();
  
  if (data.results?.[0]?.type === 'error') {
    throw new Error(`Turso error: ${data.results[0].error?.message}`);
  }
  
  const result = data.results?.[0]?.response?.result;
  if (!result) return { rows: [], rowsAffected: 0 };
  
  const cols = result.cols?.map((c: any) => c.name) || [];
  const rows: TursoRow[] = (result.rows || []).map((row: any[]) => {
    const obj: TursoRow = {};
    cols.forEach((col: string, i: number) => {
      const cell = row[i];
      obj[col] = cell?.value !== undefined ? cell.value : null;
    });
    return obj;
  });
  
  return {
    rows,
    rowsAffected: result.affected_row_count || 0,
    lastInsertRowid: result.last_insert_rowid,
  };
}

async function tursoBatch(statements: string[]): Promise<void> {
  if (!TURSO_URL) {
    throw new Error('TURSO_DATABASE_URL is not configured');
  }
  
  const endpoint = `${TURSO_URL}/v2/pipeline`;
  
  const requests = [
    ...statements.map(sql => ({ type: 'execute', stmt: { sql } })),
    { type: 'close' },
  ];
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Turso batch HTTP error ${response.status}: ${errText}`);
  }
}

// --- Initialisation des tables ---
let _initPromise: Promise<void> | null = null;

async function initializeDatabase(): Promise<void> {
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
      `INSERT OR IGNORE INTO settings (key, value) VALUES ('qualiopi_text', 'La certification qualité a été délivrée au titre des catégories d''actions suivantes :\nACTIONS DE FORMATION\nBILANS DE COMPÉTENCES')`,
      `INSERT OR IGNORE INTO settings (key, value) VALUES ('qualiopi_logo', '')`,
    ]);
    console.log('[db] Database initialized successfully');
  } catch (e) {
    console.error('[db] Database initialization error:', e);
  }
}

// --- Wrapper API compatible avec le code existant ---
const dbWrapper = {
  prepare(sql: string) {
    return {
      async all(...args: any[]): Promise<any[]> {
        if (_initPromise) await _initPromise;
        const params = args.length > 0 && Array.isArray(args[0]) ? args[0] : args;
        const result = await tursoExecute(sql, params);
        return result.rows;
      },
      async get(...args: any[]): Promise<any> {
        if (_initPromise) await _initPromise;
        const params = args.length > 0 && Array.isArray(args[0]) ? args[0] : args;
        const result = await tursoExecute(sql, params);
        return result.rows[0] ?? null;
      },
      async run(...args: any[]): Promise<any> {
        if (_initPromise) await _initPromise;
        const params = args.length > 0 && Array.isArray(args[0]) ? args[0] : args;
        return await tursoExecute(sql, params);
      },
    };
  },
};

export const useDb = () => {
  // Lancer l'init DB une seule fois
  if (!_initPromise) {
    _initPromise = initializeDatabase();
  }
  return dbWrapper;
};
