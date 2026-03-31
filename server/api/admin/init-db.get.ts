import { requireAuth } from '../../utils/auth';
import { useDb, initDb } from '../../utils/db';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  
  try {
    const db = useDb();
    // Test connection
    await db.execute("SELECT 1");
    
    // Call initDb
    await initDb();
    
    return {
      success: true,
      message: "Base de données Turso initialisée avec succès !"
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'initialisation",
      data: error.message
    });
  }
});
