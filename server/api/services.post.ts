export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.title) {
    throw createError({ statusCode: 400, statusMessage: 'Le titre est requis' });
  }

  const db = useDb();
  const stmt = db.prepare('INSERT INTO services (title, color, logo, description, category_id) VALUES (?, ?, ?, ?, ?)');
  const result = await stmt.run(body.title, body.color || '#6b21a8', body.logo || null, body.description || null, body.category_id || null);

  return { id: result.lastInsertRowid, ...body };
});
