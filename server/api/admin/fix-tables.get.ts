import { useDb } from '../../utils/db';
import { requireAuth } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const db = useDb();
  const results: any[] = [];

  const addColumn = async (table: string, column: string, type: string) => {
    try {
      await db.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
      results.push({ table, column, status: 'ADDED' });
    } catch (e: any) {
      if (e.message?.includes('duplicate column') || e.message?.includes('already exists')) {
        results.push({ table, column, status: 'ALREADY EXISTS' });
      } else {
        results.push({ table, column, status: 'ERROR', error: e.message });
      }
    }
  };

  // Add missing columns to various tables
  await addColumn('news', 'image', 'TEXT');
  await addColumn('news', 'date', 'DATETIME DEFAULT CURRENT_TIMESTAMP');
  
  await addColumn('services', 'color', "TEXT NOT NULL DEFAULT '#6b21a8'");
  await addColumn('services', 'logo', 'TEXT');
  await addColumn('services', 'description', 'TEXT');
  await addColumn('services', 'category_id', 'INTEGER');
  
  await addColumn('particuliers', 'picto', 'TEXT');
  await addColumn('particuliers', 'image', 'TEXT');
  await addColumn('particuliers', 'color', "TEXT DEFAULT '#42B9B5'");
  
  await addColumn('equipe', 'description', 'TEXT');
  await addColumn('equipe', 'image', 'TEXT');
  
  await addColumn('categories', 'image', 'TEXT');
  await addColumn('categories', 'description', 'TEXT');
  await addColumn('categories', 'parent_id', 'INTEGER');
  
  await addColumn('statistics', 'image', 'TEXT');

  return {
    success: true,
    results
  };
});
