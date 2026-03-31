import { useDb } from '../../utils/db';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = useDb();
  const res = await db.execute({ sql: 'SELECT * FROM equipe WHERE id = ?', args: [id as string] });
  const user = res.rows[0];
  
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'Membre non trouvé' });
  }
  
  return user;
});
