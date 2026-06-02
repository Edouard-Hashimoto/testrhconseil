import { useDb } from '../utils/db';

export default defineEventHandler(async (event) => {
  const db = useDb();
  
  const query = getQuery(event);
  const id = query.id;

  if (id) {
    const res = await db.execute({ sql: 'SELECT * FROM jobs WHERE id = ?', args: [id as string] });
    const job = res.rows[0];
    if (!job) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Offre d\'emploi non trouvée'
      });
    }
    return job;
  }

  const res = await db.execute('SELECT * FROM jobs ORDER BY created_at DESC');
  return res.rows;
});
