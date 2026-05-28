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

  // Générer un nom de fichier unique et sécurisé qui préserve l'extension .pdf
  const originalName = file.name || 'document.pdf';
  const ext = originalName.split('.').pop() || 'pdf';
  const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || 'document';
  
  const sanitizedName = nameWithoutExt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-zA-Z0-9-_]/g, '_') // Remplace les caractères spéciaux
    .substring(0, 60);

  const uniqueSuffix = Math.random().toString(36).substring(2, 10);
  const customFilename = `${sanitizedName}_${uniqueSuffix}.${ext}`;

  const { url } = await uploadToCloudinary(
    await file.arrayBuffer(), 
    'formations', 
    'raw', 
    customFilename
  );

  return { filename: url, url };
});
