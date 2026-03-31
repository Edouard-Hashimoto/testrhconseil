export default defineEventHandler(async () => {
  const db = useDb();
  
  // Fetch all categories
  const categories = db.prepare('SELECT * FROM categories ORDER BY titre ASC').all();
  
  // For each category, fetch its services
  const categoriesWithServices = categories.map(cat => {
    const services = db.prepare('SELECT id, title FROM services WHERE category_id = ? ORDER BY created_at ASC').all(cat.id);
    return {
      ...cat,
      services
    };
  });
  
  // Also fetch services without category
  const uncategorizedServices = db.prepare('SELECT id, title FROM services WHERE category_id IS NULL ORDER BY created_at ASC').all();
  
  return {
    categories: categoriesWithServices,
    uncategorized: uncategorizedServices
  };
});
