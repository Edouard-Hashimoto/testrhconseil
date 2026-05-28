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

  // Générer un nom unique et sécurisé pour le public_id (sans extension pour le type 'image')
  const originalName = file.name || 'document.pdf';
  const nameWithoutExt = originalName.includes('.')
    ? originalName.substring(0, originalName.lastIndexOf('.'))
    : originalName;
  
  const sanitizedName = nameWithoutExt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-zA-Z0-9-_]/g, '_') // Remplace les caractères spéciaux
    .substring(0, 60);

  const uniqueSuffix = Math.random().toString(36).substring(2, 10);
  const customFilename = `${sanitizedName}_${uniqueSuffix}`;

  const { url } = await uploadToCloudinary(
    await file.arrayBuffer(), 
    'formations', 
    'image', // Utiliser 'image' pour les PDF afin qu'ils soient servis avec le bon Content-Type (application/pdf)
    customFilename
  );

  return { filename: url, url };
});
