export default defineEventHandler(async (event) => {
  const db = useDb();
  
  await db.execute({ sql: 'INSERT INTO test (name) VALUES (?)', args: [`Test at ${new Date().toISOString()}`] });
  
  const res = await db.execute('SELECT * FROM test');
  
  return {
    message: "Base de données Turso opérationnelle !",
    data: res.rows
  };
});
