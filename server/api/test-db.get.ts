export default defineEventHandler(async (event) => {
  const db = useDb();
  
  const insert = db.prepare('INSERT INTO test (name) VALUES (?)');
  await insert.run(`Test at ${new Date().toISOString()}`);
  
  const rows = await db.prepare('SELECT * FROM test').all();
  
  return {
    message: "Base de données SQLite opérationnelle !",
    data: rows
  };
});
