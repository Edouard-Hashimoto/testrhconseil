export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { username, password } = body;

  const adminUser = config.adminUsername || 'admin';
  const adminPass = config.adminPassword || 'admin123';

  if (username === adminUser && password === adminPass) {
    setCookie(event, 'auth_session', 'authenticated', {
      path: '/',
      maxAge: 60 * 60 * 24,
      httpOnly: false, // Must be false to be readable by useCookie in client-side middleware
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    return { success: true };
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Identifiants incorrects',
  });
});
