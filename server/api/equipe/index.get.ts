import { useDb } from '../../utils/db';

export default defineEventHandler(async (event) => {
  const db = useDb();
  const rs = await db.execute('SELECT * FROM equipe ORDER BY id ASC');
  return rs.rows;
});
