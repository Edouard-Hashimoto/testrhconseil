import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: 'FormData manquant' });
  }

  let title = '';
  let content = '';
  let imageFilename: string | null = null;

  for (const item of formData) {
    if (item.name === 'title' && item.data) {
      title = item.data.toString();
    } else if (item.name === 'content' && item.data) {
      content = item.data.toString();
    } else if (item.name === 'image' && item.filename && item.data.length > 0) {
      const ext = item.filename.split('.').pop();
      const filename = `news-${Date.now()}.${ext}`;
      const uploadDir = join(process.cwd(), 'public/uploads/news');
      
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }
      
      writeFileSync(join(uploadDir, filename), item.data);
      imageFilename = filename;
    }
  }
  
  if (!title || !content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le titre et le contenu sont requis',
    });
  }
  
  const db = useDb();
  const date = new Date().toISOString().split('T')[0];
  
  const insert = db.prepare('INSERT INTO news (title, content, date, image) VALUES (?, ?, ?, ?)');
  const result = await insert.run(title, content, date, imageFilename);
  
  return {
    id: result.lastInsertRowid,
    success: true
  };
});
