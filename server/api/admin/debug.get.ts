import { useDb } from '../../utils/db';

// Endpoint de diagnostic sans auth pour tester la DB
export default defineEventHandler(async (event) => {
  const results: Record<string, any> = {}

  // Check auth cookie (info only)
  const authCookie = getCookie(event, 'auth_session')
  results.auth_cookie = authCookie || 'MISSING'

  // Test DB
  try {
    const db = useDb()
    await db.execute('SELECT 1 as ok')
    results.db_ping = 'OK'
  } catch (e: any) {
    results.db_ping = 'FAIL: ' + e.message
    return results
  }

  // Test news table exists
  try {
    const db = useDb()
    const r = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='news'")
    results.news_table_exists = r.rows.length > 0 ? 'YES' : 'NO - table missing!'
  } catch (e: any) {
    results.news_table_exists = 'ERROR: ' + e.message
  }

  // Test actual INSERT
  try {
    const db = useDb()
    const res = await db.execute({
      sql: 'INSERT INTO news (title, content, date, image) VALUES (?, ?, ?, ?)',
      args: ['DIAG_TEST_DELETE_ME', 'test', new Date().toISOString().split('T')[0], null]
    })
    results.insert_test = 'OK - id: ' + res.lastInsertRowid
    // Cleanup
    await db.execute({ sql: 'DELETE FROM news WHERE title = ?', args: ['DIAG_TEST_DELETE_ME'] })
    results.cleanup = 'OK'
  } catch (e: any) {
    results.insert_test = 'FAIL: ' + e.message
  }

  // Test runtime config
  try {
    const config = useRuntimeConfig()
    results.turso_url_set = !!config.tursoUrl ? 'YES (' + (config.tursoUrl as string).substring(0, 20) + '...)' : 'NO - MISSING!'
    results.turso_token_set = !!config.tursoAuthToken ? 'YES' : 'NO - MISSING!'
    results.cloudinary_set = !!config.cloudinaryCloudName ? 'YES' : 'NO - MISSING!'
  } catch (e: any) {
    results.config_error = e.message
  }

  return results
})
