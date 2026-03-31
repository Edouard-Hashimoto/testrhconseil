import { _ as _export_sfc, u as useFetch, a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, computed, ref, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

const _imports_0 = "" + __buildAssetsURL("Bloc_Accueil.BIqtWfdd.webp");
const _imports_1 = "" + __buildAssetsURL("presentation_equipe.875eI-rm.webp");
const _imports_2 = "" + __buildAssetsURL("Sante.BZjoRHoG.png");
const _imports_3 = "" + __buildAssetsURL("Accompagnement_RH_.DBuVQsHi.png");
const _imports_4 = "" + __buildAssetsURL("QSE.BNpW-Vpr.png");
const _imports_5 = "" + __buildAssetsURL("Juridique.BDECElpa.png");
const _imports_6 = "" + __buildAssetsURL("award.K1Mhl9Ks.png");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: news } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/news",
      "$4LekgHGinb"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: services } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/services",
      "$GAw-if8oW6"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: statistics } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/statistics",
      "$iFksu0qhZO"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const mainStat = computed(() => statistics.value && statistics.value.length > 0 ? statistics.value[0] : null);
    const latestNews = computed(() => news.value && news.value.length > 0 ? news.value[0] : null);
    const servicesWithVideo = computed(() => {
      const baseServices = services.value || [];
      const list = [...baseServices];
      if (baseServices.length > 0) {
        const insertIndex = Math.min(4, list.length);
        list.splice(insertIndex, 0, { isVideo: true, id: "youtube-video" });
      }
      return list;
    });
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-9b72703a><section class="hero-section" data-v-9b72703a><div class="hero-inner" data-v-9b72703a><div class="hero-text" data-v-9b72703a><h1 class="hero-title" data-v-9b72703a> Une <span class="hero-accent" data-v-9b72703a>diversité</span> de compétences pour agir </h1></div><div class="hero-img" data-v-9b72703a><img${ssrRenderAttr("src", _imports_0)} alt="RH Conseil 71 — Diversité de compétences" data-v-9b72703a></div></div></section><section class="dashboard-section" data-v-9b72703a><div class="dashboard-inner" data-v-9b72703a><div class="left-col" data-v-9b72703a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/statistiques",
        class: "stat-card stat-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(mainStat)?.image) {
              _push2(`<img${ssrRenderAttr("src", `/uploads/stats/${unref(mainStat).image}`)} class="stat-card-bg" alt="Stats background" data-v-9b72703a${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="stat-card-body" data-v-9b72703a${_scopeId}><span class="stat-card-label" data-v-9b72703a${_scopeId}>Statistiques</span><h2 class="stat-card-title" data-v-9b72703a${_scopeId}>${ssrInterpolate(unref(mainStat)?.title || "Statistiques 2024-2025")}</h2><p class="stat-card-action" data-v-9b72703a${_scopeId}>Voir les statistiques →</p></div>`);
          } else {
            return [
              unref(mainStat)?.image ? (openBlock(), createBlock("img", {
                key: 0,
                src: `/uploads/stats/${unref(mainStat).image}`,
                class: "stat-card-bg",
                alt: "Stats background"
              }, null, 8, ["src"])) : createCommentVNode("", true),
              createVNode("div", { class: "stat-card-body" }, [
                createVNode("span", { class: "stat-card-label" }, "Statistiques"),
                createVNode("h2", { class: "stat-card-title" }, toDisplayString(unref(mainStat)?.title || "Statistiques 2024-2025"), 1),
                createVNode("p", { class: "stat-card-action" }, "Voir les statistiques →")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/articles",
        class: "stat-card actu stat-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(latestNews)?.image) {
              _push2(`<img${ssrRenderAttr("src", `/uploads/news/${unref(latestNews).image}`)} class="stat-card-bg stat-bg-actu" alt="Actualités" data-v-9b72703a${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="stat-card-body" data-v-9b72703a${_scopeId}><span class="stat-card-label" data-v-9b72703a${_scopeId}>Agenda</span><h2 class="stat-card-title" data-v-9b72703a${_scopeId}>${ssrInterpolate(unref(latestNews)?.title || "Actualités du moment !")}</h2><p class="stat-card-action actu-action" data-v-9b72703a${_scopeId}>Voir les actualités →</p></div>`);
          } else {
            return [
              unref(latestNews)?.image ? (openBlock(), createBlock("img", {
                key: 0,
                src: `/uploads/news/${unref(latestNews).image}`,
                class: "stat-card-bg stat-bg-actu",
                alt: "Actualités"
              }, null, 8, ["src"])) : createCommentVNode("", true),
              createVNode("div", { class: "stat-card-body" }, [
                createVNode("span", { class: "stat-card-label" }, "Agenda"),
                createVNode("h2", { class: "stat-card-title" }, toDisplayString(unref(latestNews)?.title || "Actualités du moment !"), 1),
                createVNode("p", { class: "stat-card-action actu-action" }, "Voir les actualités →")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="right-col" data-v-9b72703a><div class="services-grid" data-v-9b72703a><!--[-->`);
      ssrRenderList(unref(servicesWithVideo), (item) => {
        _push(`<!--[-->`);
        if (item.isVideo) {
          _push(`<div class="service-card video-card" data-v-9b72703a><iframe src="https://www.youtube.com/embed/buDVHjbVhWk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen data-v-9b72703a></iframe></div>`);
        } else {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/services/${item.id}`,
            class: "service-card",
            style: { backgroundColor: item.color }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="service-title" data-v-9b72703a${_scopeId}>${ssrInterpolate(item.title)}</span>`);
                if (item.logo) {
                  _push2(`<img${ssrRenderAttr("src", `/logos/${item.logo}`)}${ssrRenderAttr("alt", item.title)} class="service-logo" data-v-9b72703a${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  createVNode("span", { class: "service-title" }, toDisplayString(item.title), 1),
                  item.logo ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: `/logos/${item.logo}`,
                    alt: item.title,
                    class: "service-logo"
                  }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]-->`);
      if (!unref(services) || unref(services).length === 0) {
        _push(`<div class="service-empty" data-v-9b72703a> Aucun service configuré.<br data-v-9b72703a>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/services",
          class: "text-white underline text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Configurer →`);
            } else {
              return [
                createTextVNode("Configurer →")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></section><section class="presentation-section" data-v-9b72703a><div class="pres-inner" data-v-9b72703a><div class="pres-text" data-v-9b72703a><h2 class="pres-title" data-v-9b72703a>PRÉSENTATION DE <strong data-v-9b72703a>RH CONSEIL 71</strong></h2><p class="pres-para" data-v-9b72703a>Cabinet à taille humaine, RH CONSEIL 71 a été créé en 2004. Nous accompagnons les entreprises dans la recherche de performances et le développement des compétences dans les domaines RH, RECRUTEMENT et QHSE.</p><p class="pres-para" data-v-9b72703a>Longtemps certifié ISO 9001 et toujours en démarche d’amélioration continue, RH Conseil 71 considère que la qualité fait partie intégrante de sa culture, au bénéfice de ses clients.</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/presentation",
        class: "pres-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`En savoir plus`);
          } else {
            return [
              createTextVNode("En savoir plus")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="pres-img-wrap" data-v-9b72703a><img${ssrRenderAttr("src", _imports_1)} alt="Équipe RH Conseil 71" class="pres-img" data-v-9b72703a></div></div></section><section class="missions-section" data-v-9b72703a><div class="missions-inner" data-v-9b72703a><h2 class="missions-title" data-v-9b72703a> Nos missions sont assurées par une équipe opérationnelle pluridisciplinaire et complémentaire : </h2><div class="missions-grid" data-v-9b72703a><div class="mission-card card-lime" data-v-9b72703a><div class="mission-icon-wrap" data-v-9b72703a><img${ssrRenderAttr("src", _imports_2)} alt="Psychologues du travail" data-v-9b72703a></div><p class="mission-label" data-v-9b72703a>Psychologues<br data-v-9b72703a>du travail</p></div><div class="mission-card card-pink" data-v-9b72703a><div class="mission-icon-wrap" data-v-9b72703a><img${ssrRenderAttr("src", _imports_3)} alt="Consultants RH" data-v-9b72703a></div><p class="mission-label" data-v-9b72703a>Consultants RH</p></div><div class="mission-card card-orange" data-v-9b72703a><div class="mission-icon-wrap" data-v-9b72703a><img${ssrRenderAttr("src", _imports_4)} alt="Consultant QHSE" data-v-9b72703a></div><p class="mission-label" data-v-9b72703a>Consultant QHSE</p></div><div class="mission-card card-teal" data-v-9b72703a><div class="mission-icon-wrap" data-v-9b72703a><img${ssrRenderAttr("src", _imports_5)} alt="Juristes en droit social" data-v-9b72703a></div><p class="mission-label" data-v-9b72703a>Juristes en droit social</p></div></div></div></section><section class="qualiopi-section" data-v-9b72703a><div class="qualiopi-bg-icon" data-v-9b72703a><img${ssrRenderAttr("src", _imports_6)} alt="" data-v-9b72703a></div><div class="qualiopi-inner" data-v-9b72703a><div class="qualiopi-content" data-v-9b72703a><h2 class="qualiopi-title" data-v-9b72703a>Certifié QUALIOPI au titre des catégories d’actions suivantes :</h2><ul class="qualiopi-list" data-v-9b72703a><li data-v-9b72703a>ACTIONS DE FORMATION</li><li data-v-9b72703a>BILANS DE COMPETENCES</li></ul><div class="qualiopi-actions" data-v-9b72703a><a href="/certificat.pdf" download class="btn-certif btn-download" data-v-9b72703a><svg class="icon-dl" viewBox="0 0 24 24" fill="currentColor" data-v-9b72703a><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-11v4h3l-4 4-4-4h3V9h2z" data-v-9b72703a></path></svg> Télécharger </a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/qualiopi",
        class: "btn-certif btn-more"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`En savoir plus`);
          } else {
            return [
              createTextVNode("En savoir plus")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9b72703a"]]);

export { index as default };
//# sourceMappingURL=index-BT-wAa9A.mjs.map
