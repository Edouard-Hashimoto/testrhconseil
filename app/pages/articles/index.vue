<template>
  <div class="articles-page">
    <div class="container py-12">
      <header class="articles-header">
        <span class="category-tag">Actualités</span>
        <h1>Derniers articles</h1>
        <p class="subtitle">Retrouvez toutes les actualités et informations importantes de RH Conseil 71.</p>
        <div class="divider"></div>
      </header>

      <div v-if="news && news.length > 0" class="articles-grid">
        <NuxtLink v-for="item in news" :key="item.id" :to="`/articles/${item.id}`" class="article-card">
          
          <div class="image-wrapper">
            <template v-if="item.image">
              <img :src="`/uploads/news/${item.image}`" :alt="item.title" class="article-image" />
            </template>
            <div v-else class="image-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div class="date-badge" v-if="item.image">
              {{ new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) }}
            </div>
          </div>

          <div class="card-body">
            <div class="card-meta" v-if="!item.image">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time :datetime="item.date">{{ new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) }}</time>
            </div>
            
            <h2 class="card-title">{{ item.title }}</h2>
            
            <div class="card-content" v-html="articleSummary(item.content)"></div>
            
            <div class="card-footer">
              <span class="read-more">En savoir plus</span>
              <div class="arrow-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3>Aucune actualité pour le moment</h3>
        <p>Revenez bientôt pour découvrir nos derniers articles.</p>
        <NuxtLink to="/" class="btn-home">Retour à l'accueil</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: news } = await useFetch('/api/news')

const articleSummary = (content) => {
  if (!content) return ''
  const plainText = content.replace(/<[^>]*>/g, ' ')
  return plainText
}
</script>

<style scoped>
.articles-page {
  margin-top: 6rem;
  padding-bottom: 5rem;
  background-color: var(--color-bg);
  min-height: 100vh;
}

.articles-header {
  text-align: center;
  margin-bottom: 4rem;
}

.category-tag {
  display: inline-block;
  background-color: rgba(216, 27, 96, 0.1);
  color: var(--color-magenta);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.subtitle {
  color: var(--color-text-light);
  max-width: 600px;
  margin: 1rem auto;
  font-size: 1.1rem;
}

.divider {
  width: 50px;
  height: 4px;
  background-color: var(--color-magenta);
  margin: 2rem auto 0;
  border-radius: 50px;
  opacity: 0.3;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.article-card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--color-border);
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.image-wrapper {
  position: relative;
  height: 200px; 
  overflow: hidden;
  background-color: #f7fafc;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e0;
}

.date-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-magenta);
}

.card-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-light);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-content {
  color: var(--color-text-light);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #f7fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.read-more {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.article-card:hover .read-more {
  color: var(--color-magenta);
}

.arrow-icon {
  width: 32px;
  height: 32px;
  background-color: #f7fafc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e0;
  transition: all 0.3s ease;
}

.article-card:hover .arrow-icon {
  background-color: rgba(216, 27, 96, 0.1);
  color: var(--color-magenta);
  transform: translateX(3px);
}

.empty-state {
  max-width: 500px;
  margin: 4rem auto;
  text-align: center;
  padding: 3rem;
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.empty-icon {
  color: #cbd5e0;
  margin-bottom: 2rem;
}

.btn-home {
  display: inline-block;
  margin-top: 2rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 700;
}

.card-content :deep(svg), 
.card-content :deep(img) {
  display: none !important;
}
</style>
