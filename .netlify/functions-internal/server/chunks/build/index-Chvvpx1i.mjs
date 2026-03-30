import { _ as _export_sfc, u as useFetch, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
    const { data: particuliers } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/particuliers",
      "$Bx5U35GrJA"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    useHead({
      title: "Particuliers - RH Conseil 71",
      meta: [{ name: "description", content: "Nous accompagnons les particuliers dans leurs démarches personnelles de Bilan de compétences, accompagnement individuel type coaching professionnel, ou encore VAE." }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "particuliers-page" }, _attrs))} data-v-b8f3d8bc><div class="page-header" data-v-b8f3d8bc><h1 class="page-title" data-v-b8f3d8bc>Particuliers</h1><p class="page-desc" data-v-b8f3d8bc> Nous accompagnons les particuliers dans leurs démarches personnelles de Bilan de compétences, accompagnement individuel type coaching professionnel, ou encore VAE. </p></div><section class="cards-section" data-v-b8f3d8bc>`);
      if (!unref(particuliers) || unref(particuliers).length === 0) {
        _push(`<div class="empty-state" data-v-b8f3d8bc> Aucune card à afficher pour le moment. </div>`);
      } else {
        _push(`<div class="cards-grid" data-v-b8f3d8bc><!--[-->`);
        ssrRenderList(unref(particuliers), (part) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: part.id,
            to: `/particuliers/${part.id}`,
            class: "service-card"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="card-icon" data-v-b8f3d8bc${_scopeId}>`);
                if (part.picto) {
                  _push2(`<img${ssrRenderAttr("src", `/uploads/${part.picto}`)}${ssrRenderAttr("alt", part.titre)} data-v-b8f3d8bc${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="card-content" data-v-b8f3d8bc${_scopeId}><h3 class="card-title" data-v-b8f3d8bc${_scopeId}>${ssrInterpolate(part.titre)}</h3><p class="card-subtitle" data-v-b8f3d8bc${_scopeId}>${ssrInterpolate(part.description_courte)}</p></div>`);
              } else {
                return [
                  createVNode("div", { class: "card-icon" }, [
                    part.picto ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: `/uploads/${part.picto}`,
                      alt: part.titre
                    }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "card-content" }, [
                    createVNode("h3", { class: "card-title" }, toDisplayString(part.titre), 1),
                    createVNode("p", { class: "card-subtitle" }, toDisplayString(part.description_courte), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/particuliers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b8f3d8bc"]]);

export { index as default };
//# sourceMappingURL=index-Chvvpx1i.mjs.map
