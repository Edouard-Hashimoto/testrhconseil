export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.id) {
    throw createError({ statusCode: 400, statusMessage: "L'id est requis" });
  }

  const db = useDb();
  await db.execute({ sql: 'DELETE FROM services WHERE id = ?', args: [body.id] });

  return { success: true };
});
