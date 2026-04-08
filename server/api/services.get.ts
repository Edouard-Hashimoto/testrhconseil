export default defineEventHandler(async () => {
  const db = useDb();
  
  // Requête 1 : Obtenir tous les services
  const res = await db.execute('SELECT * FROM services ORDER BY created_at ASC');
  
  const catsMap: Record<string, number[]> = {};
  const themesMap: Record<string, any[]> = {};
  
  try {
    // Requête 2 : Essayer d'obtenir les associations de catégories
    const relations = await db.execute('SELECT service_id, category_id FROM service_categories');
    for (const row of relations.rows) {
      const sId = String(row.service_id);
      if (!catsMap[sId]) catsMap[sId] = [];
      const catId = Number(row.category_id);
      if (!isNaN(catId)) {
        catsMap[sId].push(catId);
      }
    }

    // Requête 3 : Obtenir les thèmes
    const themes = await db.execute('SELECT * FROM service_themes ORDER BY id ASC');
    for (const row of themes.rows) {
      const sId = String(row.service_id);
      if (!themesMap[sId]) themesMap[sId] = [];
      themesMap[sId].push({
        id: Number(row.id),
        title: row.title,
        objectives: row.objectives
      });
    }
  } catch (e) {
    console.log("Erreur lors du chargement des relations (categories/themes).");
  }

  // Combiner les résultats
  return res.rows.map((s: any) => {
    const sId = String(s.id);
    const mapArray = catsMap[sId];
    const fallbackArray = s.category_id ? [Number(s.category_id)] : [];
    
    return {
      ...s,
      id: Number(s.id),
      category_ids: mapArray && mapArray.length > 0 ? mapArray : fallbackArray,
      themes: themesMap[sId] || []
    };
  });
});
