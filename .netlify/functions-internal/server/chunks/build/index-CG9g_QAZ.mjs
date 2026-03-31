import { _ as _export_sfc, u as useFetch, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, ref, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, unref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
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

const _sfc_main$1 = {
  __name: "RichEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editor = useEditor({
      content: props.modelValue,
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
          autolink: true
        }),
        Image.configure({
          inline: false,
          allowBase64: false
        })
      ],
      onUpdate({ editor: editor2 }) {
        emit("update:modelValue", editor2.getHTML());
      }
    });
    watch(() => props.modelValue, (val) => {
      if (editor.value && editor.value.getHTML() !== val) {
        editor.value.commands.setContent(val || "", false);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rich-editor" }, _attrs))} data-v-e4115a2d>`);
      if (unref(editor)) {
        _push(`<div class="toolbar" data-v-e4115a2d><button type="button" class="${ssrRenderClass({ active: unref(editor).isActive("bold") })}" title="Gras" data-v-e4115a2d><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" data-v-e4115a2d><path d="M8 11h4.5a2.5 2.5 0 000-5H8v5zm10 4.5a4.5 4.5 0 01-4.5 4.5H6V4h6.5a4.5 4.5 0 013.256 7.606A4.498 4.498 0 0118 15.5zM8 13v5h5.5a2.5 2.5 0 000-5H8z" data-v-e4115a2d></path></svg></button><button type="button" class="${ssrRenderClass({ active: unref(editor).isActive("italic") })}" title="Italique" data-v-e4115a2d><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" data-v-e4115a2d><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" data-v-e4115a2d></path></svg></button><div class="toolbar-sep" data-v-e4115a2d></div><button type="button" class="${ssrRenderClass({ active: unref(editor).isActive("link") })}" title="InsÃ©rer un lien" data-v-e4115a2d><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" data-v-e4115a2d><path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 00-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 019.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 01-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 007.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.071z" data-v-e4115a2d></path></svg></button><button type="button"${ssrIncludeBooleanAttr(!unref(editor).isActive("link")) ? " disabled" : ""} title="Retirer le lien" data-v-e4115a2d><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" data-v-e4115a2d><path d="M17 17h5v2h-5v-2zm-8-2H4v-2h5v2zM9.879 7.05l1.414 1.414L9.88 9.878 8.464 8.464 9.88 7.05zM3.515 20.485a9.004 9.004 0 010-12.728L6.343 4.93l1.415 1.414L4.93 9.17a7 7 0 009.9 9.9l2.828-2.828 1.414 1.414-2.828 2.828a9.004 9.004 0 01-12.728 0zm13.435-7.778l-1.414-1.414 1.414-1.414 1.414 1.414-1.414 1.414z" data-v-e4115a2d></path></svg></button><div class="toolbar-sep" data-v-e4115a2d></div><button type="button" title="InsÃ©rer une image" data-v-e4115a2d><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" data-v-e4115a2d><path d="M5 11.1l2-2 5.5 5.5 3.5-3.5 3 3V5H5v6.1zm0 2.829V19h3.1l2.986-2.985L7 11.929l-2 2zM10.929 19H19v-2.071l-3-3L10.929 19zM4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm11.5 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" data-v-e4115a2d></path></svg></button><div class="toolbar-sep" data-v-e4115a2d></div><button type="button" class="${ssrRenderClass({ active: unref(editor).isActive("bulletList") })}" title="Liste Ã  puces" data-v-e4115a2d><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" data-v-e4115a2d><path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 6.9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" data-v-e4115a2d></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(EditorContent), {
        editor: unref(editor),
        class: "editor-content"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RichEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-e4115a2d"]]), { __name: "RichEditor" });
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: news, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/news",
      "$B7P4VRsO-L"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const newArticle = ref({ title: "", content: "" });
    const isSending = ref(false);
    ref(null);
    ref(null);
    const stripHtml = (html) => {
      if (!html) return "";
      return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    };
    const { data: settingsData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/settings",
      "$LHXWfCZNQP"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const qualiopiVisible = ref(settingsData.value?.qualiopi_visible === "1");
    const qualiopiText = ref(settingsData.value?.qualiopi_text ?? "");
    const qualiopiLogoUrl = ref(settingsData.value?.qualiopi_logo || "");
    const qualiopiLogoFile = ref(null);
    ref(null);
    const isSavingSettings = ref(false);
    const settingsSaved = ref(false);
    const isUploadingLogo = ref(false);
    const logoUploaded = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_RichEditor = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-bbef2b34><aside class="sidebar" data-v-bbef2b34><div class="sidebar-brand" data-v-bbef2b34><span class="sidebar-logo" data-v-bbef2b34>RH</span><div data-v-bbef2b34><p class="sidebar-title" data-v-bbef2b34>RH Conseil 71</p><p class="sidebar-subtitle" data-v-bbef2b34>Administration</p></div></div><nav class="sidebar-nav" data-v-bbef2b34><p class="nav-section-label" data-v-bbef2b34>Contenu</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "nav-item active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-bbef2b34${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" data-v-bbef2b34${_scopeId}></path></svg> Actualités `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-bbef2b34${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" data-v-bbef2b34${_scopeId}></path></svg> Services `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-bbef2b34${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.159 3.659A2.25 2.25 0 009.568 3z" data-v-bbef2b34${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" data-v-bbef2b34${_scopeId}></path></svg> Catégories `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-bbef2b34${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" data-v-bbef2b34${_scopeId}></path></svg> Particuliers `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-bbef2b34${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" data-v-bbef2b34${_scopeId}></path></svg> Équipe `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-bbef2b34${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" data-v-bbef2b34${_scopeId}></path></svg> Statistiques `);
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
      _push(`<p class="nav-section-label" data-v-bbef2b34>Outils</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/database",
        class: "nav-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-bbef2b34${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" data-v-bbef2b34${_scopeId}></path></svg> Base de données `);
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
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-bbef2b34${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" data-v-bbef2b34${_scopeId}></path></svg> Voir le site `);
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
                  d: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                })
              ])),
              createTextVNode(" Voir le site ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="nav-item logout-btn" data-v-bbef2b34><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-bbef2b34><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" data-v-bbef2b34></path></svg> Déconnexion </button></nav></aside><div class="main-content" data-v-bbef2b34><header class="page-header" data-v-bbef2b34><div data-v-bbef2b34><h1 class="page-title" data-v-bbef2b34>Actualités</h1><p class="page-desc" data-v-bbef2b34>Gérez les articles affichés sur le site</p></div><div class="header-stats" data-v-bbef2b34><div class="stat-pill" data-v-bbef2b34><span class="stat-value" data-v-bbef2b34>${ssrInterpolate(unref(news)?.length ?? 0)}</span><span class="stat-label" data-v-bbef2b34>article(s)</span></div></div></header><section class="card" data-v-bbef2b34><h2 class="card-title" data-v-bbef2b34><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" data-v-bbef2b34><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" data-v-bbef2b34></path></svg> Nouvel article </h2><form class="form-grid" data-v-bbef2b34><div class="field" data-v-bbef2b34><label data-v-bbef2b34>Titre</label><input${ssrRenderAttr("value", unref(newArticle).title)} type="text" placeholder="Titre de l&#39;actualité" required data-v-bbef2b34></div><div class="field" data-v-bbef2b34><label data-v-bbef2b34>Image d&#39;illustration (optionnel)</label><input type="file" accept="image/*" data-v-bbef2b34></div><div class="field span-full" data-v-bbef2b34><label data-v-bbef2b34>Contenu</label>`);
      _push(ssrRenderComponent(_component_RichEditor, {
        modelValue: unref(newArticle).content,
        "onUpdate:modelValue": ($event) => unref(newArticle).content = $event
      }, null, _parent));
      _push(`</div><div class="span-full" data-v-bbef2b34><button type="submit"${ssrIncludeBooleanAttr(unref(isSending)) ? " disabled" : ""} class="btn-primary" data-v-bbef2b34>`);
      if (unref(isSending)) {
        _push(`<span class="spinner" data-v-bbef2b34></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(isSending) ? "Publication..." : "Publier l'article")}</button></div></form></section><section class="card" data-v-bbef2b34><h2 class="card-title" data-v-bbef2b34><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" data-v-bbef2b34><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" data-v-bbef2b34></path></svg> Articles publiés </h2>`);
      if (!unref(news) || unref(news).length === 0) {
        _push(`<div class="empty-state" data-v-bbef2b34> Aucun article publié pour le moment. </div>`);
      } else {
        _push(`<div class="news-list" data-v-bbef2b34><!--[-->`);
        ssrRenderList(unref(news), (item) => {
          _push(`<div class="news-item" data-v-bbef2b34><div class="news-item-info" data-v-bbef2b34><span class="news-date" data-v-bbef2b34>${ssrInterpolate(new Date(item.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }))}</span><p class="news-title" data-v-bbef2b34>${ssrInterpolate(item.title)}</p><p class="news-preview" data-v-bbef2b34>${ssrInterpolate(stripHtml(item.content).slice(0, 120))}${ssrInterpolate(stripHtml(item.content).length > 120 ? "…" : "")}</p></div><button class="btn-delete" title="Supprimer" data-v-bbef2b34><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-bbef2b34><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" data-v-bbef2b34></path></svg></button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</section><section class="card" data-v-bbef2b34><h2 class="card-title" data-v-bbef2b34><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" data-v-bbef2b34><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" data-v-bbef2b34></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" data-v-bbef2b34></path></svg> Paramètres du site </h2><div class="settings-block" data-v-bbef2b34><div class="settings-row" data-v-bbef2b34><div class="settings-label-group" data-v-bbef2b34><span class="settings-label" data-v-bbef2b34>Section Qualiopi dans le footer</span><span class="settings-hint" data-v-bbef2b34>Affiche ou masque le logo et le texte Qualiopi</span></div><button type="button" class="${ssrRenderClass([{ "toggle-on": unref(qualiopiVisible) }, "toggle-btn"])}" data-v-bbef2b34><span class="toggle-thumb" data-v-bbef2b34></span></button></div>`);
      if (unref(qualiopiVisible)) {
        _push(`<div class="field span-full" style="${ssrRenderStyle({ "margin-top": "1rem" })}" data-v-bbef2b34><label data-v-bbef2b34>Logo Qualiopi</label><div class="logo-upload-row" data-v-bbef2b34>`);
        if (unref(qualiopiLogoUrl)) {
          _push(`<img${ssrRenderAttr("src", unref(qualiopiLogoUrl))} alt="Logo Qualiopi actuel" class="logo-preview" data-v-bbef2b34>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="logo-upload-controls" data-v-bbef2b34><input type="file" accept="image/*" data-v-bbef2b34><button type="button"${ssrIncludeBooleanAttr(!unref(qualiopiLogoFile) || unref(isUploadingLogo)) ? " disabled" : ""} class="btn-primary" data-v-bbef2b34>`);
        if (unref(isUploadingLogo)) {
          _push(`<span class="spinner" data-v-bbef2b34></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(isUploadingLogo) ? "Upload..." : "Remplacer le logo")}</button>`);
        if (unref(logoUploaded)) {
          _push(`<span class="saved-badge" data-v-bbef2b34>✓ Logo mis à jour</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(qualiopiVisible)) {
        _push(`<div class="field span-full" style="${ssrRenderStyle({ "margin-top": "1rem" })}" data-v-bbef2b34><label data-v-bbef2b34>Texte affiché sous le logo Qualiopi</label><textarea rows="4" placeholder="Texte de certification..." data-v-bbef2b34>${ssrInterpolate(unref(qualiopiText))}</textarea></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="settings-actions" data-v-bbef2b34><button type="button"${ssrIncludeBooleanAttr(unref(isSavingSettings)) ? " disabled" : ""} class="btn-primary" data-v-bbef2b34>`);
      if (unref(isSavingSettings)) {
        _push(`<span class="spinner" data-v-bbef2b34></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(isSavingSettings) ? "Sauvegarde..." : "Enregistrer")}</button>`);
      if (unref(settingsSaved)) {
        _push(`<span class="saved-badge" data-v-bbef2b34>✓ Enregistré</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bbef2b34"]]);

export { index as default };
//# sourceMappingURL=index-CG9g_QAZ.mjs.map
