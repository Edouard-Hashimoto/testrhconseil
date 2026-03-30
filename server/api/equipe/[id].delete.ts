import { useDb } from '../../utils/db';
import { requireAuth } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const id = getRouterParam(event, 'id');

  const db = useDb();
  const stmt = db.prepare('DELETE FROM equipe WHERE id = ?');
  await stmt.run(id);

  return { success: true };
});
