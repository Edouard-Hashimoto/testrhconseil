export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = useDb();
  const particulier = db.prepare('SELECT * FROM particuliers WHERE id = ?').get(id);
  
  if (!particulier) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Particulier non trouvé'
    });
  }
  
  return particulier;
});
