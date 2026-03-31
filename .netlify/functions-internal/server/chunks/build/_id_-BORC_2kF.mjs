import { _ as _export_sfc, c as useRoute, u as useFetch, d as createError, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
    const { data: membre, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/equipe/${route.params.id}`,
      "$u7JW4zNbTA"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    if (error.value || !membre.value) {
      throw createError({ statusCode: 404, statusMessage: "Membre non trouvé", fatal: true });
    }
    useHead({
      title: `${membre.value.nom} - RH Conseil 71`,
      meta: [{ name: "description", content: `Profil de ${membre.value.nom}, ${membre.value.role} chez RH Conseil 71.` }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "member-detail-page" }, _attrs))} data-v-8833b059><div class="container" data-v-8833b059>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/presentation",
        class: "back-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" data-v-8833b059${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" data-v-8833b059${_scopeId}></path></svg> Retour à l&#39;équipe `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "2",
                stroke: "currentColor",
                class: "w-5 h-5"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                })
              ])),
              createTextVNode(" Retour à l'équipe ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="member-layout" data-v-8833b059><div class="image-wrapper" data-v-8833b059>`);
      if (unref(membre).image) {
        _push(`<img${ssrRenderAttr("src", `/equipe-images/${unref(membre).image}`)}${ssrRenderAttr("alt", unref(membre).nom)} class="member-photo" data-v-8833b059>`);
      } else {
        _push(`<div class="member-photo placeholder" data-v-8833b059></div>`);
      }
      _push(`</div><div class="info-wrapper" data-v-8833b059><h1 class="member-name" data-v-8833b059>${ssrInterpolate(unref(membre).nom)}</h1><p class="member-service" data-v-8833b059>${ssrInterpolate(unref(membre).role)}</p><div class="member-desc" data-v-8833b059>${ssrInterpolate(unref(membre).description)}</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/presentation/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8833b059"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BORC_2kF.mjs.map
