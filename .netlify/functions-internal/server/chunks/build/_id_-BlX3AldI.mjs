import { _ as _export_sfc, c as useRoute, u as useFetch, d as createError, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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
    const { data: particulier, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/particuliers/${route.params.id}`,
      "$MtBxb0V58M"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      throw createError({ statusCode: 404, statusMessage: "Particulier non trouvé", fatal: true });
    }
    useHead({
      title: `${particulier.value?.titre || "Service Particulier"} - RH Conseil 71`,
      meta: [{ name: "description", content: `Découvrez notre service ${particulier.value?.titre}` }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "service-detail-page" }, _attrs))} data-v-ead7f8c8>`);
      if (unref(particulier)) {
        _push(`<div class="service-container" style="${ssrRenderStyle({ "--theme-color": unref(particulier).color || "#42B9B5" })}" data-v-ead7f8c8><nav class="breadcrumb" data-v-ead7f8c8>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Accueil`);
            } else {
              return [
                createTextVNode("Accueil")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="sep" data-v-ead7f8c8>/</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/particuliers" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Particuliers`);
            } else {
              return [
                createTextVNode("Particuliers")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="sep" data-v-ead7f8c8>/</span><span class="curr" data-v-ead7f8c8>${ssrInterpolate(unref(particulier).titre)}</span></nav><div class="service-card-hero" style="${ssrRenderStyle({ background: unref(particulier).color || "linear-gradient(135deg, rgba(66, 185, 181, 0.9) 0%, rgba(31, 110, 108, 0.9) 100%)" })}" data-v-ead7f8c8><div class="hero-content" data-v-ead7f8c8><div class="text-content" data-v-ead7f8c8><h1 class="service-title" data-v-ead7f8c8>${ssrInterpolate(unref(particulier).titre)}</h1><p class="service-subtitle" data-v-ead7f8c8>${ssrInterpolate(unref(particulier).description_courte)}</p></div></div></div><div class="service-main" data-v-ead7f8c8><div class="service-content" data-v-ead7f8c8><h2 class="section-title" data-v-ead7f8c8>Présentation du service</h2>`);
        if (unref(particulier).image) {
          _push(`<div class="content-image-wrapper" data-v-ead7f8c8><img${ssrRenderAttr("src", `/uploads/${unref(particulier).image}`)} class="content-image" alt="Image de présentation" data-v-ead7f8c8></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(particulier).description_complete) {
          _push(`<div class="description-text" data-v-ead7f8c8><!--[-->`);
          ssrRenderList(unref(particulier).description_complete.split("\n"), (para, idx) => {
            _push(`<p data-v-ead7f8c8>${ssrInterpolate(para)}</p>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="no-description" data-v-ead7f8c8><p data-v-ead7f8c8>Détails à venir pour ce service...</p></div>`);
        }
        _push(`</div><aside class="service-sidebar" data-v-ead7f8c8><div class="contact-card" data-v-ead7f8c8><h3 data-v-ead7f8c8>Besoin d&#39;accompagnement ?</h3><p data-v-ead7f8c8>Notre équipe d&#39;experts est à votre écoute pour vous accompagner dans vos démarches.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contact",
          class: "btn-contact"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Contactez-nous`);
            } else {
              return [
                createTextVNode("Contactez-nous")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></aside></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/particuliers/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ead7f8c8"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BlX3AldI.mjs.map
