export default defineEventHandler(async () => {
  const db = useDb();
  const particuliers = db.prepare('SELECT * FROM particuliers ORDER BY created_at ASC').all();
  return particuliers;
});
