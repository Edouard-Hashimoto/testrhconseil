export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Record<string, string>
  const db = useDb()
  const upsert = db.prepare(`INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`)

  for (const [key, value] of Object.entries(body)) {
    upsert.run(key, value)
  }

  return { success: true }
})
