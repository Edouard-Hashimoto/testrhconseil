export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = useDb();
  const service = await db.prepare(`
    SELECT services.*, 
           categories.titre as category_titre, 
           categories.image as category_image, 
           categories.description as category_description 
    FROM services 
    LEFT JOIN categories ON services.category_id = categories.id 
    WHERE services.id = ?
  `).get(id);
  
  if (!service) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Service non trouvé'
    });
  }
  
  return service;
});
