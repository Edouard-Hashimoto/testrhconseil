export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.titre) {
    throw createError({ statusCode: 400, statusMessage: 'Le titre est requis' });
  }

  const db = useDb();
  const res = await db.execute({ 
    sql: 'INSERT INTO categories (titre, image, description, parent_id) VALUES (?, ?, ?, ?)', 
    args: [body.titre, body.image || null, body.description || null, body.parent_id || null] 
  });

  return { id: res.lastInsertRowid, ...body };
});
