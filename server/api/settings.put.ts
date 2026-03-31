export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Record<string, string>
  const db = useDb()
  const entries = Object.entries(body);
  if (entries.length > 0) {
    const queries = entries.map(([key, value]) => ({
      sql: `INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      args: [key, String(value)]
    }));
    await db.batch(queries, 'write');
  }

  return { success: true }
})
