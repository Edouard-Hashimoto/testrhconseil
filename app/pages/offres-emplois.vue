<script setup>
useHead({
  title: 'Offres d\'emplois - RH Conseil 71',
  meta: [{ name: 'description', content: 'Consultez les offres d\'emploi dans l\'industrie sur le 1er hub de l\'emploi.' }]
})
</script>

<template>
  <div class="offres-page">
    <div class="container">
      <div class="title-wrapper">
        <h1 class="page-title">Offres d'emplois</h1>
        <div class="title-underline"></div>
      </div>

      <div class="content-card">
        <div class="logo-side">
          <img src="~/assets/img/lindustrie-recrute.png" alt="L'industrie recrute" class="partner-logo" />
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
  max-width: 1000px;
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
  background-color: #BA0F60;
  border-radius: 3px;
}

.content-card {
  display: flex;
  align-items: center;
  gap: 3rem;
  background: #fff;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
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
  text-decoration-color: #BA0F60;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  font-weight: 600;
  margin-top: 1rem;
  transition: color 0.2s;
}

.external-link:hover {
  color: #BA0F60;
}

@media (max-width: 850px) {
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
</style>
