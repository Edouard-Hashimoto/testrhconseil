import { useDb } from '../utils/db';
import { requireAuth } from '../utils/auth';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const body = await readBody(event);
  if (!body?.title) {
    throw createError({ statusCode: 400, statusMessage: 'Le titre est requis' });
  }

  const db = useDb();
  
  // Fetch max sort_order to append the new service at the end
  const maxOrderRes = await db.execute('SELECT MAX(sort_order) as max_order FROM services');
  const maxOrder = Number(maxOrderRes.rows[0]?.max_order || 0);
  const nextOrder = maxOrder + 1;
  
  // 1. Insertion du service
  const res = await db.execute({ 
    sql: 'INSERT INTO services (title, color, logo, description, category_id, video_url, show_themes, show_formations, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    args: [
      body.title, 
      body.color || '#6b21a8', 
      body.logo || null, 
      body.description || null, 
      null, 
      body.video_url || null,
      body.show_themes !== undefined ? Number(body.show_themes) : 1,
      body.show_formations !== undefined ? Number(body.show_formations) : 1,
      nextOrder
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

  // 3. Insertion des thèmes
  if (body.themes && Array.isArray(body.themes)) {
    try {
      for (const theme of body.themes) {
        if (theme.title && theme.objectives) {
          await db.execute({
            sql: 'INSERT INTO service_themes (service_id, title, objectives) VALUES (?, ?, ?)',
            args: [Number(serviceId), theme.title, theme.objectives]
          });
        }
      }
    } catch (e: any) {
      console.error('Erreur insertion service_themes:', e.message);
    }
  }

  // 4. Insertion des formations
  if (body.formations && Array.isArray(body.formations)) {
    try {
      for (const form of body.formations) {
        if (form.title && form.title.trim()) {
          await db.execute({
            sql: 'INSERT INTO service_formations (service_id, title, objectives, date, pdf_url, inscription_url, discover_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            args: [Number(serviceId), form.title, form.objectives || '', form.date || null, form.pdf_url || null, form.inscription_url || null, form.discover_url || null]
          });
        }
      }
    } catch (e: any) {
      console.error('Erreur insertion service_formations:', e.message);
    }
  }

  return { id: serviceId?.toString(), ...body };
});
