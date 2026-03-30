export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.titre) {
    throw createError({ statusCode: 400, statusMessage: 'Le titre est requis' });
  }

  const db = useDb();
  const stmt = db.prepare('INSERT INTO particuliers (titre, description_courte, description_complete, picto, image, color) VALUES (?, ?, ?, ?, ?, ?)');
  const result = await stmt.run(body.titre, body.description_courte || '', body.description_complete || '', body.picto || null, body.image || null, body.color || '#42B9B5');

  return { id: result.lastInsertRowid, ...body };
});
