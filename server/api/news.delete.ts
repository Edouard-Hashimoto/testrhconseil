export default defineEventHandler(async (event) => {
  requireAuth(event);
  const body = await readBody(event);
  const db = useDb();
  
  const { id } = body;
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "L'ID est requis",
    });
  }

  await db.execute({ sql: 'DELETE FROM news WHERE id = ?', args: [id] });
  
  return {
    success: true
  };
});
