import { useDb } from '../../utils/db';
import { requireAuth } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const body = await readBody(event);
  const { ids } = body;
  
  if (!ids || !Array.isArray(ids)) {
    throw createError({ statusCode: 400, statusMessage: 'Array of ids is required' });
  }

  const db = useDb();
  
  const queries = ids.map((id, index) => ({
    sql: 'UPDATE services SET sort_order = ? WHERE id = ?',
    args: [index, Number(id)]
  }));

  try {
    await db.batch(queries, 'write');
    return { success: true };
  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: `Failed to reorder: ${e.message}` });
  }
});
