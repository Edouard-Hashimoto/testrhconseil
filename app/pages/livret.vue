<script setup>
useSeoMeta({
  title: 'Livret RH Conseil 71 — Présentation',
  description: 'Découvrez notre livret de présentation : qui nous sommes, nos expertises et nos engagements qualité.',
})

const pdfUrl = '/livret-rhconseil.pdf'
</script>

<template>
  <div class="livret-page">
    <div class="livret-hero">
      <div class="livret-hero-inner">
        <div class="livret-hero-badge">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
          </svg>
          Document PDF
        </div>
        <h1 class="livret-hero-title">Livret des prestations et formations<br><strong>RH Conseil 71</strong></h1>
        <p class="livret-hero-sub">Découvrez notre cabinet, nos expertises et notre engagement qualité à travers ce livret.</p>
        <a :href="pdfUrl" download="Livret_RH_Conseil_71.pdf" class="btn-dl">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-14 9v2h14v-2H5z"/>
          </svg>
          Télécharger le livret
        </a>
      </div>
      <div class="livret-hero-deco" aria-hidden="true">
        <div class="deco-bar bar1"></div>
        <div class="deco-bar bar2"></div>
        <div class="deco-bar bar3"></div>
      </div>
    </div>

    <div class="livret-viewer-wrap">
      <div class="livret-viewer-inner">
        <div class="viewer-toolbar">
          <span class="viewer-label">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            Lecture en ligne
          </span>
          <a :href="pdfUrl" download="Livret_RH_Conseil_71.pdf" class="viewer-dl-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-14 9v2h14v-2H5z"/>
            </svg>
            Télécharger
          </a>
        </div>

        <div class="pdf-frame-wrap">
          <iframe
            :src="`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`"
            class="pdf-iframe"
            title="Livret de présentation RH Conseil 71"
            loading="lazy"
          ></iframe>
        </div>

        <div class="viewer-footer">
          <p class="viewer-hint">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            Si le document ne s'affiche pas correctement,
            <a :href="pdfUrl" download="Livret_RH_Conseil_71.pdf">téléchargez-le</a>
            ou ouvrez-le dans un nouvel onglet.
          </p>
          <a :href="pdfUrl" target="_blank" rel="noopener" class="viewer-open-btn">
            Ouvrir dans un nouvel onglet
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.livret-page {
  min-height: 100vh;
  background: #f5f5f5;
}

/* ===== HERO ===== */
.livret-hero {
  position: relative;
  background: #1a1a2e;
  padding: 5rem 1.5rem 4rem;
  overflow: hidden;
}

.livret-hero-inner {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}

.livret-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(186, 15, 96, 0.15);
  border: 1px solid rgba(186, 15, 96, 0.35);
  color: #e06fa0;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  margin-bottom: 1.5rem;
}

.livret-hero-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 1.2rem;
}

.livret-hero-title strong {
  color: #BA0F60;
}

.livret-hero-sub {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.btn-dl {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #BA0F60;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.9rem 2.2rem;
  border-radius: 50px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(186, 15, 96, 0.35);
}

.btn-dl:hover {
  background: #a00d54;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(186, 15, 96, 0.45);
}

/* Déco barres */
.livret-hero-deco {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.deco-bar {
  position: absolute;
  border-radius: 4px;
  opacity: 0.07;
}

.bar1 {
  width: 3px;
  height: 100%;
  background: #BA0F60;
  right: 20%;
  top: 0;
}

.bar2 {
  width: 3px;
  height: 70%;
  background: #42B9B5;
  right: 15%;
  bottom: 0;
}

.bar3 {
  width: 3px;
  height: 50%;
  background: #F7A600;
  right: 25%;
  top: 20%;
}

/* ===== VIEWER ===== */
.livret-viewer-wrap {
  padding: 3rem 1.5rem 5rem;
}

.livret-viewer-inner {
  max-width: 960px;
  margin: 0 auto;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

.viewer-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #f8f8f8;
  border-bottom: 1px solid #eee;
}

.viewer-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
}

.viewer-dl-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #1a1a2e;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.viewer-dl-btn:hover {
  background: #BA0F60;
  transform: translateY(-1px);
}

.pdf-frame-wrap {
  width: 100%;
  aspect-ratio: 3 / 4;
  background: #e8e8e8;
}

@media (min-width: 768px) {
  .pdf-frame-wrap {
    aspect-ratio: 4 / 3;
    min-height: 700px;
  }
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  min-height: 500px;
}

.viewer-footer {
  padding: 1rem 1.5rem;
  background: #f8f8f8;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.viewer-hint {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: #888;
  flex-wrap: wrap;
}

.viewer-hint a {
  color: #BA0F60;
  font-weight: 600;
  text-decoration: none;
}

.viewer-hint a:hover {
  text-decoration: underline;
}

.viewer-open-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #1a1a2e;
  text-decoration: none;
  border: 1px solid #ddd;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  transition: border-color 0.2s, color 0.2s;
}

.viewer-open-btn:hover {
  border-color: #BA0F60;
  color: #BA0F60;
}

@media (max-width: 600px) {
  .livret-hero {
    padding: 3.5rem 1.2rem 3rem;
  }

  .viewer-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .pdf-frame-wrap {
    min-height: 400px;
  }
}
</style>
