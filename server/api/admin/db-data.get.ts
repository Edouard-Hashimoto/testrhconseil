export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const table = query.table as string;

  if (!table) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le nom de la table est requis',
    });
  }

  const db = useDb();

  try {
    const existingTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map((t: any) => t.name);
    
    if (!existingTables.includes(table)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Table non trouvée',
      });
    }

    const data = db.prepare(`SELECT * FROM "${table}"`).all();
    return data;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erreur lors de la lecture de la table ${table}`,
      data: error.message
    });
  }
});
