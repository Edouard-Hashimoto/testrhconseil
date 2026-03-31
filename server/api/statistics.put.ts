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
  let imageUrl: string | undefined = undefined;

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

  if (imageUrl) {
    await db.execute({ 
      sql: 'UPDATE statistics SET title = ?, text = ?, image = ? WHERE id = ?', 
      args: [title, text, imageUrl, id as string] 
    });
  } else {
    await db.execute({ 
      sql: 'UPDATE statistics SET title = ?, text = ? WHERE id = ?', 
      args: [title, text, id as string] 
    });
  }

  return { success: true };
});
