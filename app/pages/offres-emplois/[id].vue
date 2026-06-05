<script setup>
const route = useRoute()
const { data: job } = await useFetch('/api/jobs', { query: { id: route.params.id } })

useHead({
  title: () => job.value?.title ? `${job.value.title} - Offre d'emploi - RH Conseil 71` : 'Offre d\'emploi - RH Conseil 71'
})
</script>

<template>
  <div class="job-page">
    <div v-if="!job" class="not-found">
      <p>Offre d'emploi introuvable.</p>
      <NuxtLink to="/offres-emplois">Retour aux offres</NuxtLink>
    </div>

    <article v-else class="job-container">
      <header class="job-header">
        <NuxtLink to="/offres-emplois" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="back-arrow"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          Retour aux offres
        </NuxtLink>
        
        <div v-if="job.logo" class="job-logo-wrap">
          <img :src="useAssetUrl(job.logo, 'logo')" :alt="job.title" class="job-logo" />
        </div>

        <h1 class="job-title">{{ job.title }}</h1>
        <div class="job-meta">
          <span class="job-date" v-if="job.created_at">
            Publiée le {{ new Date(job.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          </span>
        </div>
      </header>

      <div class="job-body-card">
        <div class="job-body-title">Description du poste</div>
        <div class="job-body" v-html="job.description"></div>
        
        <div class="btn-apply-container">
          <a :href="job.link" target="_blank" rel="noopener" class="btn-apply">
            Contacter
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
          </a>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.job-page {
  padding-top: 100px;
  padding-bottom: 80px;
  min-height: 100vh;
  background: #f8fafc;
}

.job-container {
  max-width: 820px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.job-header {
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: rgb(102, 45, 98);
  text-decoration: none;
  font-weight: 700;
  margin-bottom: 2rem;
  transition: opacity 0.2s, transform 0.15s;
}

.back-link:hover {
  opacity: 0.8;
  transform: translateX(-2px);
}

.back-arrow {
  width: 16px;
  height: 16px;
}

.job-logo-wrap {
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  width: 200px;
  height: 200px;
  box-sizing: border-box;
}

.job-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.job-title {
  font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  font-weight: 800;
  color: #1a1a2e;
  line-height: 1.25;
  margin: 0 0 0.75rem;
}

.job-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.job-date {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

.job-body-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.job-body-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: rgb(102, 45, 98);
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 0.75rem;
}

.job-body {
  font-size: 1rem;
  color: #334155;
  line-height: 1.8;
}

.job-body :deep(h2) { font-size: 1.4rem; font-weight: 700; margin: 2rem 0 0.75rem; color: #1a1a2e; }
.job-body :deep(h3) { font-size: 1.15rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: #1a1a2e; }
.job-body :deep(p) { margin: 0 0 1.1rem; }
.job-body :deep(a) { color: #e91e8c; text-decoration: underline; font-weight: 600; }
.job-body :deep(ul) { padding-left: 1.5rem; margin-bottom: 1.25rem; list-style-type: disc; }
.job-body :deep(ol) { padding-left: 1.5rem; margin-bottom: 1.25rem; list-style-type: decimal; }
.job-body :deep(li) { margin-bottom: 0.4rem; }
.job-body :deep(strong) { font-weight: 700; color: #1a1a2e; }
.job-body :deep(img) { max-width: 100%; border-radius: 10px; margin: 1rem 0; }

.btn-apply-container {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.btn-apply {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1.75rem;
  background-color: #e91e8c;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 50px;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(233, 30, 140, 0.3);
}

.btn-apply:hover {
  background-color: #9c1b5e;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(233, 30, 140, 0.4);
}

.not-found {
  text-align: center;
  padding: 5rem 1rem;
  font-size: 1rem;
  color: #888;
}

.not-found a {
  display: block;
  margin-top: 1rem;
  color: rgb(102, 45, 98);
  font-weight: 600;
  text-decoration: none;
}
</style>
