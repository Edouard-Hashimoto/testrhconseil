export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.id) {
    throw createError({ statusCode: 400, statusMessage: 'ID requis' });
  }

  const db = useDb();
  
  // Set category_id to NULL for services linked to this category
  await db.execute({ sql: 'UPDATE services SET category_id = NULL WHERE category_id = ?', args: [body.id] });
  
  await db.execute({ sql: 'DELETE FROM categories WHERE id = ?', args: [body.id] });

  return { success: true };
});
