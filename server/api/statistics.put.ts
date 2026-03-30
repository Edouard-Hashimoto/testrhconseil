import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const db = useDb();
  
  const query = getQuery(event);
  const id = query.id;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID manquant' });
  }

  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: 'FormData manquant' });
  }

  let title = '';
  let text = '';
  let imageFilename: string | undefined = undefined;

  for (const item of formData) {
    if (item.name === 'title' && item.data) {
      title = item.data.toString();
    } else if (item.name === 'text' && item.data) {
      text = item.data.toString();
    } else if (item.name === 'image' && item.filename && item.data.length > 0) {
      const ext = item.filename.split('.').pop();
      imageFilename = `stat-${Date.now()}.${ext}`;
      const uploadDir = join(process.cwd(), 'public/uploads/stats');
      
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }
      
      writeFileSync(join(uploadDir, imageFilename), item.data);
    }
  }

  if (!title || !text) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le titre et le texte sont requis',
    });
  }

  if (imageFilename) {
    await db.prepare('UPDATE statistics SET title = ?, text = ?, image = ? WHERE id = ?').run(title, text, imageFilename, id);
  } else {
    await db.prepare('UPDATE statistics SET title = ?, text = ? WHERE id = ?').run(title, text, id);
  }

  return { success: true };
});
