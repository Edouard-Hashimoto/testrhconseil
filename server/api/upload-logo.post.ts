import { requireAuth } from '../utils/auth';
import { uploadToCloudinary } from '../utils/cloudinary';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const formData = await readFormData(event);
  const file = formData.get('file') as File | null;

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'Aucun fichier fourni' });
  }

  if (!file.type.startsWith('image/')) {
    throw createError({ statusCode: 400, statusMessage: 'Seules les images sont acceptées' });
  }

  const { url } = await uploadToCloudinary(await file.arrayBuffer(), 'logos');

  return { filename: url, url };
});
