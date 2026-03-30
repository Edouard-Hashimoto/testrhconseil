export default defineEventHandler(async (event) => {
  const db = useDb();
  
  const query = getQuery(event);
  const id = query.id;

  if (id) {
    const stat = await db.prepare('SELECT * FROM statistics WHERE id = ?').get(id);
    if (!stat) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Statistique non trouvée'
      });
    }
    return stat;
  }

  const statistics = await db.prepare('SELECT * FROM statistics ORDER BY created_at DESC').all();
  return statistics;
});
