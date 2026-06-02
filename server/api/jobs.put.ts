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
  const { title, description, link } = body || {};

  if (!title || !description || !link) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le titre, la description et le lien sont requis',
    });
  }

  await db.execute({
    sql: 'UPDATE jobs SET title = ?, description = ?, link = ? WHERE id = ?',
    args: [title, description, link, id as string],
  });

  return { success: true };
});
