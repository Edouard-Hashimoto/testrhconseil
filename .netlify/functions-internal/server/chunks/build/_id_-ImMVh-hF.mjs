import { _ as _export_sfc, c as useRoute, u as useFetch, d as createError, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createTextVNode, openBlock, createBlock, createVNode, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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
    const { data: category, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/categories/${route.params.id}`,
      "$1xhkfbUf_i"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      throw createError({ statusCode: 404, statusMessage: "Catégorie non trouvée", fatal: true });
    }
    useHead({
      title: `${category.value?.titre || "Catégorie"} - RH Conseil 71`,
      meta: [{ name: "description", content: category.value?.description || "" }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "category-detail-page" }, _attrs))} data-v-5d2c02bf>`);
      if (unref(category)) {
        _push(`<div class="category-container" data-v-5d2c02bf><nav class="breadcrumb" data-v-5d2c02bf>`);
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
        _push(`<span class="sep" data-v-5d2c02bf>/</span><span class="curr" data-v-5d2c02bf>${ssrInterpolate(unref(category).titre)}</span></nav><div class="category-hero" data-v-5d2c02bf><div class="hero-overlay" data-v-5d2c02bf></div>`);
        if (unref(category).image) {
          _push(`<img${ssrRenderAttr("src", `/categories/${unref(category).image}`)} class="hero-bg-image" alt="" data-v-5d2c02bf>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="hero-content" data-v-5d2c02bf><h1 class="category-title" data-v-5d2c02bf>${ssrInterpolate(unref(category).titre)}</h1>`);
        if (unref(category).description) {
          _push(`<p class="category-description" data-v-5d2c02bf>${ssrInterpolate(unref(category).description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(category).subcategories && unref(category).subcategories.length > 0) {
          _push(`<div class="subcategories-section" data-v-5d2c02bf><h2 class="section-title" data-v-5d2c02bf>Sous-catégories</h2><div class="subcategories-grid" data-v-5d2c02bf><!--[-->`);
          ssrRenderList(unref(category).subcategories, (sub) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: sub.id,
              to: `/categories/${sub.id}`,
              class: "sub-cat-card"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  if (sub.image) {
                    _push2(`<div class="sub-cat-img" data-v-5d2c02bf${_scopeId}><img${ssrRenderAttr("src", `/categories/${sub.image}`)} alt="" data-v-5d2c02bf${_scopeId}></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="sub-cat-info" data-v-5d2c02bf${_scopeId}><h3 data-v-5d2c02bf${_scopeId}>${ssrInterpolate(sub.titre)}</h3>`);
                  if (sub.description) {
                    _push2(`<p data-v-5d2c02bf${_scopeId}>${ssrInterpolate(sub.description.substring(0, 100))}...</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  return [
                    sub.image ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "sub-cat-img"
                    }, [
                      createVNode("img", {
                        src: `/categories/${sub.image}`,
                        alt: ""
                      }, null, 8, ["src"])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "sub-cat-info" }, [
                      createVNode("h3", null, toDisplayString(sub.titre), 1),
                      sub.description ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(sub.description.substring(0, 100)) + "...", 1)) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categories/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5d2c02bf"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-ImMVh-hF.mjs.map
