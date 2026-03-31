export default defineEventHandler(async () => {
  const db = useDb()
  const res = await db.execute('SELECT key, value FROM settings');
  const rows = res.rows as unknown as { key: string; value: string }[]
  const settings: Record<string, string> = {}
  for (const row of rows) {
    settings[row.key] = row.value
  }
  return settings
})
