<script setup>
const { data: news } = await useFetch('/api/news')
const { data: services } = await useFetch('/api/services')
const { data: statistics } = await useFetch('/api/statistics')

const mainStat = computed(() => statistics.value && statistics.value.length > 0 ? statistics.value[0] : null)
const latestNews = computed(() => news.value && news.value.length > 0 ? news.value[0] : null)

const servicesWithVideo = computed(() => {
  const baseServices = services.value || []
  const list = [...baseServices]
  if (baseServices.length > 0) {
    const insertIndex = Math.min(4, list.length)
    list.splice(insertIndex, 0, { isVideo: true, id: 'youtube-video' })
  }
  return list
})

const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

const presImgRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  if (presImgRef.value) observer.observe(presImgRef.value)
})
</script>

<template>
  <div>
    <section class="hero-section">
      <div class="hero-inner">
        <div class="hero-text">
          <h1 class="hero-title">
            Une <span class="hero-accent">diversité</span> de&nbsp;compétences pour agir
          </h1>
        </div>
        <div class="hero-img">
          <img src="~/assets/img/Bloc_Accueil.webp" alt="RH Conseil 71 — Diversité de compétences" />
        </div>
      </div>
    </section>
    <section class="dashboard-section">
      <div class="dashboard-inner">

        <div class="left-col">
          <NuxtLink to="/statistiques" class="stat-card stat-link">
            <img v-if="mainStat?.image" :src="useAssetUrl(mainStat.image, 'statistics')" class="stat-card-bg" alt="Stats background" />
            <div class="stat-card-body">
              <span class="stat-card-label">Statistiques</span>
              <h2 class="stat-card-title">{{ mainStat?.title || 'Statistiques 2024-2025' }}</h2>
              <p class="stat-card-action">Voir les statistiques →</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/articles" class="stat-card actu stat-link">
            <img v-if="latestNews?.image" :src="useAssetUrl(latestNews.image, 'news')" class="stat-card-bg stat-bg-actu" alt="Actualités" />
            <div class="stat-card-body">
              <span class="stat-card-label">Agenda</span>
              <h2 class="stat-card-title">{{ latestNews?.title || 'Actualités du moment !' }}</h2>
              <p class="stat-card-action actu-action">Voir les actualités →</p>
            </div>
          </NuxtLink>
        </div>

        <div class="right-col">
          <div class="services-grid">
            <template v-for="item in servicesWithVideo" :key="item.id">
              <div v-if="item.isVideo" class="service-card video-card">
                <iframe
                  src="https://www.youtube.com/embed/buDVHjbVhWk"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
              <NuxtLink
                v-else
                :to="`/services/${item.id}`"
                class="service-card"
                :style="{ backgroundColor: item.color }"
              >
                <span class="service-title">{{ item.title }}</span>
                <img
                  v-if="item.logo"
                  :src="useAssetUrl(item.logo, 'logo')"
                  :alt="item.title"
                  class="service-logo"
                />
              </NuxtLink>
            </template>
            <div v-if="!services || services.length === 0" class="service-empty">
              Aucun service configuré.<br />
              <NuxtLink to="/admin/services" class="text-white underline text-sm">Configurer →</NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </section>
    <section class="presentation-section">
      <div class="pres-inner">
        <div class="pres-text">
          <h2 class="pres-title">PRÉSENTATION DE <strong>RH CONSEIL 71</strong></h2>
          <p class="pres-para">Cabinet à taille humaine, RH CONSEIL 71 a été créé en 2004. Nous accompagnons les entreprises dans la recherche de performances et le développement des compétences dans les domaines RH, RECRUTEMENT et QHSE.</p>
          <p class="pres-para">Longtemps certifié ISO 9001 et toujours en démarche d’amélioration continue, RH Conseil 71 considère que la qualité fait partie intégrante de sa culture, au bénéfice de ses clients.</p>
          <NuxtLink to="/presentation" class="pres-btn">En savoir plus</NuxtLink>
        </div>

        <div ref="presImgRef" class="pres-img-wrap">
          <img src="~/assets/img/presentation_equipe.webp" alt="Équipe RH Conseil 71" class="pres-img" />
        </div>
      </div>
    </section>

    <section class="missions-section">
      <div class="missions-inner">
        <h2 class="missions-title">
          Nos missions sont assurées par une équipe opérationnelle pluridisciplinaire et complémentaire&nbsp;:
        </h2>
        <div class="missions-grid">
          <div class="mission-card card-lime">
            <div class="mission-icon-wrap">
              <img src="~/assets/picto/Sante.png" alt="Psychologues du travail" />
            </div>
            <p class="mission-label">Psychologues<br>du travail</p>
          </div>
          <div class="mission-card card-pink">
            <div class="mission-icon-wrap">
              <img src="~/assets/picto/Accompagnement_RH_.png" alt="Consultants RH" />
            </div>
            <p class="mission-label">Consultants RH</p>
          </div>
          <div class="mission-card card-orange">
            <div class="mission-icon-wrap">
              <img src="~/assets/picto/QSE.png" alt="Consultant QHSE" />
            </div>
            <p class="mission-label">Consultant QHSE</p>
          </div>
          <div class="mission-card card-teal">
            <div class="mission-icon-wrap">
              <img src="~/assets/picto/Juridique.png" alt="Juristes en droit social" />
            </div>
            <p class="mission-label">Juristes en droit social</p>
          </div>
        </div>
      </div>
    </section>

    <section class="qualiopi-section">
      <div class="qualiopi-bg-icon">
        <img src="~/assets/picto/award.png" alt="" />
      </div>
      <div class="qualiopi-inner">
        <div class="qualiopi-content">
          <h2 class="qualiopi-title">Certifié QUALIOPI au titre des catégories d’actions suivantes&nbsp;:</h2>
          <ul class="qualiopi-list">
            <li>ACTIONS DE FORMATION</li>
            <li>BILANS DE COMPETENCES</li>
          </ul>
          <div class="qualiopi-actions">
            <a href="/certificat.pdf" download class="btn-certif btn-download">
              <svg class="icon-dl" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-11v4h3l-4 4-4-4h3V9h2z"/>
              </svg>
              Télécharger
            </a>
            <NuxtLink to="/qualiopi" class="btn-certif btn-more">En savoir plus</NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.hero-section {
  background-color: #efefef;
  width: 100%;
}

