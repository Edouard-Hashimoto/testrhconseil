import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const file = await formData.get('file') as File | null

  if (!file) throw createError({ statusCode: 400, statusMessage: 'Aucun fichier fourni' })
  if (!file.type.startsWith('image/')) throw createError({ statusCode: 400, statusMessage: 'Seules les images sont acceptées' })

  const dir = join(process.cwd(), 'public', 'uploads', 'settings')
  await mkdir(dir, { recursive: true })

  const ext = file.name.split('.').pop()
  const filename = `qualiopi_${Date.now()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(join(dir, filename), buffer)

  // Sauvegarder le chemin en DB
  const db = useDb()
  db.prepare(`INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`)
    .run('qualiopi_logo', `/uploads/settings/${filename}`)

  return { filename, path: `/uploads/settings/${filename}` }
})
