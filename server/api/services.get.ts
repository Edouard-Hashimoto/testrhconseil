export default defineEventHandler(async () => {
  const db = useDb();
  
  // Requête 1 : Obtenir tous les services
  const res = await db.execute('SELECT * FROM services ORDER BY created_at ASC');
  
  // Requête 2 : Obtenir toutes les associations dans un seul appel (évite les requêtes N+1)
  const relations = await db.execute('SELECT service_id, category_id FROM service_categories');
  
  const catsMap: Record<string, number[]> = {};
  for (const row of relations.rows) {
    const sId = String(row.service_id);
    if (!catsMap[sId]) catsMap[sId] = [];
    catsMap[sId].push(Number(row.category_id));
  }

  // Combiner les résultats en mémoire et forcer les types de base (Number) pour éviter les erreurs BigInt en production
  return res.rows.map((s: any) => ({
    ...s,
    id: Number(s.id),
    category_ids: catsMap[String(s.id)] || []
  }));
});
