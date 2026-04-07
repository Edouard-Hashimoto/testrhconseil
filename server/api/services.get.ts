export default defineEventHandler(async () => {
  const db = useDb();
  
  // Requête 1 : Obtenir tous les services
  const res = await db.execute('SELECT * FROM services ORDER BY created_at ASC');
  
  const catsMap: Record<string, number[]> = {};
  
  try {
    // Requête 2 : Essayer d'obtenir les associations
    const relations = await db.execute('SELECT service_id, category_id FROM service_categories');
    for (const row of relations.rows) {
      const sId = String(row.service_id);
      if (!catsMap[sId]) catsMap[sId] = [];
      const catId = Number(row.category_id);
      if (!isNaN(catId)) {
        catsMap[sId].push(catId);
      }
    }
  } catch (e) {
    // La table n'existe probablement pas encore en production (init-db non lancé en ligne)
    // On utilisera la colonne native category_id en solution de repli
    console.log("Fallback category_id utilisé car service_categories n'est pas dispo.");
  }

  // Combiner les résultats en mémoire et forcer les types de base
  return res.rows.map((s: any) => {
    // Si on a des IDs dans la nouvelle table de liaison, on les prend
    const mapArray = catsMap[String(s.id)];
    // Sinon, on prend l'ancien category_id s'il est encore sur la table
    const fallbackArray = s.category_id ? [Number(s.category_id)] : [];
    
    return {
      ...s,
      id: Number(s.id),
      category_ids: mapArray && mapArray.length > 0 ? mapArray : fallbackArray
    };
  });
});
