// Test minimal - AUCUNE dépendance, pas de DB
export default defineEventHandler(async (event) => {
  const env = {
    hasDbUrl: !!process.env.TURSO_DATABASE_URL,
    dbUrlStart: (process.env.TURSO_DATABASE_URL || '').substring(0, 20),
    hasToken: !!process.env.TURSO_AUTH_TOKEN,
    nodeVersion: process.version,
    platform: process.platform,
  };

  // Test fetch vers Turso
  let fetchResult: any = null;
  try {
    const url = (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://');
    const token = process.env.TURSO_AUTH_TOKEN || '';
    
    const res = await fetch(`${url}/v2/pipeline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          { type: 'execute', stmt: { sql: 'SELECT 1 as test', args: [] } },
          { type: 'close' },
        ],
      }),
    });
    
    const data = await res.json();
    fetchResult = { status: res.status, ok: res.ok, data };
  } catch (e: any) {
    fetchResult = { error: e.message };
  }

  return {
    status: 'alive',
    env,
    fetchResult,
  };
});
