<script setup>
const { data: statistics } = await useFetch('/api/statistics')

useHead({
  title: 'Statistiques - RH Conseil 71',
  meta: [{ name: 'description', content: 'Découvrez les statistiques clés de RH Conseil 71.' }]
})
</script>

<template>
  <div class="stats-page">

    <section class="stats-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Nos Statistiques</h1>
      </div>
    </section>
    <section class="stats-section">
      <div class="stats-inner">

        <div v-if="!statistics || statistics.length === 0" class="empty-state">
          Aucune statistique disponible pour le moment.
        </div>

        <div v-else class="stats-grid">
          <div v-for="stat in statistics" :key="stat.id" class="stat-card">
            <div class="stat-img-wrap" v-if="stat.image">
              <img :src="useAssetUrl(stat.image, 'stats')" :alt="stat.title" class="stat-img" />
            </div>
            <div class="stat-content">
              <h2 class="stat-title">{{ stat.title }}</h2>
              <div class="stat-text" v-html="stat.text.replace(/\n/g, '<br/>')"></div>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.stats-page {
  padding-top: 0;
  background-color: var(--color-bg);
  min-height: 100vh;
}

.stats-hero {
  position: relative;
  width: 100%;
  height: 260px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #BA0F60;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(233, 30, 140, 0.2) 0%, rgba(74, 25, 66, 0.4) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: 0 3rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
  margin: 0;
}

.stats-section {
  padding: 5rem 0 8rem;
}

.stats-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.empty-state {
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  padding: 4rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
}

.stat-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

.stat-img-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem 0 1rem;
  box-sizing: border-box;
}

.stat-img {
  width: 80%;
  max-width: 400px;
  height: auto;
  max-height: 300px;
  display: block;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.stat-card:hover .stat-img {
  transform: scale(1.05);
}

.stat-content {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.stat-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #e91e8c;
  margin-bottom: 1.2rem;
  line-height: 1.3;
}

.stat-text {
  font-size: 1.05rem;
  color: #444;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-content {
    padding: 0 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .stat-content {
    padding: 2rem 1.5rem;
  }
}

</style>
