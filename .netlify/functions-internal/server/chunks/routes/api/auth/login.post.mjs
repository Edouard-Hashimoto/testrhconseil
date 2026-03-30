import { d as defineEventHandler, b as useRuntimeConfig, r as readBody, s as setCookie, c as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const login_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { username, password } = body;
  const adminUser = config.adminUsername || "admin";
  const adminPass = config.adminPassword || "admin123";
  if (username === adminUser && password === adminPass) {
    setCookie(event, "auth_session", "authenticated", {
      path: "/",
      maxAge: 60 * 60 * 24
    });
    return { success: true };
  }
  throw createError({
    statusCode: 401,
    statusMessage: "Identifiants incorrects"
  });
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
