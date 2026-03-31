import { requireAuth } from '../utils/auth';
import { useDb } from '../utils/db';
import { uploadToCloudinary } from '../utils/cloudinary';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: 'FormData manquant' });
  }

  let title = '';
  let content = '';
  let imageUrl: string | null = null;

  for (const item of formData) {
    if (item.name === 'title' && item.data) {
      title = item.data.toString();
    } else if (item.name === 'content' && item.data) {
      content = item.data.toString();
    } else if (item.name === 'image' && item.filename && item.data.length > 0) {
      const { url } = await uploadToCloudinary(item.data, 'news');
      imageUrl = url;
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
  
  const res = await db.execute({ 
    sql: 'INSERT INTO news (title, content, date, image) VALUES (?, ?, ?, ?)', 
    args: [title, content, date, imageUrl] as any
  });
  
  return {
    id: res.lastInsertRowid,
    success: true
  };
});
