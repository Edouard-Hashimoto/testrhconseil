export default defineEventHandler(async () => {
  const db = useDb();
  const res = await db.execute('SELECT * FROM services ORDER BY created_at ASC');
  return res.rows;
});
