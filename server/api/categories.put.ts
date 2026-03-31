export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.id || !body?.titre) {
    throw createError({ statusCode: 400, statusMessage: 'ID et titre sont requis' });
  }

  const db = useDb();
  const stmt = db.prepare('UPDATE categories SET titre = ?, image = ?, description = ?, parent_id = ? WHERE id = ?');
  stmt.run(body.titre, body.image || null, body.description || null, body.parent_id || null, body.id);

  return { success: true };
});
