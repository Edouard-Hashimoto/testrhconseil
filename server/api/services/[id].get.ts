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

  // 2. Fetch associated categories gracefully
  let category_ids: number[] = [];
  let categories: any[] = [];
  
  try {
    const catRes = await db.execute({
      sql: `
        SELECT c.* 
        FROM categories c
        JOIN service_categories sc ON sc.category_id = c.id
        WHERE sc.service_id = ?
      `,
      args: [Number(id)]
    });
    category_ids = catRes.rows.map(r => Number(r.id));
    categories = catRes.rows.map(r => ({ ...r, id: Number(r.id) }));
  } catch (e) {
    // Si service_categories n'existe pas en production
    console.log("Fallback category fetch pour un seul service");
    if (serviceRes.category_id) {
      const fallbackCatRes = await db.execute({
        sql: 'SELECT * FROM categories WHERE id = ?',
        args: [serviceRes.category_id]
      });
      if (fallbackCatRes.rows.length > 0) {
         const row = fallbackCatRes.rows[0] as any;
         categories = [{ ...row, id: Number(row.id) }];
         category_ids = [Number(row.id)];
      }
    }
  }

  // Construct response gracefully forcing Num types
  const service = {
    ...serviceRes,
    id: Number(serviceRes.id),
    category_ids,
    categories
  };
  
  return service;
});
