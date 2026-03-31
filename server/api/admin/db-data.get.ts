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
    const resTables = await db.execute("SELECT name FROM sqlite_master WHERE type='table'");
    const existingTables = resTables.rows.map((t: any) => t.name);
    
    if (!existingTables.includes(table)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Table non trouvée',
      });
    }

    const resData = await db.execute(`SELECT * FROM "${table}"`);
    return resData.rows;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erreur lors de la lecture de la table ${table}`,
      data: error.message
    });
  }
});
