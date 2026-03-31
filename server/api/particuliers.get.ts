export default defineEventHandler(async () => {
  const db = useDb();
  const res = await db.execute('SELECT * FROM particuliers ORDER BY created_at ASC');
  return res.rows;
});
