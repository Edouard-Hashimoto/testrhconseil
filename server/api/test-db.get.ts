export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  const diagnostic = {
    dbUrl: process.env.TURSO_DATABASE_URL ? (process.env.TURSO_DATABASE_URL.substring(0, 15) + "...") : "MISSING",
    hasToken: !!process.env.TURSO_AUTH_TOKEN,
    nodeVersion: process.version,
    error: null as any,
    step: "start"
  };

  try {
    const db = useDb();
    diagnostic.step = "connecting";
    
    // Tentative simple de lecture
    const result = await db.prepare('SELECT 1 as test').get();
    diagnostic.step = "connected";
    
    return {
      status: "success",
      message: "Connexion à la base de données réussie !",
      diagnostic,
      result
    };
  } catch (e: any) {
    return {
      status: "error",
      message: "Échec du diagnostic de la base de données",
      diagnostic: {
        ...diagnostic,
        error: {
          name: e.name,
          message: e.message,
          stack: e.stack,
          code: e.code
        }
      }
    };
  }
});
