import { useDb } from '../../utils/db';
import { requireAuth } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const body = await readBody(event);
  const { nom, role, image, description } = body;
  const slug = nom.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const db = useDb();
  const res = await db.execute({ 
    sql: 'INSERT INTO equipe (slug, nom, role, image, description) VALUES (?, ?, ?, ?, ?)', 
    args: [slug, nom, role, image || null, description] 
  });

  return { id: res.lastInsertRowid };
});
