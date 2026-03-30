import { _ as _export_sfc, u as useFetch, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
    const { data: news } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/news",
      "$YDc5GmR-7o"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const articleSummary = (content) => {
      if (!content) return "";
      const plainText = content.replace(/<[^>]*>/g, " ");
      return plainText;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "articles-page" }, _attrs))} data-v-1279c3c3><div class="container py-12" data-v-1279c3c3><header class="articles-header" data-v-1279c3c3><span class="category-tag" data-v-1279c3c3>Actualités</span><h1 data-v-1279c3c3>Derniers articles</h1><p class="subtitle" data-v-1279c3c3>Retrouvez toutes les actualités et informations importantes de RH Conseil 71.</p><div class="divider" data-v-1279c3c3></div></header>`);
      if (unref(news) && unref(news).length > 0) {
        _push(`<div class="articles-grid" data-v-1279c3c3><!--[-->`);
        ssrRenderList(unref(news), (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.id,
            to: `/articles/${item.id}`,
            class: "article-card"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="image-wrapper" data-v-1279c3c3${_scopeId}>`);
                if (item.image) {
                  _push2(`<img${ssrRenderAttr("src", `/uploads/news/${item.image}`)}${ssrRenderAttr("alt", item.title)} class="article-image" data-v-1279c3c3${_scopeId}>`);
                } else {
                  _push2(`<div class="image-placeholder" data-v-1279c3c3${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-1279c3c3${_scopeId}><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" data-v-1279c3c3${_scopeId}></path></svg></div>`);
                }
                if (item.image) {
                  _push2(`<div class="date-badge" data-v-1279c3c3${_scopeId}>${ssrInterpolate(new Date(item.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="card-body" data-v-1279c3c3${_scopeId}>`);
                if (!item.image) {
                  _push2(`<div class="card-meta" data-v-1279c3c3${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1279c3c3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-1279c3c3${_scopeId}></path></svg><time${ssrRenderAttr("datetime", item.date)} data-v-1279c3c3${_scopeId}>${ssrInterpolate(new Date(item.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }))}</time></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<h2 class="card-title" data-v-1279c3c3${_scopeId}>${ssrInterpolate(item.title)}</h2><div class="card-content" data-v-1279c3c3${_scopeId}>${articleSummary(item.content) ?? ""}</div><div class="card-footer" data-v-1279c3c3${_scopeId}><span class="read-more" data-v-1279c3c3${_scopeId}>En savoir plus</span><div class="arrow-icon" data-v-1279c3c3${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-1279c3c3${_scopeId}><path d="M9 18l6-6-6-6" data-v-1279c3c3${_scopeId}></path></svg></div></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "image-wrapper" }, [
                    item.image ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: `/uploads/news/${item.image}`,
                      alt: item.title,
                      class: "article-image"
                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "image-placeholder"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "32",
                        height: "32",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "1.5",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }, [
                        createVNode("path", { d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" })
                      ]))
                    ])),
                    item.image ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "date-badge"
                    }, toDisplayString(new Date(item.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "card-body" }, [
                    !item.image ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "card-meta"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "14",
                        height: "14",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        })
                      ])),
                      createVNode("time", {
                        datetime: item.date
                      }, toDisplayString(new Date(item.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })), 9, ["datetime"])
                    ])) : createCommentVNode("", true),
                    createVNode("h2", { class: "card-title" }, toDisplayString(item.title), 1),
                    createVNode("div", {
                      class: "card-content",
                      innerHTML: articleSummary(item.content)
                    }, null, 8, ["innerHTML"]),
                    createVNode("div", { class: "card-footer" }, [
                      createVNode("span", { class: "read-more" }, "En savoir plus"),
                      createVNode("div", { class: "arrow-icon" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2.5",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round"
                        }, [
                          createVNode("path", { d: "M9 18l6-6-6-6" })
                        ]))
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-1279c3c3><div class="empty-icon" data-v-1279c3c3><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-1279c3c3><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" data-v-1279c3c3></path></svg></div><h3 data-v-1279c3c3>Aucune actualité pour le moment</h3><p data-v-1279c3c3>Revenez bientôt pour découvrir nos derniers articles.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "btn-home"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Retour à l&#39;accueil`);
            } else {
              return [
                createTextVNode("Retour à l'accueil")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1279c3c3"]]);

export { index as default };
//# sourceMappingURL=index-Dg3HQkQM.mjs.map
