export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = useDb();
  const res = await db.execute({ sql: 'SELECT * FROM particuliers WHERE id = ?', args: [id as string] });
  const particulier = res.rows[0];
  
  if (!particulier) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Particulier non trouvé'
    });
  }
  
  return particulier;
});
