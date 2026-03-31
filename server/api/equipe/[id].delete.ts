import { useDb } from '../../utils/db';
import { requireAuth } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const id = getRouterParam(event, 'id');

  const db = useDb();
  await db.execute({ sql: 'DELETE FROM equipe WHERE id = ?', args: [id as string] });

  return { success: true };
});
