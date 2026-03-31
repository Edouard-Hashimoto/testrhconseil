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
  __name: "equipe",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: equipe2, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/equipe",
      "$cs5aXs97mn"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const newMembre = ref({ nom: "", role: "", description: "" });
    const editingId = ref(null);
    const editData = ref({});
    const uploading = ref(false);
    const saving = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-ed03ec24><aside class="sidebar" data-v-ed03ec24><div class="sidebar-brand" data-v-ed03ec24><span class="sidebar-logo" data-v-ed03ec24>RH</span><div data-v-ed03ec24><p class="sidebar-title" data-v-ed03ec24>RH Conseil 71</p><p class="sidebar-subtitle" data-v-ed03ec24>Administration</p></div></div><nav class="sidebar-nav" data-v-ed03ec24><p class="nav-section-label" data-v-ed03ec24>Contenu</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-ed03ec24${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" data-v-ed03ec24${_scopeId}></path></svg> Actualités `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-ed03ec24${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" data-v-ed03ec24${_scopeId}></path></svg> Services `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-ed03ec24${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.159 3.659A2.25 2.25 0 009.568 3z" data-v-ed03ec24${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" data-v-ed03ec24${_scopeId}></path></svg> Catégories `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-ed03ec24${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" data-v-ed03ec24${_scopeId}></path></svg> Particuliers `);
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
        class: "nav-item active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-ed03ec24${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" data-v-ed03ec24${_scopeId}></path></svg> Équipe `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-ed03ec24${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" data-v-ed03ec24${_scopeId}></path></svg> Statistiques `);
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
      _push(`<p class="nav-section-label" data-v-ed03ec24>Outils</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/database",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-ed03ec24${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" data-v-ed03ec24${_scopeId}></path></svg> Base de données `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-ed03ec24${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" data-v-ed03ec24${_scopeId}></path></svg> Voir le site `);
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
      _push(`<button class="nav-item logout-btn" data-v-ed03ec24><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-ed03ec24><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" data-v-ed03ec24></path></svg> Déconnexion </button></nav></aside><div class="main-content" data-v-ed03ec24><header class="page-header" data-v-ed03ec24><div data-v-ed03ec24><h1 class="page-title" data-v-ed03ec24>Équipe</h1><p class="page-desc" data-v-ed03ec24>Gérez les membres de l&#39;équipe</p></div><div class="stat-pill" data-v-ed03ec24><span class="stat-value" data-v-ed03ec24>${ssrInterpolate(unref(equipe2)?.length ?? 0)}</span><span class="stat-label" data-v-ed03ec24>membre(s)</span></div></header><section class="card" data-v-ed03ec24><h2 class="card-title" data-v-ed03ec24> Nouvelle personne </h2><form class="form-row" data-v-ed03ec24><div class="field grow basis-full" data-v-ed03ec24><label data-v-ed03ec24>Nom</label><input${ssrRenderAttr("value", unref(newMembre).nom)} type="text" placeholder="ex: Fanny BOREL" required data-v-ed03ec24></div><div class="field grow basis-full" data-v-ed03ec24><label data-v-ed03ec24>Service (Rôle)</label><input${ssrRenderAttr("value", unref(newMembre).role)} type="text" placeholder="ex: Consultante RH" required data-v-ed03ec24></div><div class="field basis-full" data-v-ed03ec24><label data-v-ed03ec24>Description</label><textarea placeholder="Description..." rows="4" required data-v-ed03ec24>${ssrInterpolate(unref(newMembre).description)}</textarea></div><div class="field grow" data-v-ed03ec24><label data-v-ed03ec24>Image de profil</label><input type="file" name="image" accept="image/*" class="file-input" data-v-ed03ec24></div><div class="field basis-full" style="${ssrRenderStyle({ "padding-top": "0.5rem", "display": "flex", "justify-content": "flex-end" })}" data-v-ed03ec24><button type="submit"${ssrIncludeBooleanAttr(unref(saving) || unref(uploading)) ? " disabled" : ""} class="btn-primary" data-v-ed03ec24>`);
      if (unref(saving) || unref(uploading)) {
        _push(`<span class="spinner-sm" data-v-ed03ec24></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(saving) || unref(uploading) ? "..." : "Ajouter")}</button></div></form></section><section class="card" data-v-ed03ec24><h2 class="card-title" data-v-ed03ec24> Membres actuels </h2>`);
      if (!unref(equipe2) || unref(equipe2).length === 0) {
        _push(`<div class="empty-state" data-v-ed03ec24> Aucune personne enregistrée. Utilisez le formulaire ci-dessus pour en ajouter une. </div>`);
      } else {
        _push(`<div class="services-table-wrap" data-v-ed03ec24><table class="services-table" data-v-ed03ec24><thead data-v-ed03ec24><tr data-v-ed03ec24><th data-v-ed03ec24>Membre</th><th data-v-ed03ec24>Image</th><th class="text-right" data-v-ed03ec24>Actions</th></tr></thead><tbody data-v-ed03ec24><!--[-->`);
        ssrRenderList(unref(equipe2), (membre) => {
          _push(`<tr data-v-ed03ec24>`);
          if (unref(editingId) === membre.id) {
            _push(`<!--[--><td data-v-ed03ec24><input${ssrRenderAttr("value", unref(editData).nom)} class="edit-input mb-2" style="${ssrRenderStyle({ "width": "100%" })}" placeholder="Nom" data-v-ed03ec24><input${ssrRenderAttr("value", unref(editData).role)} class="edit-input mb-2" style="${ssrRenderStyle({ "width": "100%" })}" placeholder="Service" data-v-ed03ec24><textarea class="edit-input" style="${ssrRenderStyle({ "width": "100%", "font-size": "0.8rem" })}" rows="3" placeholder="Description" data-v-ed03ec24>${ssrInterpolate(unref(editData).description)}</textarea></td><td data-v-ed03ec24><div class="logo-edit" data-v-ed03ec24><span class="text-xs" data-v-ed03ec24>Image:</span>`);
            if (unref(editData).image) {
              _push(`<img${ssrRenderAttr("src", `/equipe-images/${unref(editData).image}`)} class="logo-thumb" data-v-ed03ec24>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<input type="file" name="imageEdit" accept="image/*" class="file-input-sm" data-v-ed03ec24></div></td><td class="text-right" data-v-ed03ec24><button${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-save" data-v-ed03ec24>Enregistrer</button><button class="btn-cancel" data-v-ed03ec24>Annuler</button></td><!--]-->`);
          } else {
            _push(`<!--[--><td data-v-ed03ec24><div class="service-name" data-v-ed03ec24>${ssrInterpolate(membre.nom)}</div><div class="service-desc-preview" data-v-ed03ec24><b data-v-ed03ec24>Service:</b> ${ssrInterpolate(membre.role)}</div><div class="service-desc-preview" data-v-ed03ec24><b data-v-ed03ec24>Desc:</b> ${ssrInterpolate(membre.description?.substring(0, 50))}${ssrInterpolate(membre.description?.length > 50 ? "..." : "")}</div></td><td data-v-ed03ec24><div class="flex items-center gap-2" data-v-ed03ec24>`);
            if (membre.image) {
              _push(`<img${ssrRenderAttr("src", `/equipe-images/${membre.image}`)} class="logo-thumb" data-v-ed03ec24>`);
            } else {
              _push(`<span class="no-logo" data-v-ed03ec24>Aucune</span>`);
            }
            _push(`</div></td><td class="text-right" data-v-ed03ec24><button class="btn-edit" data-v-ed03ec24>Modifier</button><button class="btn-del" data-v-ed03ec24>Supprimer</button></td><!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/equipe.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const equipe = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ed03ec24"]]);

export { equipe as default };
//# sourceMappingURL=equipe-D9bkOHGX.mjs.map
