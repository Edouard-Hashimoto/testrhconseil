export default defineEventHandler(async () => {
  const db = useDb();
  const res = await db.execute('SELECT * FROM services ORDER BY created_at ASC');
  const services = res.rows as any[];

  // On récupère les catégories pour chaque service
  for (const s of services) {
    const catRes = await db.execute({
      sql: 'SELECT category_id FROM service_categories WHERE service_id = ?',
      args: [s.id]
    });
    s.category_ids = catRes.rows.map(r => r.category_id);
  }

  return services;
});
