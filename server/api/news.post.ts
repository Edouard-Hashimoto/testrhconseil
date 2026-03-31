import { requireAuth } from '../utils/auth';
import { useDb } from '../utils/db';

export default defineEventHandler(async (event) => {
  requireAuth(event);

  const body = await readBody(event);

  const { title, content, imageUrl } = body || {};

  if (!title || !content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le titre et le contenu sont requis',
    });
  }

  const db = useDb();
  const date = new Date().toISOString().split('T')[0];

  const res = await db.execute({
    sql: 'INSERT INTO news (title, content, date, image) VALUES (?, ?, ?, ?)',
    args: [title, content, date, imageUrl || null],
  });

  return {
    id: res.lastInsertRowid?.toString(),
    success: true,
  };
});
