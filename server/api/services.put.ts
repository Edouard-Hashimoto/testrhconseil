export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.id) {
    throw createError({ statusCode: 400, statusMessage: "L'id est requis" });
  }

  const db = useDb();
  db.prepare('UPDATE services SET title = ?, color = ?, logo = ?, description = ?, category_id = ? WHERE id = ?')
    .run(body.title, body.color, body.logo ?? null, body.description ?? null, body.category_id ?? null, body.id);

  return { success: true };
});
