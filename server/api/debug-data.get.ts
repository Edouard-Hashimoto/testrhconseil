export default defineEventHandler(async (event) => {
  const db = useDb();
  try {
    const res = await db.execute("SELECT * FROM service_formations");
    return res.rows;
  } catch (e: any) {
    return { error: e.message };
  }
});
