import { useDb } from '../../utils/db';

export default defineEventHandler((event) => {
  const db = useDb();
  return db.prepare('SELECT * FROM equipe ORDER BY id ASC').all();
});
