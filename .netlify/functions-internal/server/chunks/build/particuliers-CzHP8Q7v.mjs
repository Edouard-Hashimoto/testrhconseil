import { _ as _export_sfc, u as useFetch, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, ref, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
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
  __name: "particuliers",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: particuliers2, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/particuliers",
      "$owzVMSF4Zu"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const newParticulier = ref({ titre: "", description_courte: "", description_complete: "", color: "#42B9B5" });
    const editingId = ref(null);
    const editData = ref({});
    const uploading = ref(false);
    const saving = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-7be7959e><aside class="sidebar" data-v-7be7959e><div class="sidebar-brand" data-v-7be7959e><span class="sidebar-logo" data-v-7be7959e>RH</span><div data-v-7be7959e><p class="sidebar-title" data-v-7be7959e>RH Conseil 71</p><p class="sidebar-subtitle" data-v-7be7959e>Administration</p></div></div><nav class="sidebar-nav" data-v-7be7959e><p class="nav-section-label" data-v-7be7959e>Contenu</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-7be7959e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" data-v-7be7959e${_scopeId}></path></svg> Actualités `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                })
              ])),
              createTextVNode(" Actualités ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/services",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-7be7959e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" data-v-7be7959e${_scopeId}></path></svg> Services `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                })
              ])),
              createTextVNode(" Services ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/categories",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-7be7959e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.159 3.659A2.25 2.25 0 009.568 3z" data-v-7be7959e${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" data-v-7be7959e${_scopeId}></path></svg> Catégories `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.159 3.659A2.25 2.25 0 009.568 3z"
                }),
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M6 6h.008v.008H6V6z"
                })
              ])),
              createTextVNode(" Catégories ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/particuliers",
        class: "nav-item active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-7be7959e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" data-v-7be7959e${_scopeId}></path></svg> Particuliers `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                })
              ])),
              createTextVNode(" Particuliers ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/equipe",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-7be7959e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" data-v-7be7959e${_scopeId}></path></svg> Équipe `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                })
              ])),
              createTextVNode(" Équipe ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/statistics",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-7be7959e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" data-v-7be7959e${_scopeId}></path></svg> Statistiques `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                })
              ])),
              createTextVNode(" Statistiques ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="nav-section-label" data-v-7be7959e>Outils</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/database",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-7be7959e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" data-v-7be7959e${_scopeId}></path></svg> Base de données `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                })
              ])),
              createTextVNode(" Base de données ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-7be7959e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" data-v-7be7959e${_scopeId}></path></svg> Voir le site `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"
                })
              ])),
              createTextVNode(" Voir le site ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="nav-item logout-btn" data-v-7be7959e><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-7be7959e><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" data-v-7be7959e></path></svg> Déconnexion </button></nav></aside><div class="main-content" data-v-7be7959e><header class="page-header" data-v-7be7959e><div data-v-7be7959e><h1 class="page-title" data-v-7be7959e>Particuliers</h1><p class="page-desc" data-v-7be7959e>Gérez les cards pour la section Particuliers</p></div><div class="stat-pill" data-v-7be7959e><span class="stat-value" data-v-7be7959e>${ssrInterpolate(unref(particuliers2)?.length ?? 0)}</span><span class="stat-label" data-v-7be7959e>card(s)</span></div></header><section class="card" data-v-7be7959e><h2 class="card-title" data-v-7be7959e><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" data-v-7be7959e><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" data-v-7be7959e></path></svg> Nouvelle card </h2><form class="form-row" data-v-7be7959e><div class="field grow basis-full" data-v-7be7959e><label data-v-7be7959e>Titre</label><input${ssrRenderAttr("value", unref(newParticulier).titre)} type="text" placeholder="ex: Bilan de compétences" required data-v-7be7959e></div><div class="field grow basis-full" data-v-7be7959e><label data-v-7be7959e>Description courte (sur la carte)</label><input${ssrRenderAttr("value", unref(newParticulier).description_courte)} type="text" placeholder="ex: Évaluez vos atouts" required data-v-7be7959e></div><div class="field basis-full" data-v-7be7959e><label data-v-7be7959e>Description complète (page détail)</label><textarea placeholder="Description complète..." rows="4" required data-v-7be7959e>${ssrInterpolate(unref(newParticulier).description_complete)}</textarea></div><div class="field grow" data-v-7be7959e><label data-v-7be7959e>Picto de la card (image)</label><input type="file" name="picto" accept="image/*" class="file-input" data-v-7be7959e></div><div class="field grow" data-v-7be7959e><label data-v-7be7959e>Image pour la page détail</label><input type="file" name="image" accept="image/*" class="file-input" data-v-7be7959e></div><div class="field grow" data-v-7be7959e><label data-v-7be7959e>Couleur / Dégradé de fond</label><input${ssrRenderAttr("value", unref(newParticulier).color)} type="text" placeholder="ex: #42B9B5 ou linear-gradient(...)" data-v-7be7959e></div><div class="field basis-full" style="${ssrRenderStyle({ "padding-top": "0.5rem", "display": "flex", "justify-content": "flex-end" })}" data-v-7be7959e><button type="submit"${ssrIncludeBooleanAttr(unref(saving) || unref(uploading)) ? " disabled" : ""} class="btn-primary" data-v-7be7959e>`);
      if (unref(saving) || unref(uploading)) {
        _push(`<span class="spinner-sm" data-v-7be7959e></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(saving) || unref(uploading) ? "..." : "Ajouter")}</button></div></form></section><section class="card" data-v-7be7959e><h2 class="card-title" data-v-7be7959e><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" data-v-7be7959e><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" data-v-7be7959e></path></svg> Cards configurées </h2>`);
      if (!unref(particuliers2) || unref(particuliers2).length === 0) {
        _push(`<div class="empty-state" data-v-7be7959e> Aucune card. Utilisez le formulaire ci-dessus pour en créer une. </div>`);
      } else {
        _push(`<div class="services-table-wrap" data-v-7be7959e><table class="services-table" data-v-7be7959e><thead data-v-7be7959e><tr data-v-7be7959e><th data-v-7be7959e>Titre / Descriptions</th><th data-v-7be7959e>Picto / Image</th><th class="text-right" data-v-7be7959e>Actions</th></tr></thead><tbody data-v-7be7959e><!--[-->`);
        ssrRenderList(unref(particuliers2), (part) => {
          _push(`<tr data-v-7be7959e>`);
          if (unref(editingId) === part.id) {
            _push(`<!--[--><td data-v-7be7959e><input${ssrRenderAttr("value", unref(editData).titre)} class="edit-input mb-2" style="${ssrRenderStyle({ "width": "100%" })}" placeholder="Titre" data-v-7be7959e><input${ssrRenderAttr("value", unref(editData).description_courte)} class="edit-input mb-2" style="${ssrRenderStyle({ "width": "100%" })}" placeholder="Description courte" data-v-7be7959e><textarea class="edit-input mb-2" style="${ssrRenderStyle({ "width": "100%", "font-size": "0.8rem" })}" rows="3" placeholder="Description complète" data-v-7be7959e>${ssrInterpolate(unref(editData).description_complete)}</textarea><div class="mt-2" data-v-7be7959e><label class="text-xs font-bold block mb-1" data-v-7be7959e>Couleur / Dégradé:</label><input${ssrRenderAttr("value", unref(editData).color)} class="edit-input" style="${ssrRenderStyle({ "width": "100%" })}" placeholder="Couleur ou dégradé" data-v-7be7959e></div></td><td data-v-7be7959e><div class="logo-edit mb-2" data-v-7be7959e><span class="text-xs" data-v-7be7959e>Picto:</span>`);
            if (unref(editData).picto) {
              _push(`<img${ssrRenderAttr("src", `/uploads/${unref(editData).picto}`)} class="logo-thumb" data-v-7be7959e>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<input type="file" name="pictoEdit" accept="image/*" class="file-input-sm" data-v-7be7959e></div><div class="logo-edit" data-v-7be7959e><span class="text-xs" data-v-7be7959e>Image:</span>`);
            if (unref(editData).image) {
              _push(`<img${ssrRenderAttr("src", `/uploads/${unref(editData).image}`)} class="logo-thumb" data-v-7be7959e>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<input type="file" name="imageEdit" accept="image/*" class="file-input-sm" data-v-7be7959e></div></td><td class="text-right" data-v-7be7959e><button${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-save" data-v-7be7959e>Enregistrer</button><button class="btn-cancel" data-v-7be7959e>Annuler</button></td><!--]-->`);
          } else {
            _push(`<!--[--><td data-v-7be7959e><div class="service-name" data-v-7be7959e>${ssrInterpolate(part.titre)}</div><div class="service-desc-preview" data-v-7be7959e><b data-v-7be7959e>Courte:</b> ${ssrInterpolate(part.description_courte)}</div><div class="service-desc-preview" data-v-7be7959e><b data-v-7be7959e>Complète:</b> ${ssrInterpolate(part.description_complete?.substring(0, 50))}${ssrInterpolate(part.description_complete?.length > 50 ? "..." : "")}</div><div class="flex items-center gap-2 mt-1" data-v-7be7959e><span class="text-xs text-gray-400" data-v-7be7959e>Fond:</span><div class="color-preview" style="${ssrRenderStyle({ background: part.color || "#42B9B5" })}" data-v-7be7959e></div><span class="text-xs truncate" style="${ssrRenderStyle({ "max-width": "150px" })}" data-v-7be7959e>${ssrInterpolate(part.color || "#42B9B5")}</span></div></td><td data-v-7be7959e><div class="flex items-center gap-2 mb-1" data-v-7be7959e><span class="text-xs text-gray-400" data-v-7be7959e>Picto:</span>`);
            if (part.picto) {
              _push(`<img${ssrRenderAttr("src", `/uploads/${part.picto}`)} class="logo-thumb" data-v-7be7959e>`);
            } else {
              _push(`<span class="no-logo" data-v-7be7959e>Aucun</span>`);
            }
            _push(`</div><div class="flex items-center gap-2" data-v-7be7959e><span class="text-xs text-gray-400" data-v-7be7959e>Image:</span>`);
            if (part.image) {
              _push(`<img${ssrRenderAttr("src", `/uploads/${part.image}`)} class="logo-thumb" data-v-7be7959e>`);
            } else {
              _push(`<span class="no-logo" data-v-7be7959e>Aucune</span>`);
            }
            _push(`</div></td><td class="text-right" data-v-7be7959e><button class="btn-edit" data-v-7be7959e>Modifier</button><button class="btn-del" data-v-7be7959e>Supprimer</button></td><!--]-->`);
          }
          _push(`</tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</section></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/particuliers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const particuliers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7be7959e"]]);

export { particuliers as default };
//# sourceMappingURL=particuliers-CzHP8Q7v.mjs.map
