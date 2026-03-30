export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = useDb();
  
  // Fetch category
  const category = await db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
  
  if (!category) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Catégorie non trouvée'
    });
  }
  
  // Fetch child categories (subcategories)
  const subcategories = await db.prepare('SELECT * FROM categories WHERE parent_id = ? ORDER BY titre ASC').all(id);
  
  // Fetch linked services
  const services = await db.prepare('SELECT * FROM services WHERE category_id = ? ORDER BY created_at ASC').all(id);
  
  return {
    ...category,
    subcategories,
    services
  };
});
