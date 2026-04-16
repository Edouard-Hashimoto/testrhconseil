import { requireAuth } from '../utils/auth';
import { uploadToCloudinary } from '../utils/cloudinary';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const formData = await readFormData(event);
  const file = formData.get('file') as File | null;

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'Aucun fichier fourni' });
  }

  // Accepter les PDF
  if (file.type !== 'application/pdf') {
    throw createError({ statusCode: 400, statusMessage: 'Seuls les fichiers PDF sont acceptés' });
  }

  const { url } = await uploadToCloudinary(await file.arrayBuffer(), 'formations', 'raw');

  return { filename: url, url };
});
