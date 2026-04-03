export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = useDb();
  
  // 1. Fetch the main service
  const res = await db.execute({ 
    sql: 'SELECT * FROM services WHERE id = ?', 
    args: [id as string] 
  });
  const serviceRes = res.rows[0] as any;
  
  if (!serviceRes) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Service non trouvé'
    });
  }

  // 2. Fetch associated categories
  const catRes = await db.execute({
    sql: `
      SELECT c.* 
      FROM categories c
      JOIN service_categories sc ON sc.category_id = c.id
      WHERE sc.service_id = ?
    `,
    args: [id as string]
  });

  // Construct response gracefully forcing Num types
  const service = {
    ...serviceRes,
    id: Number(serviceRes.id),
    category_ids: catRes.rows.map(r => Number(r.id)),
    categories: catRes.rows.map(r => ({ ...r, id: Number(r.id) }))
  };
  
  return service;
});
