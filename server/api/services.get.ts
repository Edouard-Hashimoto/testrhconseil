export default defineEventHandler(async () => {
  const db = useDb();
  const services = db.prepare('SELECT * FROM services ORDER BY created_at ASC').all();
  return services;
});
