export default defineEventHandler(async (event) => {
  requireAuth(event);
  const db = useDb();
  
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: 'FormData manquant' });
  }

  let title = '';
  let text = '';
  let imageUrl: string | null = null;

  for (const item of formData) {
    if (item.name === 'title' && item.data) {
      title = item.data.toString();
    } else if (item.name === 'text' && item.data) {
      text = item.data.toString();
    } else if (item.name === 'image' && item.filename && item.data.length > 0) {
      const { url } = await uploadToCloudinary(item.data, 'stats');
      imageUrl = url;
    }
  }

  if (!title || !text) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le titre et le texte sont requis',
    });
  }

  const res = await db.execute({ 
    sql: 'INSERT INTO statistics (title, text, image) VALUES (?, ?, ?)', 
    args: [title, text, imageUrl] 
  });

  return {
    id: res.lastInsertRowid,
    success: true
  };
});
