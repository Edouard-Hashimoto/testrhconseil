import { useDb } from '../../utils/db';

export default defineEventHandler(async (event) => {
  const db = useDb();
  return await db.prepare('SELECT * FROM equipe ORDER BY id ASC').all();
});
