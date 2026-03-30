export default defineEventHandler(async (event) => {
  const db = useDb();
  const query = getQuery(event);
  
  if (query.full) {
    // Version avec info parent pour l'admin
    const categories = await db.prepare(`
      SELECT c1.*, c2.titre as parent_titre 
      FROM categories c1
      LEFT JOIN categories c2 ON c1.parent_id = c2.id
      ORDER BY c1.created_at DESC
    `).all();
    return categories;
  }
  
  const categories = await db.prepare('SELECT * FROM categories ORDER BY created_at DESC').all();
  return categories;
});
