import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const file = formData.get('file') as File | null;

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'Aucun fichier fourni' });
  }

  if (!file.type.startsWith('image/')) {
    throw createError({ statusCode: 400, statusMessage: 'Seules les images sont acceptées' });
  }

  const dir = join(process.cwd(), 'public', 'categories');
  await mkdir(dir, { recursive: true });

  const ext = file.name.split('.').pop();
  const filename = `cat_${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(dir, filename), buffer);

  return { filename };
});
