import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      message: ""
    });
    const sending = ref(false);
    const success = ref(false);
    const errorMsg = ref("");
    useHead({
      title: "Contact - RH Conseil 71",
      meta: [
        { name: "description", content: "Contactez RH Conseil 71 pour vos besoins en ressources humaines." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "contact-page" }, _attrs))} data-v-fc99820d><div class="contact-container" data-v-fc99820d><div class="contact-grid" data-v-fc99820d><div class="contact-form-section" data-v-fc99820d><h1 class="contact-title" data-v-fc99820d>Contact</h1><div class="title-bar" data-v-fc99820d></div><form class="contact-form" data-v-fc99820d><div class="form-row" data-v-fc99820d><div class="form-group" data-v-fc99820d><input type="text"${ssrRenderAttr("value", form.value.nom)} placeholder="Nom" required data-v-fc99820d></div><div class="form-group" data-v-fc99820d><input type="text"${ssrRenderAttr("value", form.value.prenom)} placeholder="Prénom" required data-v-fc99820d></div></div><div class="form-group" data-v-fc99820d><input type="tel"${ssrRenderAttr("value", form.value.telephone)} placeholder="Numéro de téléphone" data-v-fc99820d></div><div class="form-group" data-v-fc99820d><input type="email"${ssrRenderAttr("value", form.value.email)} placeholder="Adresse mail" required data-v-fc99820d></div><div class="form-group" data-v-fc99820d><textarea placeholder="Message" rows="6" required data-v-fc99820d>${ssrInterpolate(form.value.message)}</textarea></div><button type="submit" class="submit-btn"${ssrIncludeBooleanAttr(sending.value) ? " disabled" : ""} data-v-fc99820d>${ssrInterpolate(sending.value ? "Envoi..." : "Envoyer")}</button>`);
      if (success.value) {
        _push(`<p class="success-message" data-v-fc99820d>Message envoyé avec succès !</p>`);
      } else {
        _push(`<!---->`);
      }
      if (errorMsg.value) {
        _push(`<p class="error-message" data-v-fc99820d>${ssrInterpolate(errorMsg.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div><div class="contact-map-section" data-v-fc99820d><div id="map" class="leaflet-map-container" data-v-fc99820d></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fc99820d"]]);

export { contact as default };
//# sourceMappingURL=contact-Dn6UUMkK.mjs.map
