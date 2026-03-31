export default defineEventHandler(async (event) => {
  const db = useDb();
  
  try {
    const res = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
    return res.rows;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des tables',
      data: error.message
    });
  }
});
