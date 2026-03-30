<script setup>
const { data: particuliers } = await useFetch('/api/particuliers')

useHead({
  title: 'Particuliers - RH Conseil 71',
  meta: [{ name: 'description', content: 'Nous accompagnons les particuliers dans leurs démarches personnelles de Bilan de compétences, accompagnement individuel type coaching professionnel, ou encore VAE.' }]
})
</script>

<template>
  <div class="particuliers-page">
    <div class="page-header">
      <h1 class="page-title">Particuliers</h1>
      <p class="page-desc">
        Nous accompagnons les particuliers dans leurs démarches personnelles de Bilan de compétences, accompagnement individuel type coaching professionnel, ou encore VAE.
      </p>
    </div>

    <section class="cards-section">
      <div v-if="!particuliers || particuliers.length === 0" class="empty-state">
        Aucune card à afficher pour le moment.
      </div>
      <div v-else class="cards-grid">
        <NuxtLink 
          v-for="part in particuliers" 
          :key="part.id" 
          :to="`/particuliers/${part.id}`" 
          class="service-card"
        >
          <div class="card-icon">
            <img v-if="part.picto" :src="`/uploads/${part.picto}`" :alt="part.titre" />
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ part.titre }}</h3>
            <p class="card-subtitle">{{ part.description_courte }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.particuliers-page {
  padding: 5rem 2rem;
  background-color: #f6f6f6;
  min-height: calc(100vh - 100px);
}

.page-header {
  max-width: 1000px;
  margin: 0 auto 3rem;
}

.page-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #111;
  margin-bottom: 2rem;
}

.page-desc {
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  max-width: 900px;
}

.cards-section {
  max-width: 1000px;
  margin: 0 auto;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.card-icon {
  flex: 0 0 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.service-card {
  text-decoration: none;
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.card-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 0.5rem 0;
}

.card-subtitle {
  font-size: 1rem;
  color: #555;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .service-card {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .card-icon {
    flex: 0 0 70px;
    height: 70px;
  }
}
</style>
