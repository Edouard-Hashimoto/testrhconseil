import { withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useFetch } from './server.mjs';
import { u as useHead } from './composables-ClhST5rn.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: statistics } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/statistics",
      "$35IzMKyxxF"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    useHead({
      title: "Statistiques - RH Conseil 71",
      meta: [{ name: "description", content: "Découvrez les statistiques clés de RH Conseil 71." }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "stats-page" }, _attrs))} data-v-a00e19a1><section class="stats-hero" data-v-a00e19a1><div class="hero-overlay" data-v-a00e19a1></div><div class="hero-content" data-v-a00e19a1><h1 class="hero-title" data-v-a00e19a1>Nos Statistiques</h1></div></section><section class="stats-section" data-v-a00e19a1><div class="stats-inner" data-v-a00e19a1>`);
      if (!unref(statistics) || unref(statistics).length === 0) {
        _push(`<div class="empty-state" data-v-a00e19a1> Aucune statistique disponible pour le moment. </div>`);
      } else {
        _push(`<div class="stats-grid" data-v-a00e19a1><!--[-->`);
        ssrRenderList(unref(statistics), (stat) => {
          _push(`<div class="stat-card" data-v-a00e19a1>`);
          if (stat.image) {
            _push(`<div class="stat-img-wrap" data-v-a00e19a1><img${ssrRenderAttr("src", `/uploads/stats/${stat.image}`)}${ssrRenderAttr("alt", stat.title)} class="stat-img" data-v-a00e19a1></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="stat-content" data-v-a00e19a1><h2 class="stat-title" data-v-a00e19a1>${ssrInterpolate(stat.title)}</h2><div class="stat-text" data-v-a00e19a1>${stat.text.replace(/\n/g, "<br/>") ?? ""}</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/statistiques/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a00e19a1"]]);

export { index as default };
//# sourceMappingURL=index-ZqFGBTUu.mjs.map
