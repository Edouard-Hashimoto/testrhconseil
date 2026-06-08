<script setup>
import { computed } from 'vue'

const route = useRoute()
const { data: particulier, error } = await useFetch(`/api/particuliers/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Particulier non trouvé', fatal: true })
}

useHead({
  title: `${particulier.value?.titre || 'Service Particulier'} - RH Conseil 71`,
  meta: [{ name: 'description', content: `Découvrez notre service ${particulier.value?.titre}` }]
})

// Fetch jobs dynamically for Offres d'emploi content
const { data: jobs } = await useFetch('/api/jobs')

const isBilanDeCompetences = computed(() => {
  if (!particulier.value) return false
  return String(particulier.value.id) === '5' || 
         particulier.value.titre.toLowerCase().includes('bilan de compétences') ||
         particulier.value.titre.toLowerCase().includes('bilan de competences')
})

const isOffresEmploi = computed(() => {
  if (!particulier.value) return false
  return String(particulier.value.id) === '3' || 
         particulier.value.titre.toLowerCase().includes("offres d'emploi") ||
         particulier.value.titre.toLowerCase().includes("offres d’emploi") ||
         particulier.value.titre.toLowerCase().includes("offres-emplois")
})
</script>

<template>
  <div class="service-detail-page">
    <div v-if="particulier" class="service-container" :style="{ '--theme-color': particulier.color || '#42B9B5' }">
      <nav class="breadcrumb">
        <NuxtLink to="/">Accueil</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink to="/particuliers">Particuliers</NuxtLink>
        <span class="sep">/</span>
        <span class="curr">{{ particulier.titre }}</span>
      </nav>

      <div class="service-card-hero" :style="{ background: particulier.color || 'linear-gradient(135deg, rgba(66, 185, 181, 0.9) 0%, rgba(31, 110, 108, 0.9) 100%)' }">
        <div class="hero-content">
          <div class="text-content">
            <h1 class="service-title">{{ particulier.titre }}</h1>
            <p class="service-subtitle">{{ particulier.description_courte }}</p>
          </div>
        </div>
      </div>

      <div class="service-main" :class="{ 'full-width': isOffresEmploi }">
        <div class="service-content">
          <template v-if="isOffresEmploi">
            <!-- Partner Section -->
            <div class="content-card">
              <div class="logo-side">
                <img src="~/assets/img/vignette_industrie_recrute.png" alt="L'industrie recrute" class="partner-logo" />
              </div>
              <div class="text-side">
                <h2 class="content-heading">L'industrie recrute !</h2>
                <p class="content-text">
                  Vous recherchez un emploi dans l'industrie ?<br>
                  Consultez les offres sur le 1er hub de l'emploi et des métiers de l'industrie :<br>
                  <a href="https://www.lindustrie-recrute.fr/" target="_blank" rel="noopener" class="external-link">
                    https://www.lindustrie-recrute.fr/
                  </a>
                </p>
              </div>
            </div>

            <!-- Jobs Grid -->
            <div v-if="jobs && jobs.length > 0" class="jobs-grid">
              <div v-for="job in jobs" :key="job.id" class="job-card">
                <div class="job-card-content">
                  <div v-if="job.logo" class="job-logo-wrapper">
                    <img :src="useAssetUrl(job.logo, 'logo')" alt="Logo entreprise" class="job-logo" />
                  </div>
                  <h3 class="job-card-title">{{ job.title }}</h3>
                </div>
                <div class="job-card-footer">
                  <NuxtLink :to="`/offres-emplois/${job.id}`" class="job-card-link">
                    Voir l'offre
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Empty State if no jobs available -->
            <div v-else class="empty-jobs">
              <p>Aucune offre d'emploi n'est disponible pour le moment. N'hésitez pas à consulter le portail partenaire ci-dessous.</p>
            </div>
          </template>

          <template v-else>
            <h2 class="section-title">Présentation du service</h2>
            
            <div v-if="particulier.image" class="content-image-wrapper">
              <img :src="useAssetUrl(particulier.image, 'particulier')" class="content-image" alt="Image de présentation" />
            </div>

            <div class="description-text" v-if="particulier.description_complete">
              <p v-for="(para, idx) in particulier.description_complete.split('\n')" :key="idx">
                {{ para }}
              </p>
            </div>
            <div v-else class="no-description">
              <p>Détails à venir pour ce service...</p>
            </div>

            <div v-if="isBilanDeCompetences" class="download-section">
              <div class="download-card">
                <div class="download-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <div class="download-info">
                  <h4 class="download-card-title">Programme du Bilan de compétences</h4>
                  <p class="download-card-desc">Consultez et téléchargez notre programme complet pour découvrir en détail le déroulement de notre accompagnement.</p>
                </div>
                <a href="/bilan.pdf" download="Programme_Bilan_de_competences_RH_Conseil_71.pdf" class="btn-download">
                  <span>Télécharger</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="btn-download-icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
              </div>
            </div>
          </template>
        </div>

        <aside class="service-sidebar" v-if="!isOffresEmploi">
          <div class="contact-card">
            <h3>Besoin d'accompagnement ?</h3>
            <p>Notre équipe d'experts est à votre écoute pour vous accompagner dans vos démarches.</p>
            <NuxtLink to="/contact" class="btn-contact">Contactez-nous</NuxtLink>
          </div>
        </aside>
      </div>

    </div>
  </div>
</template>

<style scoped>
.service-detail-page {
  padding: 80px 1rem 6rem;
  background-color: var(--color-bg);
  min-height: 80vh;
}

.service-container {
  max-width: 1000px;
  margin: 0 auto;
}

.breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #64748b;
}

.breadcrumb a {
  color: #42B9B5;
  text-decoration: none;
}

.breadcrumb .sep {
  margin: 0 0.5rem;
  opacity: 0.5;
}

.service-card-hero {
  border-radius: 24px;
  padding: 4rem 3rem;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
  background: linear-gradient(135deg, rgba(66, 185, 181, 0.9) 0%, rgba(31, 110, 108, 0.9) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.text-content {
  flex: 1;
}

.service-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.service-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.service-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  opacity: 0.8;
  filter: brightness(0) invert(1);
}

.service-main {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 4rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.75rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 4px;
  background: var(--theme-color);
  border-radius: 2px;
}

.content-image-wrapper {
  margin-bottom: 2rem;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.content-image {
  width: 100%;
  height: auto;
  min-height: 200px;
  object-fit: cover;
  display: block;
}

.description-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #334155;
  text-align: left; /* Meilleur pour le mobile que 'justify' */
}

.description-text p {
  margin-bottom: 1.5rem;
}

.no-description {
  color: #94a3b8;
  font-style: italic;
}

.service-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-card {
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  text-align: center;
}

.contact-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.contact-card p {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.btn-contact {
  display: block;
  padding: 0.75rem;
  background: var(--theme-color);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  transition: all 0.2s;
}

.btn-contact:hover {
  filter: brightness(0.9);
  transform: translateY(-2px);
}

@media (max-width: 850px) {
  .service-main {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .service-sidebar {
    order: 2;
  }
}

@media (max-width: 600px) {
  .service-detail-page {
    padding: 60px 0.75rem 4rem;
  }

  .service-card-hero {
    padding: 2.5rem 1.25rem;
    border-radius: 16px;
    margin-bottom: 2rem;
  }
  
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .service-title {
    font-size: 1.8rem;
  }

  .service-subtitle {
    font-size: 1.1rem;
  }
  
  .service-logo {
    width: 60px;
    height: 60px;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .description-text {
    font-size: 1rem;
  }
}

@media (max-width: 400px) {
  .breadcrumb {
    font-size: 0.8rem;
    display: flex;
    flex-wrap: wrap;
  }
}

.download-section {
  margin-top: 3.5rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 2.5rem;
}

.download-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: #f8fafc;
  border: 1.5px dashed var(--theme-color);
  border-radius: 20px;
  padding: 1.75rem 2rem;
  transition: all 0.3s ease;
}

.download-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
}

.download-icon {
  width: 52px;
  height: 52px;
  background: #e2f5f4;
  background-color: color-mix(in srgb, var(--theme-color) 12%, transparent);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--theme-color);
  flex-shrink: 0;
}

.download-icon svg {
  width: 26px;
  height: 26px;
}

.download-info {
  flex: 1;
}

.download-card-title {
  font-size: 1.15rem;
  font-weight: 750;
  color: #0f172a;
  margin: 0 0 0.35rem 0;
}

.download-card-desc {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--theme-color);
  color: #fff;
  padding: 0.8rem 1.6rem;
  border-radius: 50px;
  font-weight: 750;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.25s ease;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(66, 185, 181, 0.2);
}

.btn-download:hover {
  filter: brightness(0.95);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(66, 185, 181, 0.3);
}

.btn-download-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 640px) {
  .download-card {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1.5rem;
    gap: 1.25rem;
  }
  
  .download-icon {
    margin: 0 auto;
  }
  
  .btn-download {
    width: 100%;
    justify-content: center;
  }
}

/* Styles additionnels pour les offres d'emploi */
.service-main.full-width {
  grid-template-columns: 1fr;
}

/* Jobs Grid */
.jobs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.job-card {
  background: var(--color-white, #fff);
  border-radius: var(--radius-md, 12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid #f1f5f9;
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.job-card-title {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.job-card-footer {
  margin-top: auto;
}

.job-card-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.25rem;
  background-color: #000000;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 50px;
  transition: background-color 0.2s ease, transform 0.15s ease;
  width: 100%;
  white-space: nowrap;
  box-sizing: border-box;
  text-decoration: none;
}

.job-card-link svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.job-card-link:hover {
  background-color: #333333;
  transform: translateY(-1px);
}

.empty-jobs {
  background: var(--color-white, #fff);
  padding: 3rem;
  border-radius: var(--radius-md, 12px);
  text-align: center;
  color: var(--color-text-light, #64748b);
  border: 1px dashed var(--color-border, #e2e8f0);
  margin-bottom: 4rem;
  font-size: 1.05rem;
}

/* Partner section styling */
.content-card {
  display: flex;
  align-items: center;
  gap: 3rem;
  background: #fff;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  margin-bottom: 4rem;
}

.logo-side {
  flex: 0 0 280px;
}

.partner-logo {
  width: 100%;
  height: auto;
  display: block;
}

.text-side {
  flex: 1;
}

.content-heading {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.content-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #475569;
}

.external-link {
  display: inline-block;
  color: #1a1a2e;
  text-decoration: underline;
  text-decoration-color: rgb(102, 45, 98);
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  font-weight: 600;
  margin-top: 1rem;
  transition: color 0.2s;
}

.external-link:hover {
  color: rgb(102, 45, 98);
}

.job-logo-wrapper {
  margin-bottom: 1.25rem;
  height: 180px;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}

.job-logo {
  max-height: 100%;
  width: 100%;
  object-fit: contain;
  object-position: left;
}

/* Responsive Grid and Cards */
@media (max-width: 1100px) {
  .jobs-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 850px) {
  .jobs-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-card {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem;
    gap: 1.5rem;
  }

  .logo-side {
    flex: none;
    width: 200px;
  }
}

@media (max-width: 550px) {
  .jobs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
