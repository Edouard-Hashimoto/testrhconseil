import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { r as requireAuth } from '../../_/auth.mjs';
import { u as useDb } from '../../_/db.mjs';
import { existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import '@libsql/client';

const news_delete = defineEventHandler(async (event) => {
  requireAuth(event);
  const body = await readBody(event);
  const db = useDb();
  const { id } = body;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "L'ID est requis"
    });
  }
  const article = await db.prepare("SELECT image FROM news WHERE id = ?").get(id);
  if (article && article.image) {
    const filePath = join(process.cwd(), "public/uploads/news", article.image);
    if (existsSync(filePath)) {
      try {
        unlinkSync(filePath);
      } catch (e) {
        console.error("Erreur lors de la suppression du fichier:", e);
      }
    }
  }
  const deleteStmt = db.prepare("DELETE FROM news WHERE id = ?");
  await deleteStmt.run(id);
  return {
    success: true
  };
});

export { news_delete as default };
//# sourceMappingURL=news.delete.mjs.map
