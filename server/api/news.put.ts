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
  const { title, content, imageUrl, pinned } = body || {};

  if (!title || !content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le titre et le contenu sont requis',
    });
  }

  await db.execute({
    sql: 'UPDATE news SET title = ?, content = ?, image = ?, pinned = ? WHERE id = ?',
    args: [title, content, imageUrl || null, pinned ? 1 : 0, id as string],
  });

  return { success: true };
});
