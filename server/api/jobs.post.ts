import { requireAuth } from '../utils/auth';
import { useDb } from '../utils/db';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const db = useDb();

  const body = await readBody(event);
  const { title, description, link } = body || {};

  if (!title || !description || !link) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le titre, la description et le lien sont requis',
    });
  }

  const res = await db.execute({
    sql: 'INSERT INTO jobs (title, description, link) VALUES (?, ?, ?)',
    args: [title, description, link],
  });

  return {
    id: res.lastInsertRowid?.toString(),
    success: true,
  };
});
