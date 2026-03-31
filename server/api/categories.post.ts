export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.titre) {
    throw createError({ statusCode: 400, statusMessage: 'Le titre est requis' });
  }

  const db = useDb();
  const stmt = db.prepare('INSERT INTO categories (titre, image, description, parent_id) VALUES (?, ?, ?, ?)');
  const result = stmt.run(body.titre, body.image || null, body.description || null, body.parent_id || null);

  return { id: result.lastInsertRowid, ...body };
});
