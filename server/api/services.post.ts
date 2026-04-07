import { useDb } from '../utils/db';
import { requireAuth } from '../utils/auth';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const body = await readBody(event);
  if (!body?.title) {
    throw createError({ statusCode: 400, statusMessage: 'Le titre est requis' });
  }

  const db = useDb();
  
  // 1. Insertion du service
  const res = await db.execute({ 
    sql: 'INSERT INTO services (title, color, logo, description, category_id) VALUES (?, ?, ?, ?, ?)', 
    args: [
      body.title, 
      body.color || '#6b21a8', 
      body.logo || null, 
      body.description || null, 
      (body.category_ids && body.category_ids.length > 0) ? body.category_ids[0] : null // Keep legacy column for now
    ] 
  });

  const serviceId = res.lastInsertRowid;

  // 2. Insertion des catégories dans la table de jointure
  if (body.category_ids && Array.isArray(body.category_ids)) {
    try {
      const categoryIds = body.category_ids.map(Number);
      for (const catId of categoryIds) {
        await db.execute({
          sql: 'INSERT INTO service_categories (service_id, category_id) VALUES (?, ?)',
          args: [Number(serviceId), catId]
        });
      }
    } catch (e: any) {
      console.error('Erreur insertion service_categories:', e.message);
    }
  }

  return { id: serviceId?.toString(), ...body };
});
