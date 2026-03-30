export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.id) {
    throw createError({ statusCode: 400, statusMessage: 'ID requis' });
  }

  const db = useDb();
  
  // Set category_id to NULL for services linked to this category
  await db.prepare('UPDATE services SET category_id = NULL WHERE category_id = ?').run(body.id);
  
  const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
  await stmt.run(body.id);

  return { success: true };
});
