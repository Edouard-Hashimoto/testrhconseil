import { _ as _export_sfc, u as useFetch, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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

const _imports_0 = "" + __buildAssetsURL("fond_presentation.CM2Jm6pc.webp");
const _imports_1 = "" + __buildAssetsURL("RHC.Bmyp9XP2.webp");
const _imports_2 = "" + __buildAssetsURL("batiment.D2Iro-qb.jpg");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: equipe } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/equipe",
      "$UYonTYh_A_"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    useHead({
      title: "Qui sommes-nous ? - RH Conseil 71",
      meta: [{ name: "description", content: "Découvrez l'équipe de RH Conseil 71, cabinet RH à taille humaine créé en 2004." }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pres-page" }, _attrs))} data-v-d8c124f2><section class="pres-hero" data-v-d8c124f2><img${ssrRenderAttr("src", _imports_0)} alt="" class="hero-bg" data-v-d8c124f2><div class="hero-overlay" data-v-d8c124f2></div><div class="hero-content" data-v-d8c124f2><h1 class="hero-title" data-v-d8c124f2>Qui sommes nous ?</h1></div></section><section class="team-section" data-v-d8c124f2><div class="team-inner" data-v-d8c124f2><div class="team-img-wrap" data-v-d8c124f2><div class="deco deco-green" data-v-d8c124f2></div><div class="deco deco-pink" data-v-d8c124f2></div><img${ssrRenderAttr("src", _imports_1)} alt="Équipe RH Conseil 71" class="team-img" data-v-d8c124f2></div><div class="team-text" data-v-d8c124f2><p class="team-desc" data-v-d8c124f2> Une équipe de proximité enthousiaste et solidaire et des experts réactifs et agiles pour vous accompagner dans vos projets ! </p></div></div></section><section class="members-section" data-v-d8c124f2><div class="members-inner" data-v-d8c124f2><div class="members-grid" data-v-d8c124f2><!--[-->`);
      ssrRenderList(unref(equipe), (membre) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: membre.id,
          to: `/presentation/${membre.id}`,
          class: "member-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="member-photo-wrap" data-v-d8c124f2${_scopeId}>`);
              if (membre.image) {
                _push2(`<img${ssrRenderAttr("src", `/equipe-images/${membre.image}`)}${ssrRenderAttr("alt", membre.nom)} class="member-photo" data-v-d8c124f2${_scopeId}>`);
              } else {
                _push2(`<div class="member-photo bg-gray-200" data-v-d8c124f2${_scopeId}></div>`);
              }
              _push2(`</div><div class="member-info" data-v-d8c124f2${_scopeId}><h3 class="member-name" data-v-d8c124f2${_scopeId}>${ssrInterpolate(membre.nom)}</h3><p class="member-role" data-v-d8c124f2${_scopeId}>${ssrInterpolate(membre.role)}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "member-photo-wrap" }, [
                  membre.image ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: `/equipe-images/${membre.image}`,
                    alt: membre.nom,
                    class: "member-photo"
                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "member-photo bg-gray-200"
                  }))
                ]),
                createVNode("div", { class: "member-info" }, [
                  createVNode("h3", { class: "member-name" }, toDisplayString(membre.nom), 1),
                  createVNode("p", { class: "member-role" }, toDisplayString(membre.role), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section><section class="building-section" data-v-d8c124f2><div class="building-inner" data-v-d8c124f2><div class="building-text" data-v-d8c124f2><p data-v-d8c124f2> Membre du réseau UIMM et INTER-PRO nous apportons notre expertise et notre savoir-faire aux TPE, PME ou groupes avec le souci constant de qualité, satisfaction client, éthique et de professionnalisme. </p><p data-v-d8c124f2> Nous sommes situés au sein de la maison des entreprises 71 à Chalon-sur-Saône, et nous intervenons sur tout le périmètre de la Saône-et-Loire. </p></div><div class="building-img-wrap" data-v-d8c124f2><div class="circle-border" data-v-d8c124f2><img${ssrRenderAttr("src", _imports_2)} alt="Maison des Entreprises 71" class="building-img" data-v-d8c124f2></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/presentation/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d8c124f2"]]);

export { index as default };
//# sourceMappingURL=index-CIHirj4l.mjs.map
