import { useDb } from '../../utils/db';
import { requireAuth } from '../../utils/auth';

export default defineEventHandler((event) => {
  requireAuth(event);
  const id = getRouterParam(event, 'id');

  const db = useDb();
  const stmt = db.prepare('DELETE FROM equipe WHERE id = ?');
  stmt.run(id);

  return { success: true };
});
