import { _ as _export_sfc, c as useRoute, u as useFetch, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data: article } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/news",
      { query: { id: route.params.id } },
      "$CAnwm3PH__"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    useHead({
      title: () => article.value?.title ? `${article.value.title} - RH Conseil 71` : "Article - RH Conseil 71"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-page" }, _attrs))} data-v-950b1976>`);
      if (!unref(article)) {
        _push(`<div class="not-found" data-v-950b1976><p data-v-950b1976>Article introuvable.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/articles" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Retour aux actualités`);
            } else {
              return [
                createTextVNode(" Retour aux actualités")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<article class="article-container" data-v-950b1976><header class="article-header" data-v-950b1976>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/articles",
          class: "back-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Actualités`);
            } else {
              return [
                createTextVNode(" Actualités")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h1 class="article-title" data-v-950b1976>${ssrInterpolate(unref(article).title)}</h1><time class="article-date" data-v-950b1976>${ssrInterpolate(new Date(unref(article).date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }))}</time></header>`);
        if (unref(article).image) {
          _push(`<div class="article-img-wrap" data-v-950b1976><img${ssrRenderAttr("src", `/uploads/news/${unref(article).image}`)}${ssrRenderAttr("alt", unref(article).title)} class="article-img" data-v-950b1976></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="article-body" data-v-950b1976>${unref(article).content ?? ""}</div></article>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-950b1976"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BMqP9WxQ.mjs.map
