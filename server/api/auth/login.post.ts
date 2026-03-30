export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { username, password } = body;

  const adminUser = config.adminUsername || 'admin';
  const adminPass = config.adminPassword || 'admin123';

  if (username === adminUser && password === adminPass) {
    setCookie(event, 'auth_session', 'authenticated', {
      path: '/',
      maxAge: 60 * 60 * 24
    });
    return { success: true };
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Identifiants incorrects',
  });
});
