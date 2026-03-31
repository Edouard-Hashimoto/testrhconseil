export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.id) {
    throw createError({ statusCode: 400, statusMessage: "L'id est requis" });
  }

  const db = useDb();
  db.prepare('DELETE FROM particuliers WHERE id = ?').run(body.id);

  return { success: true };
});
