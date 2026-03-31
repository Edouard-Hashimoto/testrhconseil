export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.id) {
    throw createError({ statusCode: 400, statusMessage: "L'id est requis" });
  }

  const db = useDb();
  await db.execute({ 
    sql: 'UPDATE particuliers SET titre = ?, description_courte = ?, description_complete = ?, picto = ?, image = ?, color = ? WHERE id = ?', 
    args: [body.titre, body.description_courte || '', body.description_complete || '', body.picto ?? null, body.image ?? null, body.color || '#42B9B5', body.id] 
  });

  return { success: true };
});
