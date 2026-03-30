import { useDb } from '../../utils/db';
import { requireAuth } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const { nom, role, image, description } = body;
  const slug = nom.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const db = useDb();
  const stmt = db.prepare('UPDATE equipe SET slug = ?, nom = ?, role = ?, image = ?, description = ? WHERE id = ?');
  await stmt.run(slug, nom, role, image || null, description, id);

  return { success: true };
});
