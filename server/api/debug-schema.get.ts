export default defineEventHandler(async (event) => {
  const db = useDb();
  try {
    const res = await db.execute("PRAGMA table_info(service_formations)");
    return res.rows;
  } catch (e: any) {
    return { error: e.message };
  }
});
