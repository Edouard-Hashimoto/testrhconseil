<script setup>
useHead({
  title: 'Offres d\'emplois - RH Conseil 71',
  meta: [{ name: 'description', content: 'Consultez les offres d\'emploi dans l\'industrie sur le 1er hub de l\'emploi.' }]
})

// Fetch jobs dynamically from our API
const { data: jobs } = await useFetch('/api/jobs')

const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}
</script>

<template>
  <div class="offres-page">
    <div class="container">
      <div class="title-wrapper">
        <h1 class="page-title">Offres d'emploi</h1>
        <div class="title-underline"></div>
      </div>
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
            <p class="job-card-description">{{ stripHtml(job.description) }}</p>
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

      <!-- Partner Logo Section -->

    </div>
  </div>
</template>

<style scoped>
.offres-page {
  padding: 80px 0 60px;
  background-color: var(--color-bg);
  min-height: 80vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.title-wrapper {
  margin-bottom: 4rem;
}

.page-title {
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.title-underline {
  width: 320px;
  height: 6px;
  background-color: rgb(102, 45, 98);
  border-radius: 3px;
}

/* Jobs Grid */
.jobs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.job-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
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

.job-card-description {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  background: var(--color-white);
  padding: 3rem;
  border-radius: var(--radius-md);
  text-align: center;
  color: var(--color-text-light);
  border: 1px dashed var(--color-border);
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
  }

  .logo-side {
    flex: none;
    width: 200px;
  }

  .title-wrapper {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title-underline {
    width: 200px;
  }
}

@media (max-width: 550px) {
  .jobs-grid {
    grid-template-columns: 1fr;
  }
}

.job-logo-wrapper {
  margin-bottom: 1.25rem;
  height: 75px;
  display: flex;
  align-items: center;
}

.job-logo {
  max-height: 100%;
  max-width: 150px;
  object-fit: contain;
}
</style>