.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0;
  min-height: 300px;
  overflow: hidden;
}

.hero-text {
  flex: 0 0 36%;
  padding: 3.5rem 2.5rem 3.5rem 3rem;
}

.hero-title {
  font-size: clamp(1.6rem, 3vw, 2.6rem);
  font-weight: 700;
  line-height: 1.25;
  color: #1a1a2e;
}

.hero-accent {
  color: #BA0F60;
}


.hero-img {
  flex: 0 0 64%;
  align-self: stretch;
  overflow: hidden;
  padding: 2rem;
}

.hero-img img {
  width: 100%;
  height: 100%;
  min-height: 300px;
  object-fit: cover;
  object-position: left center;
}


.presentation-section {
  background-color: #efefef;
  padding: 4rem 1rem 6rem;
}

.pres-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.pres-text {
  flex: 1;
}

.pres-title {
  font-size: clamp(1.4rem, 2.5vw, 2.2rem);
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.pres-title strong {
  color: #BA0F60;
  font-weight: 700;
}

.pres-para {
  font-size: 1rem;
  color: #444;
  line-height: 1.7;
  margin-bottom: 1.2rem;
}

.pres-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.8rem;
  background-color: #BA0F60;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  border-radius: 50px;
  transition: transform 0.2s, background 0.2s;
}

.pres-btn:hover {
  background-color: #c01874;
  transform: translateY(-2px);
}

