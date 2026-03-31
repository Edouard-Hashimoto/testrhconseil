export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.title) {
    throw createError({ statusCode: 400, statusMessage: 'Le titre est requis' });
  }

  const db = useDb();
  const res = await db.execute({ 
    sql: 'INSERT INTO services (title, color, logo, description, category_id) VALUES (?, ?, ?, ?, ?)', 
    args: [body.title, body.color || '#6b21a8', body.logo || null, body.description || null, body.category_id || null] 
  });

  return { id: res.lastInsertRowid, ...body };
});
