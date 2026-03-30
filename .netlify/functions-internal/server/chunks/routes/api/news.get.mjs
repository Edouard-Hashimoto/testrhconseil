import { d as defineEventHandler, a as getQuery, c as createError } from '../../_/nitro.mjs';
import { u as useDb } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const news_get = defineEventHandler(async (event) => {
  const db = useDb();
  const count = db.prepare("SELECT COUNT(*) as count FROM news").get();
  if (count.count === 0) {
    const insert = db.prepare("INSERT INTO news (title, content, date) VALUES (?, ?, ?)");
    await insert.run(
      "Nouveau bureau \xE0 Lyon",
      "RH Conseil s'agrandit avec l'ouverture d'une nouvelle agence \xE0 Lyon pour mieux accompagner nos clients du Rh\xF4ne-Alpes.",
      "2026-02-25"
    );
    await insert.run(
      "Webinaire : Le recrutement en 2026",
      "Rejoignez-nous le 15 mars pour un webinaire exclusif sur les nouvelles tendances du recrutement et de la r\xE9tention des talents.",
      "2026-03-15"
    );
    await insert.run(
      "Bienvenue \xE0 notre nouvelle consultante",
      "Nous sommes ravis d'accueillir Sophie Durand qui rejoint notre \xE9quipe en tant que consultante en strat\xE9gie RH.",
      "2026-02-20"
    );
  }
  const query = getQuery(event);
  const id = query.id;
  if (id) {
    const news2 = await db.prepare("SELECT * FROM news WHERE id = ?").get(id);
    if (!news2) {
      throw createError({
        statusCode: 404,
        statusMessage: "Article non trouv\xE9"
      });
    }
    return news2;
  }
  const news = await db.prepare("SELECT * FROM news ORDER BY date DESC").all();
  return news;
});

export { news_get as default };
//# sourceMappingURL=news.get.mjs.map
