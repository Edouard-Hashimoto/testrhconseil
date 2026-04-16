<script setup>
const route = useRoute()
const { data: service, error } = await useFetch(`/api/services/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service non trouvé', fatal: true })
}

useHead({
  title: `${service.value?.title || 'Service'} - RH Conseil 71`,
  meta: [{ name: 'description', content: `Découvrez notre service ${service.value?.title}` }]
})

const openThemeId = ref(null)
const formatDate = (dateStr) => {
  if (!dateStr) return 'À venir'
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
  } catch (e) {
    return dateStr
  }
}

const toggleTheme = (id) => {
  openThemeId.value = openThemeId.value === id ? null : id
}

const openFormationId = ref(null)
const toggleFormation = (id) => {
  openFormationId.value = openFormationId.value === id ? null : id
}
</script>

<template>
  <div class="service-detail-page">
    <div v-if="service" class="service-container">
      <nav class="breadcrumb">
        <NuxtLink to="/">Accueil</NuxtLink>
        <span class="sep">/</span>
        <template v-if="service.categories && service.categories.length > 0">
          <span v-for="(cat, idx) in service.categories" :key="cat.id" style="display:inline-flex; align-items:center;">
            <NuxtLink :to="`/categories/${cat.id}`">{{ cat.titre }}</NuxtLink>
            <span class="sep" v-if="idx !== service.categories.length - 1">, </span>
          </span>
          <span class="sep">/</span>
        </template>
        <span class="curr">{{ service.title }}</span>
      </nav>

      <div class="service-card-hero" :style="{ background: service.color }">
        <div class="hero-content">
          <h1 class="service-title">{{ service.title }}</h1>
          <img v-if="service.logo" :src="service.logo.startsWith('http') ? service.logo : `/logos/${service.logo}`" class="service-logo" alt="" />
        </div>
      </div>

      <div class="service-main">
        <div class="service-content">
          <template v-if="!service.title.toLowerCase().includes('formation')">
            <h2 class="section-title">Présentation du service</h2>
            <div class="description-text" v-if="service.description">
              <p v-for="(para, idx) in service.description.split('\n')" :key="idx">
                {{ para }}
              </p>
            </div>
          </template>

          <!-- Accordion Themes -->
          <div v-if="service.themes && service.themes.length > 0" class="themes-accordion">
            <div 
              v-for="theme in service.themes" 
              :key="theme.id" 
              class="theme-card"
              :class="{ 'is-open': openThemeId === theme.id }"
            >
              <button class="theme-header" @click="toggleTheme(theme.id)">
                <span class="theme-title">{{ theme.title }}</span>
                <span class="theme-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </span>
              </button>
              <div class="theme-body">
                <div class="theme-body-inner">
                  <div class="objectives-label">Les objectifs</div>
                  <ul class="objectives-list">
                    <li v-for="(line, lidx) in theme.objectives.split('\n').filter(l => l.trim())" :key="lidx">
                      {{ line }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Custom Calendar Layout for Formations -->
          <div v-if="service.title.toLowerCase().includes('formation') && service.formations && service.formations.length > 0" class="formations-calendar">
            <h2 class="section-title mt-12">Calendrier des formations</h2>
            <div class="calendar-list">
              <div v-for="form in service.formations" :key="form.id" class="calendar-item">
                <div class="calendar-date-col">
                  <div class="date-badge">
                    <span class="date-text">{{ formatDate(form.date) }}</span>
                  </div>
                  <div class="date-line"></div>
                </div>
                <div class="calendar-content-card">
                  <div class="card-header-flex">
                    <h3 class="form-title">{{ form.title }}</h3>
                    <a v-if="form.pdf_url" :href="form.pdf_url" target="_blank" download class="btn-download" title="Télécharger le programme PDF">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                      <span>Programme PDF</span>
                    </a>
                  </div>
                  <div class="form-objectives-box">
                    <div class="objectives-label-small">Objectifs pédagogiques :</div>
                    <ul class="form-obj-list">
                      <li v-for="(line, lidx) in form.objectives.split('\n').filter(l => l.trim())" :key="lidx">
                        {{ line }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Standard Accordion Formations (fallback if not 'Formations' service) -->
          <div v-else-if="service.formations && service.formations.length > 0" class="formations-section">
            <h2 class="section-title mt-12">Nos formations</h2>
            <div class="themes-accordion">
              <div 
                v-for="form in service.formations" 
                :key="form.id" 
                class="theme-card formation-card"
                :class="{ 'is-open': openFormationId === form.id }"
              >
                <button class="theme-header" @click="toggleFormation(form.id)">
                  <span class="theme-title">{{ form.title }}</span>
                  <span class="theme-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </span>
                </button>
                <div class="theme-body">
                  <div class="theme-body-inner">
                    <div class="objectives-label" style="color: #42b9b5;">Objectifs pédagogiques</div>
                    <ul class="objectives-list">
                      <li v-for="(line, lidx) in form.objectives.split('\n').filter(l => l.trim())" :key="lidx" class="li-formation">
                        {{ line }}
                      </li>
                    </ul>
                    <a v-if="form.pdf_url" :href="form.pdf_url" target="_blank" download class="download-link-simple" style="margin-top: 1rem; display: inline-flex; align-items:center; gap: 0.5rem; color: #42b9b5; text-decoration: none; font-weight: 700;">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 18px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                       Télécharger le programme (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="!service.description" class="no-description">
            <p>Détails à venir pour ce service...</p>
          </div>
        </div>

        <aside class="service-sidebar">


          <div class="contact-card">
            <h3>Besoin d'accompagnement ?</h3>
            <p>Notre équipe d'experts est à votre écoute pour répondre à vos besoins spécifiques.</p>
            <NuxtLink to="/contact" class="btn-contact" :style="{ background: service.color }">Contactez-nous</NuxtLink>
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
  color: #e91e8c;
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
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.service-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
}

.service-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  opacity: 0.3;
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
  background-color: #e91e8c;
  border-radius: 2px;
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

.sidebar-categories {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
}

.sidebar-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 0.05em;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-tag {
  background: white;
  border: 1px solid #e2e8f0;
  color: #F7A600;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.category-tag:hover {
  background: #F7A600;
  color: white;
  border-color: #F7A600;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(233, 30, 140, 0.2);
}

.contact-card {
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  text-align: center;
}

.contact-card h3 {
  font-size: 1.1rem;
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
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  transition: background 0.2s, transform 0.2s;
}

.btn-contact:hover {
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
  
  .service-logo {
    width: 60px;
    height: 60px;
  }
}

/* Accordion Styles */
.themes-accordion {
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.theme-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-card.is-open {
  border-color: #cbd5e1;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.theme-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;
}

.theme-header:hover {
  background: #f8fafc;
}

.theme-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.4;
  padding-right: 1rem;
}

.theme-icon {
  width: 32px;
  height: 32px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: transform 0.3s;
  flex-shrink: 0;
}

.theme-icon svg {
  width: 16px;
  height: 16px;
}

.theme-card.is-open .theme-icon {
  transform: rotate(180deg);
  background: #1a1a2e;
  color: #fff;
}

.theme-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-card.is-open .theme-body {
  max-height: 1000px; /* High enough to contain content */
}

.theme-body-inner {
  padding: 0 1.5rem 1.5rem;
}

.objectives-label {
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #e91e8c;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.objectives-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.objectives-list li {
  font-size: 1rem;
  line-height: 1.5;
  color: #475569;
  position: relative;
  padding-left: 1.5rem;
}

.objectives-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #e91e8c;
  font-weight: bold;
}

.mt-12 { margin-top: 3rem; }
.formations-section { margin-top: 3.5rem; }

.formation-card.is-open {
  border-color: #42b9b5;
}

.formation-card.is-open .theme-icon {
  background: #42b9b5;
}

.li-formation::before {
  color: #42b9b5 !important;
}

/* Calendar Styles */
.formations-calendar {
  margin-top: 4rem;
}

.calendar-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 2rem;
}

.calendar-item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 1.5rem;
}

.calendar-date-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 1rem;
}

.date-badge {
  background: #42b9b5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.85rem;
  box-shadow: 0 4px 12px rgba(66, 185, 181, 0.2);
  z-index: 2;
  text-align: center;
  width: 100%;
  line-height: 1.3;
}

.date-line {
  width: 2px;
  flex: 1;
  background: #e2e8f0;
  margin: 0.5rem 0;
}

.calendar-item:last-child .date-line {
  display: none;
}

.calendar-content-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 1.75rem;
  margin-bottom: 2.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.calendar-content-card:hover {
  transform: translateX(8px);
  border-color: #42b9b5;
  box-shadow: 0 8px 30px rgba(0,0,0,0.05);
}

.card-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
}

.form-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.3;
}

.btn-download {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 1.1rem;
  border-radius: 12px;
  color: #475569;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-download:hover {
  background: #1a1a2e;
  border-color: #1a1a2e;
  color: white;
  transform: translateY(-2px);
}

.btn-download svg {
  width: 18px;
  height: 18px;
}

.form-objectives-box {
  background: #f0f9f9;
  padding: 1.25rem;
  border-radius: 14px;
  border-left: 4px solid #42b9b5;
}

.objectives-label-small {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #42b9b5;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.form-obj-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.5rem 1.5rem;
}

.form-obj-list li {
  font-size: 0.95rem;
  color: #334155;
  padding-left: 1.2rem;
  position: relative;
  line-height: 1.4;
}

.form-obj-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #42b9b5;
  font-weight: bold;
}

@media (max-width: 600px) {
  .calendar-item {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .calendar-date-col {
    align-items: flex-start;
  }
  
  .date-line {
    display: none;
  }
  
  .card-header-flex {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .form-obj-list {
    grid-template-columns: 1fr;
  }
}
</style>
