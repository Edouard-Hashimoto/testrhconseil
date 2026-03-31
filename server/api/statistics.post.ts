import { requireAuth } from '../utils/auth';
import { useDb } from '../utils/db';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const db = useDb();

  const body = await readBody(event);
  const { title, text, imageUrl } = body || {};

  if (!title || !text) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le titre et le texte sont requis',
    });
  }

  const res = await db.execute({
    sql: 'INSERT INTO statistics (title, text, image) VALUES (?, ?, ?)',
    args: [title, text, imageUrl || null],
  });

  return {
    id: res.lastInsertRowid?.toString(),
    success: true,
  };
});
