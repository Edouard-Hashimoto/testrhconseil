import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { u as useHead } from './composables-ClhST5rn.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@vue/shared';

const _imports_0 = "" + __buildAssetsURL("qualiopi.Cv-P8ba7.webp");
const _sfc_main = {
  __name: "qualiopi",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Certification Qualiopi - RH Conseil 71",
      meta: [{ name: "description", content: "RH Conseil 71 est certifié QUALIOPI pour ses actions de formation et bilans de compétences." }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "qualiopi-page" }, _attrs))} data-v-f5295b60><section class="hero-section" data-v-f5295b60><div class="hero-overlay" data-v-f5295b60></div><div class="hero-content" data-v-f5295b60><h1 class="hero-title" data-v-f5295b60>Notre Certification</h1></div></section><section class="content-section" data-v-f5295b60><div class="container" data-v-f5295b60><div class="certif-card" data-v-f5295b60><div class="certif-img-wrap" data-v-f5295b60><img${ssrRenderAttr("src", _imports_0)} alt="Certification Qualiopi" class="certif-img" data-v-f5295b60></div><div class="certif-text" data-v-f5295b60><h2 class="certif-title" data-v-f5295b60>RH CONSEIL 71 est certifié QUALIOPI !</h2><p class="certif-para" data-v-f5295b60> Toute l’équipe du cabinet RH CONSEIL 71 est ravie de vous annoncer le renouvellement de sa certification QUALIOPI pour les activités suivantes : <strong data-v-f5295b60>Actions de formation et bilans de compétences</strong></p><p class="certif-para" data-v-f5295b60> La certification est valable à compter du 30 juillet 2024 et pour une durée de 3 ans ! </p><div class="certif-actions" data-v-f5295b60><a href="/certificat.pdf" download class="btn-download" data-v-f5295b60><svg class="icon-dl" viewBox="0 0 24 24" fill="currentColor" data-v-f5295b60><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-11v4h3l-4 4-4-4h3V9h2z" data-v-f5295b60></path></svg> Télécharger le certificat </a></div></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/qualiopi.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const qualiopi = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f5295b60"]]);

export { qualiopi as default };
//# sourceMappingURL=qualiopi-dUvyT-Ll.mjs.map
