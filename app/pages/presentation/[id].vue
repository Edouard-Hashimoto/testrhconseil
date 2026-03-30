<script setup>
const route = useRoute()
const { data: membre, error } = await useFetch(`/api/equipe/${route.params.id}`)

if (error.value || !membre.value) {
  throw createError({ statusCode: 404, statusMessage: 'Membre non trouvé', fatal: true })
}

useHead({
  title: `${membre.value.nom} - RH Conseil 71`,
  meta: [{ name: 'description', content: `Profil de ${membre.value.nom}, ${membre.value.role} chez RH Conseil 71.` }]
})
</script>

<template>
  <div class="member-detail-page">
    <div class="container">
      <NuxtLink to="/presentation" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        Retour à l'équipe
      </NuxtLink>

      <div class="member-layout">
        <div class="image-wrapper">
          <img v-if="membre.image" :src="`/equipe-images/${membre.image}`" :alt="membre.nom" class="member-photo" />
          <div v-else class="member-photo placeholder"></div>
        </div>
        <div class="info-wrapper">
          <h1 class="member-name">{{ membre.nom }}</h1>
          <p class="member-service">{{ membre.role }}</p>
          <div class="member-desc">{{ membre.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.member-detail-page {
  padding: 6rem 3rem;
  background-color: var(--color-bg, #fdfdfd);
  min-height: 80vh;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 3rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #e91e8c;
}

.back-link svg {
  width: 20px;
  height: 20px;
}

.member-layout {
  display: flex;
  gap: 4rem;
  align-items: flex-start;
}

.image-wrapper {
  flex: 0 0 400px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: #eee;
}

.member-photo {
  width: 100%;
  height: auto;
  aspect-ratio: 3/4;
  object-fit: cover;
  display: block;
}

.placeholder {
  background-color: #cbd5e1;
}

.info-wrapper {
  flex: 1;
  padding-top: 1.5rem;
}

.member-name {
  font-size: 2.8rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  line-height: 1.1;
}

.member-service {
  font-size: 1.3rem;
  font-weight: 600;
  color: #e91e8c;
  margin: 0 0 2rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.member-desc {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #475569;
  white-space: pre-wrap;
  text-align: justify;
}

@media (max-width: 900px) {
  .member-layout {
    flex-direction: column;
    gap: 2rem;
  }

  .image-wrapper {
    flex: none;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
