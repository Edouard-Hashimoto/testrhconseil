import { i as getCookie, c as createError } from './nitro.mjs';

const requireAuth = (event) => {
  const authCookie = getCookie(event, "auth_session");
  if (!authCookie || authCookie !== "authenticated") {
    throw createError({
      statusCode: 401,
      statusMessage: "Non autoris\xE9"
    });
  }
};

export { requireAuth as r };
//# sourceMappingURL=auth.mjs.map
