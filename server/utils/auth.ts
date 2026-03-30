import { H3Event } from 'h3';

export const requireAuth = (event: H3Event) => {
  const authCookie = getCookie(event, 'auth_session');
  if (!authCookie || authCookie !== 'authenticated') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Non autorisé',
    });
  }
};
