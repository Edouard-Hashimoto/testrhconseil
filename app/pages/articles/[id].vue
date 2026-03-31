<script setup>
const route = useRoute()
const { data: article } = await useFetch('/api/news', { query: { id: route.params.id } })

useHead({
  title: () => article.value?.title ? `${article.value.title} - RH Conseil 71` : 'Article - RH Conseil 71'
})
</script>

<template>
  <div class="article-page">
    <div v-if="!article" class="not-found">
      <p>Article introuvable.</p>
      <NuxtLink to="/articles"> Retour aux actualités</NuxtLink>
    </div>

    <article v-else class="article-container">
      <header class="article-header">
        <NuxtLink to="/articles" class="back-link"> Actualités</NuxtLink>
        <h1 class="article-title">{{ article.title }}</h1>
        <time class="article-date">
          {{ new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }}
        </time>
      </header>

      <div v-if="article.image" class="article-img-wrap">
        <img :src="useAssetUrl(article.image, 'news')" :alt="article.title" class="article-img" />
      </div>

      <div class="article-body" v-html="article.content"></div>
    </article>
  </div>
</template>

<style scoped>
.article-page {
  padding-top: 90px;
  min-height: 100vh;
  background: #f8f8f8;
}

.article-container {
  max-width: 780px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;
}

.article-header {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  font-size: 0.85rem;
  color: #e91e8c;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1.25rem;
  transition: opacity 0.2s;
}

.back-link:hover { opacity: 0.75; }

.article-title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 800;
  color: #1a1a2e;
  line-height: 1.25;
  margin: 0 0 0.75rem;
}

.article-date {
  font-size: 0.85rem;
  color: #888;
  display: block;
}

.article-img-wrap {
  margin-bottom: 2rem;
  border-radius: 14px;
  overflow: hidden;
}

.article-img {
  max-width: 100%;
  max-height: 380px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.article-img-wrap {
  margin-bottom: 2rem;
  border-radius: 14px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #eee;
}

.article-body {
  font-size: 1rem;
  color: #333;
  line-height: 1.8;
}

.article-body :deep(h2) { font-size: 1.4rem; font-weight: 700; margin: 2rem 0 0.75rem; color: #1a1a2e; }
.article-body :deep(h3) { font-size: 1.15rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: #1a1a2e; }
.article-body :deep(p) { margin: 0 0 1.1rem; }
.article-body :deep(a) { color: #e91e8c; text-decoration: underline; }
.article-body :deep(ul), .article-body :deep(ol) { padding-left: 1.5rem; margin-bottom: 1rem; }
.article-body :deep(li) { margin-bottom: 0.3rem; }
.article-body :deep(strong) { font-weight: 700; color: #1a1a2e; }
.article-body :deep(img) { max-width: 100%; border-radius: 10px; margin: 1rem 0; }

.not-found {
  text-align: center;
  padding: 5rem 1rem;
  font-size: 1rem;
  color: #888;
}

.not-found a {
  display: block;
  margin-top: 1rem;
  color: #e91e8c;
  font-weight: 600;
  text-decoration: none;
}
</style>