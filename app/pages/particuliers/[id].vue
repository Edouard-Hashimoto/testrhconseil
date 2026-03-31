<script setup>
const route = useRoute()
const { data: particulier, error } = await useFetch(`/api/particuliers/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Particulier non trouvé', fatal: true })
}

useHead({
  title: `${particulier.value?.titre || 'Service Particulier'} - RH Conseil 71`,
  meta: [{ name: 'description', content: `Découvrez notre service ${particulier.value?.titre}` }]
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

      <div class="service-main">
        <div class="service-content">
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
        </div>

        <aside class="service-sidebar">
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
  text-align: justify;
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
  .service-card-hero {
    padding: 3rem 1.5rem;
  }
  
  .hero-content {
    flex-direction: column-reverse;
    text-align: center;
  }
  
  .service-logo {
    width: 80px;
    height: 80px;
  }
}
</style>
