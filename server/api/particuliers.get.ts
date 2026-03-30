export default defineEventHandler(async () => {
  const db = useDb();
  const particuliers = await db.prepare('SELECT * FROM particuliers ORDER BY created_at ASC').all();
  return particuliers;
});
