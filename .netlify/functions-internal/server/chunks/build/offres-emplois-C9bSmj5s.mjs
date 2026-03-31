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

const _imports_0 = "" + __buildAssetsURL("lindustrie-recrute.Bvtz0JDA.png");
const _sfc_main = {
  __name: "offres-emplois",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Offres d'emplois - RH Conseil 71",
      meta: [{ name: "description", content: "Consultez les offres d'emploi dans l'industrie sur le 1er hub de l'emploi." }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "offres-page" }, _attrs))} data-v-e764f1b3><div class="container" data-v-e764f1b3><div class="title-wrapper" data-v-e764f1b3><h1 class="page-title" data-v-e764f1b3>Offres d&#39;emplois</h1><div class="title-underline" data-v-e764f1b3></div></div><div class="content-card" data-v-e764f1b3><div class="logo-side" data-v-e764f1b3><img${ssrRenderAttr("src", _imports_0)} alt="L&#39;industrie recrute" class="partner-logo" data-v-e764f1b3></div><div class="text-side" data-v-e764f1b3><h2 class="content-heading" data-v-e764f1b3>L&#39;industrie recrute !</h2><p class="content-text" data-v-e764f1b3> Vous recherchez un emploi dans l&#39;industrie ?<br data-v-e764f1b3> Consultez les offres sur le 1er hub de l&#39;emploi et des métiers de l&#39;industrie :<br data-v-e764f1b3><a href="https://www.lindustrie-recrute.fr/" target="_blank" rel="noopener" class="external-link" data-v-e764f1b3> https://www.lindustrie-recrute.fr/ </a></p></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/offres-emplois.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const offresEmplois = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e764f1b3"]]);

export { offresEmplois as default };
//# sourceMappingURL=offres-emplois-C9bSmj5s.mjs.map
