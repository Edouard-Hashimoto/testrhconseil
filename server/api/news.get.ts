export default defineEventHandler(async (event) => {
  const db = useDb();
  
  const resCount = await db.execute('SELECT COUNT(*) as count FROM news');
  const count = resCount.rows[0];
  
  if (count && (count.count as number) === 0) {
    await db.batch([
      {
        sql: "INSERT INTO news (title, content, date) VALUES (?, ?, ?)",
        args: ["Nouveau bureau à Lyon", "RH Conseil s'agrandit avec l'ouverture d'une nouvelle agence à Lyon pour mieux accompagner nos clients du Rhône-Alpes.", "2026-02-25"]
      },
      {
        sql: "INSERT INTO news (title, content, date) VALUES (?, ?, ?)",
        args: ["Webinaire : Le recrutement en 2026", "Rejoignez-nous le 15 mars pour un webinaire exclusif sur les nouvelles tendances du recrutement et de la rétention des talents.", "2026-03-15"]
      },
      {
        sql: "INSERT INTO news (title, content, date) VALUES (?, ?, ?)",
        args: ["Bienvenue à notre nouvelle consultante", "Nous sommes ravis d'accueillir Sophie Durand qui rejoint notre équipe en tant que consultante en stratégie RH.", "2026-02-20"]
      }
    ], "write");
  }
  
  const query = getQuery(event);
  const id = query.id;

  if (id) {
    const res = await db.execute({ sql: 'SELECT * FROM news WHERE id = ?', args: [id as string] });
    const news = res.rows[0];
    if (!news) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Article non trouvé'
      });
    }
    return news;
  }

  const res = await db.execute('SELECT * FROM news ORDER BY date DESC');
  return res.rows;
});
