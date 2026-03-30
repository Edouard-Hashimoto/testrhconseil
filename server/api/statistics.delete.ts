export default defineEventHandler(async (event) => {
  requireAuth(event);
  const db = useDb();
  
  const query = getQuery(event);
  const id = query.id;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID manquant' });
  }

  await db.prepare('DELETE FROM statistics WHERE id = ?').run(id);

  return { success: true };
});
