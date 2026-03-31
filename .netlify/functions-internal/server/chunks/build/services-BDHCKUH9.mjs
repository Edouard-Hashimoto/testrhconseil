import { _ as _export_sfc, u as useFetch, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, ref, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
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
  __name: "services",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: services2, refresh: refreshServices } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/services",
      "$r_Tau6PNzA"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/categories",
      "$3KxiVljlI5"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const newService = ref({ title: "", color: "#6b21a8", description: "", category_id: null });
    const editingId = ref(null);
    const editData = ref({});
    const uploading = ref(false);
    const saving = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-c9802829><aside class="sidebar" data-v-c9802829><div class="sidebar-brand" data-v-c9802829><span class="sidebar-logo" data-v-c9802829>RH</span><div data-v-c9802829><p class="sidebar-title" data-v-c9802829>RH Conseil 71</p><p class="sidebar-subtitle" data-v-c9802829>Administration</p></div></div><nav class="sidebar-nav" data-v-c9802829><p class="nav-section-label" data-v-c9802829>Contenu</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-c9802829${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" data-v-c9802829${_scopeId}></path></svg> Actualités `);
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
        class: "nav-item active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-c9802829${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" data-v-c9802829${_scopeId}></path></svg> Services `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-c9802829${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.159 3.659A2.25 2.25 0 009.568 3z" data-v-c9802829${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" data-v-c9802829${_scopeId}></path></svg> Catégories `);
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
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-c9802829${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" data-v-c9802829${_scopeId}></path></svg> Particuliers `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-c9802829${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" data-v-c9802829${_scopeId}></path></svg> Équipe `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-c9802829${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" data-v-c9802829${_scopeId}></path></svg> Statistiques `);
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
      _push(`<p class="nav-section-label" data-v-c9802829>Outils</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/database",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-c9802829${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" data-v-c9802829${_scopeId}></path></svg> Base de données `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-c9802829${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" data-v-c9802829${_scopeId}></path></svg> Voir le site `);
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
      _push(`<button class="nav-item logout-btn" data-v-c9802829><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-c9802829><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" data-v-c9802829></path></svg> Déconnexion </button></nav></aside><div class="main-content" data-v-c9802829><header class="page-header" data-v-c9802829><div data-v-c9802829><h1 class="page-title" data-v-c9802829>Services</h1><p class="page-desc" data-v-c9802829>Gérez les cards de service affichées sur l&#39;accueil</p></div><div class="stat-pill" data-v-c9802829><span class="stat-value" data-v-c9802829>${ssrInterpolate(unref(services2)?.length ?? 0)}</span><span class="stat-label" data-v-c9802829>service(s)</span></div></header><section class="card" data-v-c9802829><h2 class="card-title" data-v-c9802829><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" data-v-c9802829><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" data-v-c9802829></path></svg> Nouveau service </h2><form class="form-row" data-v-c9802829><div class="field grow" data-v-c9802829><label data-v-c9802829>Titre</label><input${ssrRenderAttr("value", unref(newService).title)} type="text" placeholder="ex: Recrutement" required data-v-c9802829></div><div class="field" data-v-c9802829><label data-v-c9802829>Couleur</label><div class="color-input" data-v-c9802829><input${ssrRenderAttr("value", unref(newService).color)} type="color" data-v-c9802829><span class="color-hex" data-v-c9802829>${ssrInterpolate(unref(newService).color)}</span></div></div><div class="field grow" data-v-c9802829><label data-v-c9802829>Logo (image)</label><input type="file" accept="image/*" class="file-input" data-v-c9802829></div><div class="field grow" data-v-c9802829><label data-v-c9802829>Catégorie</label><select class="edit-input" style="${ssrRenderStyle({ "height": "38px" })}" data-v-c9802829><option${ssrRenderAttr("value", null)} data-v-c9802829${ssrIncludeBooleanAttr(Array.isArray(unref(newService).category_id) ? ssrLooseContain(unref(newService).category_id, null) : ssrLooseEqual(unref(newService).category_id, null)) ? " selected" : ""}>Aucune</option><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.id)} data-v-c9802829${ssrIncludeBooleanAttr(Array.isArray(unref(newService).category_id) ? ssrLooseContain(unref(newService).category_id, cat.id) : ssrLooseEqual(unref(newService).category_id, cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.titre)}</option>`);
      });
      _push(`<!--]--></select></div><div class="field basis-full" data-v-c9802829><label data-v-c9802829>Description</label><textarea placeholder="Description du service..." rows="3" data-v-c9802829>${ssrInterpolate(unref(newService).description)}</textarea></div><div class="field" style="${ssrRenderStyle({ "padding-top": "0.5rem", "width": "100%", "display": "flex", "justify-content": "flex-end" })}" data-v-c9802829><button type="submit"${ssrIncludeBooleanAttr(unref(saving) || unref(uploading)) ? " disabled" : ""} class="btn-primary" data-v-c9802829>`);
      if (unref(saving) || unref(uploading)) {
        _push(`<span class="spinner-sm" data-v-c9802829></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(saving) || unref(uploading) ? "..." : "Ajouter")}</button></div></form></section><section class="card" data-v-c9802829><h2 class="card-title" data-v-c9802829><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" data-v-c9802829><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" data-v-c9802829></path></svg> Services configurés </h2>`);
      if (!unref(services2) || unref(services2).length === 0) {
        _push(`<div class="empty-state" data-v-c9802829> Aucun service. Utilisez le formulaire ci-dessus pour en créer un. </div>`);
      } else {
        _push(`<div class="services-table-wrap" data-v-c9802829><table class="services-table" data-v-c9802829><thead data-v-c9802829><tr data-v-c9802829><th data-v-c9802829>Couleur</th><th data-v-c9802829>Catégorie</th><th data-v-c9802829>Titre / Description</th><th data-v-c9802829>Logo</th><th class="text-right" data-v-c9802829>Actions</th></tr></thead><tbody data-v-c9802829><!--[-->`);
        ssrRenderList(unref(services2), (service) => {
          _push(`<tr data-v-c9802829>`);
          if (unref(editingId) === service.id) {
            _push(`<!--[--><td data-v-c9802829><input${ssrRenderAttr("value", unref(editData).color)} type="color" class="color-pick-small" data-v-c9802829></td><td data-v-c9802829><select class="edit-input" style="${ssrRenderStyle({ "width": "100%" })}" data-v-c9802829><option${ssrRenderAttr("value", null)} data-v-c9802829${ssrIncludeBooleanAttr(Array.isArray(unref(editData).category_id) ? ssrLooseContain(unref(editData).category_id, null) : ssrLooseEqual(unref(editData).category_id, null)) ? " selected" : ""}>Aucune</option><!--[-->`);
            ssrRenderList(unref(categories), (cat) => {
              _push(`<option${ssrRenderAttr("value", cat.id)} data-v-c9802829${ssrIncludeBooleanAttr(Array.isArray(unref(editData).category_id) ? ssrLooseContain(unref(editData).category_id, cat.id) : ssrLooseEqual(unref(editData).category_id, cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.titre)}</option>`);
            });
            _push(`<!--]--></select></td><td data-v-c9802829><input${ssrRenderAttr("value", unref(editData).title)} class="edit-input mb-2" style="${ssrRenderStyle({ "width": "100%" })}" data-v-c9802829><textarea class="edit-input" style="${ssrRenderStyle({ "width": "100%", "font-size": "0.8rem" })}" rows="2" data-v-c9802829>${ssrInterpolate(unref(editData).description)}</textarea></td><td data-v-c9802829><div class="logo-edit" data-v-c9802829>`);
            if (unref(editData).logo) {
              _push(`<img${ssrRenderAttr("src", `/logos/${unref(editData).logo}`)} class="logo-thumb" data-v-c9802829>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<input type="file" accept="image/*" class="file-input-sm" data-v-c9802829></div></td><td class="text-right" data-v-c9802829><button${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-save" data-v-c9802829>Enregistrer</button><button class="btn-cancel" data-v-c9802829>Annuler</button></td><!--]-->`);
          } else {
            _push(`<!--[--><td data-v-c9802829><div class="color-swatch" style="${ssrRenderStyle({ background: service.color })}" data-v-c9802829></div></td><td data-v-c9802829>`);
            if (service.category_id) {
              _push(`<span class="stat-pill" style="${ssrRenderStyle({ "font-size": "0.7rem", "padding": "0.2rem 0.5rem" })}" data-v-c9802829>${ssrInterpolate(unref(categories)?.find((c) => c.id === service.category_id)?.titre || "?")}</span>`);
            } else {
              _push(`<span class="no-logo" data-v-c9802829>Aucune</span>`);
            }
            _push(`</td><td data-v-c9802829><div class="service-name" data-v-c9802829>${ssrInterpolate(service.title)}</div><div class="service-desc-preview" data-v-c9802829>${ssrInterpolate(service.description?.substring(0, 60))}${ssrInterpolate(service.description?.length > 60 ? "..." : "")}</div></td><td data-v-c9802829>`);
            if (service.logo) {
              _push(`<img${ssrRenderAttr("src", `/logos/${service.logo}`)} class="logo-thumb" data-v-c9802829>`);
            } else {
              _push(`<span class="no-logo" data-v-c9802829>Aucun</span>`);
            }
            _push(`</td><td class="text-right" data-v-c9802829><button class="btn-edit" data-v-c9802829>Modifier</button><button class="btn-del" data-v-c9802829>Supprimer</button></td><!--]-->`);
          }
          _push(`</tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</section><section class="card" data-v-c9802829><h2 class="card-title" data-v-c9802829><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" data-v-c9802829><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" data-v-c9802829></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-c9802829></path></svg> Aperçu — grille homepage </h2><div class="preview-grid" data-v-c9802829><!--[-->`);
      ssrRenderList(unref(services2), (service) => {
        _push(`<div class="preview-card" style="${ssrRenderStyle({ backgroundColor: service.color })}" data-v-c9802829><span class="preview-title" data-v-c9802829>${ssrInterpolate(service.title)}</span>`);
        if (service.logo) {
          _push(`<img${ssrRenderAttr("src", `/logos/${service.logo}`)} class="preview-logo" data-v-c9802829>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (!unref(services2) || unref(services2).length === 0) {
        _push(`<div class="preview-empty" data-v-c9802829> Aucun service à afficher. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const services = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c9802829"]]);

export { services as default };
//# sourceMappingURL=services-BDHCKUH9.mjs.map
