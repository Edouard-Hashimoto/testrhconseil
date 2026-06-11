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

    try {
      await db.execute("ALTER TABLE service_formations ADD COLUMN inscription_url TEXT");
      logs.push("Colonne 'inscription_url' ajoutée avec succès.");
    } catch (e) {
      logs.push("Colonne 'inscription_url' déjà présente ou erreur ignorée.");
    }

    try {
      await db.execute("ALTER TABLE service_formations ADD COLUMN discover_url TEXT");
      logs.push("Colonne 'discover_url' ajoutée avec succès.");
    } catch (e) {
      logs.push("Colonne 'discover_url' déjà présente ou erreur ignorée.");
    }

    try {
      await db.execute("ALTER TABLE services ADD COLUMN video_url TEXT");
      logs.push("Colonne 'video_url' ajoutée avec succès sur services.");
    } catch (e) {
      logs.push("Colonne 'video_url' déjà présente ou erreur ignorée sur services.");
    }

    try {
      await db.execute("ALTER TABLE services ADD COLUMN show_themes INTEGER DEFAULT 1");
      logs.push("Colonne 'show_themes' ajoutée avec succès sur services.");
    } catch (e) {
      logs.push("Colonne 'show_themes' déjà présente ou erreur ignorée sur services.");
    }

    try {
      await db.execute("ALTER TABLE services ADD COLUMN show_formations INTEGER DEFAULT 1");
      logs.push("Colonne 'show_formations' ajoutée avec succès sur services.");
    } catch (e) {
      logs.push("Colonne 'show_formations' déjà présente ou erreur ignorée sur services.");
    }

    try {
      await db.execute("ALTER TABLE services ADD COLUMN sort_order INTEGER DEFAULT 0");
      logs.push("Colonne 'sort_order' ajoutée avec succès sur services.");
    } catch (e) {
      logs.push("Colonne 'sort_order' déjà présente ou erreur ignorée sur services.");
    }

    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS jobs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          link TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      logs.push("Table 'jobs' vérifiée/créée avec succès.");
    } catch (e) {
      logs.push("Table 'jobs' déjà présente ou erreur ignorée.");
    }

    return { success: true, logs };
  } catch (err: any) {
    return { success: false, error: err.message, logs };
  }
});
