export default defineEventHandler(async (event) => {
  const db = useDb();
  const logs = [];

  try {
    logs.push("Vérification de la table service_formations...");
    
    // Tentative d'ajout des colonnes si elles manquent
    try {
      await db.execute("ALTER TABLE service_formations ADD COLUMN date TEXT");
      logs.push("Colonne 'date' ajoutée avec succès.");
    } catch (e) {
      logs.push("Colonne 'date' déjà présente ou erreur ignorée.");
    }

    try {
      await db.execute("ALTER TABLE service_formations ADD COLUMN pdf_url TEXT");
      logs.push("Colonne 'pdf_url' ajoutée avec succès.");
    } catch (e) {
      logs.push("Colonne 'pdf_url' déjà présente ou erreur ignorée.");
    }

    return { success: true, logs };
  } catch (err: any) {
    return { success: false, error: err.message, logs };
  }
});
