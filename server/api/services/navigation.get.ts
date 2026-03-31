export default defineEventHandler(async () => {
  const db = useDb();
  
  // Fetch all categories
  const resCats = await db.execute('SELECT * FROM categories ORDER BY titre ASC');
  const categories = resCats.rows;
  
  // Fetch all services
  const resServs = await db.execute('SELECT id, title, category_id FROM services ORDER BY created_at ASC');
  const services = resServs.rows;
  
  const categoriesWithServices = categories.map(cat => ({
    ...cat,
    services: services.filter(s => s.category_id === cat.id)
  }));
  
  const uncategorizedServices = services.filter(s => s.category_id === null);

  return {
    categories: categoriesWithServices,
    uncategorized: uncategorizedServices
  };
});
