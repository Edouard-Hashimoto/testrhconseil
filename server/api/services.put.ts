export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.id) {
    throw createError({ statusCode: 400, statusMessage: "L'id est requis" });
  }

  const db = useDb();
  const serviceId = body.id;

  // 1. Mise à jour du service (on garde category_id pour la compatibilité)
  await db.execute({ 
    sql: 'UPDATE services SET title = ?, color = ?, logo = ?, description = ?, category_id = ? WHERE id = ?', 
    args: [
      body.title, 
      body.color, 
      body.logo ?? null, 
      body.description ?? null, 
      (body.category_ids && body.category_ids.length > 0) ? body.category_ids[0] : null,
      serviceId
    ] 
  });

  // 2. Mise à jour des catégories dans la table de jointure
  if (body.category_ids && Array.isArray(body.category_ids)) {
    try {
      const categoryIds = body.category_ids.map(Number);
      // On vide les anciennes relations
      await db.execute({
        sql: 'DELETE FROM service_categories WHERE service_id = ?',
        args: [Number(serviceId)]
      });

      // On insère les nouvelles
      for (const catId of categoryIds) {
        await db.execute({
          sql: 'INSERT INTO service_categories (service_id, category_id) VALUES (?, ?)',
          args: [Number(serviceId), catId]
        });
      }
    } catch (e: any) {
      console.error('Erreur update service_categories:', e.message);
    }
  }

  return { success: true };
});
