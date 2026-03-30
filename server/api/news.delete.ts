import { unlinkSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export default defineEventHandler(async (event) => {
  requireAuth(event);
  const body = await readBody(event);
  const db = useDb();
  
  const { id } = body;
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "L'ID est requis",
    });
  }

  // Trouver l'image pour la supprimer du disque
  const article = await db.prepare('SELECT image FROM news WHERE id = ?').get(id) as { image: string | null };
  if (article && article.image) {
    const filePath = join(process.cwd(), 'public/uploads/news', article.image);
    if (existsSync(filePath)) {
      try {
        unlinkSync(filePath);
      } catch (e) {
        console.error("Erreur lors de la suppression du fichier:", e);
      }
    }
  }
  
  const deleteStmt = db.prepare('DELETE FROM news WHERE id = ?');
  await deleteStmt.run(id);
  
  return {
    success: true
  };
});
