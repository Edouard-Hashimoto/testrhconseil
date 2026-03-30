export default defineEventHandler(async (event) => {
  const db = useDb();
  
  try {
    const tables = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
    return tables;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des tables',
      data: error.message
    });
  }
});
