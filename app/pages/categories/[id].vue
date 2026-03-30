<script setup>
const route = useRoute()
const { data: category, error } = await useFetch(`/api/categories/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Catégorie non trouvée', fatal: true })
}

useHead({
  title: `${category.value?.titre || 'Catégorie'} - RH Conseil 71`,
  meta: [{ name: 'description', content: category.value?.description || '' }]
})
</script>

<template>
  <div class="category-detail-page">
    <div v-if="category" class="category-container">
      <nav class="breadcrumb">
        <NuxtLink to="/">Accueil</NuxtLink>
        <span class="sep">/</span>
        <span class="curr">{{ category.titre }}</span>
      </nav>

      <div class="category-hero">
        <div class="hero-overlay"></div>
        <img v-if="category.image" :src="`/categories/${category.image}`" class="hero-bg-image" alt="" />
        <div class="hero-content">
          <h1 class="category-title">{{ category.titre }}</h1>
          <p class="category-description" v-if="category.description">{{ category.description }}</p>
        </div>
      </div>

      <div v-if="category.subcategories && category.subcategories.length > 0" class="subcategories-section">
        <h2 class="section-title">Sous-catégories</h2>
        <div class="subcategories-grid">
          <NuxtLink v-for="sub in category.subcategories" :key="sub.id" :to="`/categories/${sub.id}`" class="sub-cat-card">
            <div class="sub-cat-img" v-if="sub.image">
              <img :src="`/categories/${sub.image}`" alt="" />
            </div>
            <div class="sub-cat-info">
              <h3>{{ sub.titre }}</h3>
              <p v-if="sub.description">{{ sub.description.substring(0, 100) }}...</p>
            </div>
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.category-detail-page {
  padding: 80px 1rem 6rem;
  background-color: var(--color-bg);
  min-height: 80vh;
}

.category-container {
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

.category-hero {
  position: relative;
  border-radius: 24px;
  padding: 4rem 3rem;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-bottom: 4rem;
  min-height: 300px;
  display: flex;
  align-items: center;
  background-color: #1a1a2e;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(26,26,46,0.6) 100%);
  z-index: 1;
}

.hero-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
}

.category-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin: 0 0 1.5rem;
  line-height:1.2;
}

.category-description {
  font-size: 1.15rem;
  line-height: 1.6;
  opacity: 0.9;
  margin: 0;
  white-space: pre-wrap;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 2.5rem;
  position: relative;
  padding-bottom: 0.75rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: #e91e8c;
  border-radius: 2px;
}

.subcategories-section {
  margin-top: 4rem;
}

.subcategories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.sub-cat-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
}

.sub-cat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  border-color: #F7A600;
}

.sub-cat-img {
  height: 160px;
  width: 100%;
}

.sub-cat-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sub-cat-info {
  padding: 1.5rem;
}

.sub-cat-info h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 0.5rem;
}

.sub-cat-info p {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 600px) {
  .category-hero {
    padding: 3rem 1.5rem;
    min-height: 250px;
  }
}
</style>
