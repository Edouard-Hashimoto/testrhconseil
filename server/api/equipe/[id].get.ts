import { useDb } from '../../utils/db';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = useDb();
  const user = await db.prepare('SELECT * FROM equipe WHERE id = ?').get(id);
  
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'Membre non trouvé' });
  }
  
  return user;
});
