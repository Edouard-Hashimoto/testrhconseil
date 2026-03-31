export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const file = formData.get('file') as File | null

  if (!file) throw createError({ statusCode: 400, statusMessage: 'Aucun fichier fourni' })
  if (!file.type.startsWith('image/')) throw createError({ statusCode: 400, statusMessage: 'Seules les images sont acceptées' })

  const { url } = await uploadToCloudinary(await file.arrayBuffer(), 'qualiopi');

  // Sauvegarder le chemin en DB
  const db = useDb()
  await db.execute({
    sql: `INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    args: ['qualiopi_logo', url]
  })

  return { filename: url, path: url }
})
