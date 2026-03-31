import { requireAuth } from '../utils/auth';
import { useDb } from '../utils/db';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const db = useDb();

  const query = getQuery(event);
  const id = query.id;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID manquant' });
  }

  const body = await readBody(event);
  const { title, text, imageUrl } = body || {};

  if (!title || !text) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le titre et le texte sont requis',
    });
  }

  if (imageUrl) {
    await db.execute({
      sql: 'UPDATE statistics SET title = ?, text = ?, image = ? WHERE id = ?',
      args: [title, text, imageUrl, id as string],
    });
  } else {
    await db.execute({
      sql: 'UPDATE statistics SET title = ?, text = ? WHERE id = ?',
      args: [title, text, id as string],
    });
  }

  return { success: true };
});
