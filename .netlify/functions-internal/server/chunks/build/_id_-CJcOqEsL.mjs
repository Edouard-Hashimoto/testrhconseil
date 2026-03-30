import { _ as _export_sfc, c as useRoute, u as useFetch, d as createError, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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
    const { data: service, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/services/${route.params.id}`,
      "$45jfhzsSGI"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      throw createError({ statusCode: 404, statusMessage: "Service non trouvé", fatal: true });
    }
    useHead({
      title: `${service.value?.title || "Service"} - RH Conseil 71`,
      meta: [{ name: "description", content: `Découvrez notre service ${service.value?.title}` }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "service-detail-page" }, _attrs))} data-v-3bc6664e>`);
      if (unref(service)) {
        _push(`<div class="service-container" data-v-3bc6664e><nav class="breadcrumb" data-v-3bc6664e>`);
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
        _push(`<span class="sep" data-v-3bc6664e>/</span>`);
        if (unref(service).category_id) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/categories/${unref(service).category_id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(service).category_titre)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(service).category_titre), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<span class="sep" data-v-3bc6664e>/</span><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="curr" data-v-3bc6664e>${ssrInterpolate(unref(service).title)}</span></nav><div class="service-card-hero" style="${ssrRenderStyle({ background: unref(service).color })}" data-v-3bc6664e><div class="hero-content" data-v-3bc6664e><h1 class="service-title" data-v-3bc6664e>${ssrInterpolate(unref(service).title)}</h1>`);
        if (unref(service).logo) {
          _push(`<img${ssrRenderAttr("src", `/logos/${unref(service).logo}`)} class="service-logo" alt="" data-v-3bc6664e>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="service-main" data-v-3bc6664e><div class="service-content" data-v-3bc6664e><h2 class="section-title" data-v-3bc6664e>Présentation du service</h2>`);
        if (unref(service).description) {
          _push(`<div class="description-text" data-v-3bc6664e><!--[-->`);
          ssrRenderList(unref(service).description.split("\n"), (para, idx) => {
            _push(`<p data-v-3bc6664e>${ssrInterpolate(para)}</p>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="no-description" data-v-3bc6664e><p data-v-3bc6664e>Détails à venir pour ce service...</p></div>`);
        }
        _push(`</div><aside class="service-sidebar" data-v-3bc6664e>`);
        if (unref(service).category_id) {
          _push(`<div class="sidebar-categories" data-v-3bc6664e><span class="sidebar-label" data-v-3bc6664e>Catégorie</span><div class="tags-list" data-v-3bc6664e>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/categories/${unref(service).category_id}`,
            class: "category-tag"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(service).category_titre)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(service).category_titre), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="contact-card" data-v-3bc6664e><h3 data-v-3bc6664e>Besoin d&#39;accompagnement ?</h3><p data-v-3bc6664e>Notre équipe d&#39;experts est à votre écoute pour répondre à vos besoins spécifiques.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contact",
          class: "btn-contact",
          style: { background: unref(service).color }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3bc6664e"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CJcOqEsL.mjs.map