.pres-img-wrap {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  opacity: 0;
  transform: translateX(48px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.pres-img-wrap.visible {
  opacity: 1;
  transform: translateX(0);
}

.pres-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

@media (max-width: 800px) {
  .pres-inner {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }
  .pres-img-wrap {
    transform: translateY(30px);
  }
  .pres-img-wrap.visible {
    transform: translateY(0);
  }
}

.news-section {
  padding: 6rem 1rem;
  background-color: #fcfcfc;
}

.news-container {
  max-width: 1200px;
  margin: 0 auto;
}

.news-header {
  text-align: center;
  margin-bottom: 4rem;
}

.news-section-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.news-section-title strong {
  color: #e91e8c;
  font-weight: 700;
}

.news-title-line {
  width: 60px;
  height: 4px;
  background-color: #e91e8c;
  margin: 0 auto;
  border-radius: 2px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.news-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.news-card-img {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.news-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.news-card:hover .news-card-img img {
  transform: scale(1.08);
}

.news-card-date {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: white;
  padding: 0.5rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #e91e8c;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
  line-height: 1.2;
}

.news-card-body {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.news-card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.news-card-excerpt {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.news-card-link {
  color: #e91e8c;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: gap 0.2s;
}

.news-card-link::after {
  content: '→';
  transition: transform 0.2s;
}

.news-card-link:hover::after {
  transform: translateX(4px);
}

.news-empty {
  text-align: center;
  padding: 4rem 1rem;
  color: #94a3b8;
  font-size: 1.1rem;
}

.placeholder-img {
  filter: grayscale(1) opacity(0.5);
}

.container {
  max-width: 1200px;
}

@media (max-width: 768px) {
  .hero-inner {
    flex-direction: column;
    min-height: auto;
  }

  .hero-text {
    flex: none;
    width: 100%;
    padding: 2rem 1.5rem 1rem;
  }

  .hero-img {
    flex: none;
    width: 100%;
  }

  .hero-img img {
    min-height: auto;
    object-fit: contain;
  }
}

.dashboard-section {
  background: #efefef;
  padding: 2rem 0 3rem;
}

.dashboard-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
}

.left-col {
  flex: 0 0 38%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.stat-card {
  flex: 1;
  border-radius: 16px;
  overflow: hidden;
  background: #4a1942;
  position: relative;
  min-height: 160px;
  display: flex;
  align-items: flex-end;
}

.stat-card.actu {
  background: #2d4a3e;
}

.stat-card-body {
  padding: 1.5rem;
  z-index: 1;
  position: relative;
}

.stat-card-label {
  display: block;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.6);
  margin-bottom: 0.4rem;
}

.stat-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.stat-link {
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.stat-card-action {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e91e8c;
  margin-top: 0.5rem;
  background: #fff;
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}

.actu-action {
  color: #2d4a3e;
}

.stat-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  z-index: 0;
  transition: opacity 0.3s, transform 0.5s;
}

.stat-link:hover .stat-card-bg {
  opacity: 0.4;
  transform: scale(1.05);
}

.right-col {
  flex: 1;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.service-card {
  border-radius: 14px;
  min-height: 130px;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.service-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
  position: relative;
  z-index: 1;
}

.service-logo {
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 90px;
  height: 90px;
  object-fit: contain;
  opacity: 0.22;
  transform: rotate(-5deg);
}

.service-empty {
  grid-column: 1 / -1;
  background: rgba(0,0,0,0.1);
  border-radius: 14px;
  padding: 2rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}

.video-card {
  background-color: #fff !important;
  padding: 0 !important;
  overflow: hidden;
}

.video-card iframe {
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 900px) {
  .dashboard-inner {
    flex-direction: column;
  }

  .left-col {
    flex-direction: row;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-inner {
    flex-direction: column;
    min-height: auto;
  }

  .hero-text {
    flex: none;
    width: 100%;
    padding: 2rem 1.5rem 1rem;
  }

  .hero-img {
    flex: none;
    width: 100%;
  }

  .hero-img img {
    min-height: auto;
    object-fit: contain;
  }

  .dashboard-inner {
    padding: 0 1rem;
    gap: 1rem;
  }

  .left-col {
    flex-direction: row;
    gap: 1rem;
  }

  .stat-card {
    min-height: 140px;
  }

  .stat-card-body {
    padding: 1rem;
  }

  .stat-card-title {
    font-size: 1rem;
  }

  .stat-card-label {
    font-size: 0.6rem;
  }

  .stat-card-action {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }

  .service-card {
    padding: 1rem;
    min-height: 110px;
  }

  .service-title {
    font-size: 0.8rem;
  }
}

.missions-section {
  padding: 5rem 1.5rem 8rem;
  background-color: #efefef;
}

.missions-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.missions-title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
  color: #1a1a2e;
  margin-bottom: 4rem;
  line-height: 1.5;
}

.missions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2.5rem;
}

.mission-card {
  background: #fff;
  border-radius: 24px;
  padding: 3.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mission-card:hover {
  transform: translateY(-8px);
}

.card-lime { box-shadow: 10px 10px 0px 0px #C8D465; }
.card-pink { box-shadow: 10px 10px 0px 0px #BA0F60; }
.card-orange { box-shadow: 10px 10px 0px 0px #F7A600; }
.card-teal { box-shadow: 10px 10px 0px 0px #42B9B5; }

.mission-icon-wrap {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.mission-icon-wrap img {
  max-height: 100%;
  width: auto;
}

.mission-label {
  font-size: 1.05rem;
  font-weight: 500;
  color: #1a1a2e;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .missions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .missions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    padding: 0 0.5rem;
  }

  .mission-card {
    padding: 1.5rem 1rem;
    border-radius: 16px;
  }

  .mission-icon-wrap {
    height: 60px;
    margin-bottom: 1rem;
  }

  .mission-label {
    font-size: 0.85rem;
  }
}

.qualiopi-section {
  position: relative;
  background-color: var(--color-bg);
  padding: 6rem 1.5rem;
  overflow: hidden;
}

.qualiopi-bg-icon {
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  width: 450px;
  opacity: 0.25;
  pointer-events: none;
}

.qualiopi-bg-icon img {
  width: 100%;
  height: auto;
  filter: grayscale(1) brightness(2);
}

.qualiopi-inner {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.qualiopi-content {
  text-align: left;
}

.qualiopi-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 2rem;
}

.qualiopi-list {
  list-style: none;
  padding: 0;
  margin: 0 0 3rem 0;
}

.qualiopi-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
}

.qualiopi-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #333;
}

.qualiopi-actions {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.btn-certif {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem 2.2rem;
  border-radius: 50px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
}

.btn-certif:hover {
  background-color: #000;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.icon-dl {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .qualiopi-section {
    padding: 4rem 1.5rem;
  }
  .qualiopi-bg-icon {
    width: 300px;
    left: 50%;
  }
  .qualiopi-content {
    text-align: center;
  }
  .qualiopi-list li {
    padding-left: 0;
  }
  .qualiopi-list li::before {
    display: none;
  }
  .qualiopi-actions {
    justify-content: center;
  }
}
</style>