<script setup>
useHead({
  title: 'Certification Qualiopi - RH Conseil 71',
  meta: [{ name: 'description', content: 'RH Conseil 71 est certifié QUALIOPI pour ses actions de formation et bilans de compétences.' }]
})
</script>

<template>
  <div class="qualiopi-page">
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Notre Certification</h1>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <div class="certif-card">
          <div class="certif-img-wrap">
            <img src="~/assets/img/qualiopi.webp" alt="Certification Qualiopi" class="certif-img" />
          </div>
          <div class="certif-text">
            <h2 class="certif-title">RH CONSEIL 71 est certifié QUALIOPI !</h2>
            <p class="certif-para">
              Toute l’équipe du cabinet RH CONSEIL 71 est ravie de vous annoncer le renouvellement de sa certification
              QUALIOPI pour les activités suivantes : <strong>Actions de formation et bilans de compétences</strong>
            </p>
            <p class="certif-para">
              La certification est valable à compter du 30 juillet 2024 et pour une durée de 3 ans !
            </p>
            <div class="certif-actions">
               <a href="/certificat.pdf" download class="btn-download">
                <svg class="icon-dl" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-11v4h3l-4 4-4-4h3V9h2z"/>
                </svg>
                Télécharger le certificat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.qualiopi-page {
  background-color: #f8fafc;
  min-height: 100vh;
  padding-bottom: 5rem;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 180px;
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
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  margin: 0;
}

.content-section {
  padding: 3rem 1.5rem;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.certif-card {
  background: #fff;
  border-radius: 24px;
  padding: 3.5rem;
  display: flex;
  align-items: center;
  gap: 4rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
}

.certif-img-wrap {
  flex: 0 0 320px;
  background: #fdfdfd;
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 16px;
}

.certif-img {
  width: 100%;
  height: auto;
  display: block;
}

.certif-text {
  flex: 1;
}

.certif-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 2rem;
  line-height: 1.2;
}

.certif-para {
  font-size: 1.15rem;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.certif-para strong {
  color: #BA0F60;
}

.certif-actions {
  margin-top: 2.5rem;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background-color: #BA0F60;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  border-radius: 50px;
  transition: transform 0.2s, background 0.2s;
  box-shadow: 0 4px 15px rgba(186, 15, 96, 0.2);
}

.btn-download:hover {
  background-color: #c01874;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(186, 15, 96, 0.3);
}

.icon-dl {
  width: 22px;
  height: 22px;
}

@media (max-width: 900px) {
  .certif-card {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem;
    gap: 3rem;
  }
  
  .certif-img-wrap {
    flex: none;
    width: 260px;
  }
}
</style>
