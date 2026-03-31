export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = useDb();
  const res = await db.execute({ 
    sql: `
      SELECT services.*, 
             categories.titre as category_titre, 
             categories.image as category_image, 
             categories.description as category_description 
      FROM services 
      LEFT JOIN categories ON services.category_id = categories.id 
      WHERE services.id = ?
    `, 
    args: [id as string] 
  });
  const service = res.rows[0];
  
  if (!service) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Service non trouvé'
    });
  }
  
  return service;
});
