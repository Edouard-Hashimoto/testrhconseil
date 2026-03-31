import { d as defineEventHandler, e as deleteCookie } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const logout_post = defineEventHandler(async (event) => {
  deleteCookie(event, "auth_session");
  return { message: "D\xE9connect\xE9" };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
