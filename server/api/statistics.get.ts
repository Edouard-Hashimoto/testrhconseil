export default defineEventHandler(async (event) => {
  const db = useDb();
  
  const query = getQuery(event);
  const id = query.id;

  if (id) {
    const res = await db.execute({ sql: 'SELECT * FROM statistics WHERE id = ?', args: [id as string] });
    const stat = res.rows[0];
    if (!stat) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Statistique non trouvée'
      });
    }
    return stat;
  }

  const res = await db.execute('SELECT * FROM statistics ORDER BY created_at DESC');
  return res.rows;
});
