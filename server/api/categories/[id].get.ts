export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = useDb();
  
  // Fetch category
  const resCat = await db.execute({ sql: 'SELECT * FROM categories WHERE id = ?', args: [id as string] });
  const category = resCat.rows[0];
  
  if (!category) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Catégorie non trouvée'
    });
  }
  
  // Fetch child categories (subcategories)
  const resSubs = await db.execute({ sql: 'SELECT * FROM categories WHERE parent_id = ? ORDER BY titre ASC', args: [id as string] });
  const subcategories = resSubs.rows;
  
  // Fetch linked services
  const resServs = await db.execute({ sql: 'SELECT * FROM services WHERE category_id = ? ORDER BY created_at ASC', args: [id as string] });
  const services = resServs.rows;
  
  return {
    ...category,
    subcategories,
    services
  };
});
