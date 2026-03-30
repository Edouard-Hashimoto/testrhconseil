import { _ as _export_sfc, a as __nuxt_component_0$1 } from './server.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@vue/shared';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const credentials = ref({ username: "", password: "" });
    const error = ref("");
    const isLoggingIn = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-1b6ba3d4><div class="login-card" data-v-1b6ba3d4><div class="login-brand" data-v-1b6ba3d4><div class="login-icon" data-v-1b6ba3d4><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-v-1b6ba3d4><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" data-v-1b6ba3d4></path></svg></div><h1 data-v-1b6ba3d4>Administration</h1><p data-v-1b6ba3d4>RH Conseil 71</p></div><form class="login-form" data-v-1b6ba3d4><div class="field" data-v-1b6ba3d4><label data-v-1b6ba3d4>Nom d&#39;utilisateur</label><input${ssrRenderAttr("value", unref(credentials).username)} type="text" placeholder="Votre identifiant" required autocomplete="username" data-v-1b6ba3d4></div><div class="field" data-v-1b6ba3d4><label data-v-1b6ba3d4>Mot de passe</label><input${ssrRenderAttr("value", unref(credentials).password)} type="password" placeholder="••••••••" required autocomplete="current-password" data-v-1b6ba3d4></div>`);
      if (unref(error)) {
        _push(`<div class="login-error" data-v-1b6ba3d4><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-4 h-4 shrink-0" data-v-1b6ba3d4><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" data-v-1b6ba3d4></path></svg> ${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(isLoggingIn)) ? " disabled" : ""} class="login-btn" data-v-1b6ba3d4>`);
      if (unref(isLoggingIn)) {
        _push(`<span class="spinner" data-v-1b6ba3d4></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(isLoggingIn) ? "Connexion..." : "Se connecter")}</button></form>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "login-back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← Retour au site`);
          } else {
            return [
              createTextVNode("← Retour au site")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1b6ba3d4"]]);

export { login as default };
//# sourceMappingURL=login-N9dvox7k.mjs.map
