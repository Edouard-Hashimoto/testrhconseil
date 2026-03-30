export default defineEventHandler(async (event) => {
  const db = useDb();
  
  const count = db.prepare('SELECT COUNT(*) as count FROM news').get() as { count: number };
  
  if (count.count === 0) {
    const insert = db.prepare('INSERT INTO news (title, content, date) VALUES (?, ?, ?)');
    await insert.run(
      "Nouveau bureau à Lyon", 
      "RH Conseil s'agrandit avec l'ouverture d'une nouvelle agence à Lyon pour mieux accompagner nos clients du Rhône-Alpes.",
      "2026-02-25"
    );
    await insert.run(
      "Webinaire : Le recrutement en 2026", 
      "Rejoignez-nous le 15 mars pour un webinaire exclusif sur les nouvelles tendances du recrutement et de la rétention des talents.",
      "2026-03-15"
    );
    await insert.run(
      "Bienvenue à notre nouvelle consultante", 
      "Nous sommes ravis d'accueillir Sophie Durand qui rejoint notre équipe en tant que consultante en stratégie RH.",
      "2026-02-20"
    );
  }
  
  const query = getQuery(event);
  const id = query.id;

  if (id) {
    const news = await db.prepare('SELECT * FROM news WHERE id = ?').get(id);
    if (!news) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Article non trouvé'
      });
    }
    return news;
  }

  const news = await db.prepare('SELECT * FROM news ORDER BY date DESC').all();
  return news;
});
