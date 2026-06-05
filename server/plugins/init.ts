import { initDb } from '../utils/db';

export default defineNitroPlugin(async (nitroApp) => {
  try {
    await initDb();
    console.log('Database initialized successfully on startup');
  } catch (error) {
    console.error('Failed to initialize database on startup:', error);
  }
});
