<script setup>
const { data: settings } = await useFetch('/api/settings')

const onQualiopiError = (e) => {
  e.target.src = '/assets/img/qualiopi.webp'
}
</script>

<template>
  <footer class="site-footer">

    <div class="deco-top-right" aria-hidden="true">
      <img src="~/assets/img/cercle.webp" class="cr cr1" alt="" />
    </div>

    <div class="deco-bottom-left" aria-hidden="true">
      <img src="~/assets/img/cercle.webp" class="cl cl1" alt="" />
    </div>

    <div class="footer-main">

      <div class="footer-col footer-logo-col">
        <img src="~/assets/img/RHC_RVB.jpg" alt="RH Conseil 71" class="footer-logo" />
      </div>

      <div class="footer-col footer-contact-col">
        <div class="contact-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <span class="contact-title">Nous contacter :</span>
        </div>
        <ul class="contact-list">
          <li class="contact-address">
            75 Grande Rue Saint-Cosme<br />71100 Chalon-sur-Saônea
          </li>
          <li>
            <a href="tel:0385421865">• 03 85 42 18 65</a>
          </li>
          <li>
            <a href="mailto:accueil@rhconseil71.com">• accueil@rhconseil71.com</a>
          </li>
        </ul>
      </div>

      <div class="footer-col footer-uimm-col">
        <p class="member-label">Membre du réseau</p>
        <img src="~/assets/img/uimm.webp" alt="UIMM – La Fabrique de l'Avenir" class="uimm-logo" />
      </div>

      <div v-if="settings?.qualiopi_visible === '1'" class="footer-col footer-qualiopi-col">
        <NuxtLink to="/qualiopi" class="qualiopi-link">
          <img
            :src="settings?.qualiopi_logo || '/assets/img/qualiopi.webp'"
            alt="Qualiopi – Processus certifié"
            class="qualiopi-logo"
            @error="onQualiopiError"
          />
        </NuxtLink>
        <p v-if="settings?.qualiopi_text" class="qualiopi-caption" style="white-space: pre-line;">{{ settings.qualiopi_text }}</p>
      </div>

    </div>

    <div class="footer-bar">
      <span class="footer-copy">© {{ new Date().getFullYear() }} RHCONSEIL71</span>
      <div class="footer-links">
        <NuxtLink to="/contact">Contact</NuxtLink>
        <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
        <a
          href="https://www.linkedin.com/company/rh-conseil-71/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          class="linkedin-btn"
          title="LinkedIn"
          aria-label="LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>

  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
  overflow: hidden;
}

.deco-top-right,
.deco-bottom-left {
  position: absolute;
  pointer-events: none;
}

.deco-top-right {
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
}

.cr { position: absolute; object-fit: contain; }
.cr1 { top: 6px; right: 6px; width: 60px; height: 60px; filter: hue-rotate(0deg); }

.deco-bottom-left {
  bottom: 60px;
  left: 0;
  width: 90px;
  height: 80px;
}

.cl { position: absolute; object-fit: contain; }
.cl1 { bottom: 6px; left: 6px; width: 60px; height: 60px; filter: hue-rotate(0deg); transform: rotate(180deg); }

.footer-main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding: 2.5rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-logo-col { justify-content: center; align-items: center; }
.footer-logo {
  width: 130px;
  height: auto;
  object-fit: contain;
}

.footer-contact-col { gap: 0.75rem; }

.contact-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #1a1a2e;
  margin-bottom: 0.25rem;
}

.contact-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.88rem;
  color: #444;
}

.contact-address {
  padding-left: 0.5rem;
  line-height: 1.5;
  color: #555;
}

.contact-list a {
  color: #555;
  text-decoration: none;
  transition: color 0.2s;
}

.contact-list a:hover { color: #d81b60; }

.footer-uimm-col {
  align-items: center;
  gap: 0.6rem;
}

.member-label {
  font-size: 0.82rem;
  color: #555;
  margin: 0;
}

.uimm-logo {
  width: 110px;
  height: auto;
  object-fit: contain;
}

.footer-qualiopi-col {
  gap: 0.6rem;
  max-width: 260px;
}

.qualiopi-logo {
  width: 240px;
  height: auto;
  object-fit: contain;
}

.qualiopi-caption {
  font-size: 0.72rem;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

.qualiopi-caption strong {
  color: #d81b60;
  font-weight: 700;
}

.footer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 5rem;
  border-top: 1px solid #ebebeb;
  background-color: #fff;
  font-size: 0.82rem;
  color: #888;
  max-width: 100%;
}

.footer-copy { color: #888; }

.footer-links {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.footer-links a {
  color: #555;
  text-decoration: none;
  font-size: 0.82rem;
  transition: color 0.2s;
}

.footer-links a:hover { color: #d81b60; }

.linkedin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #0077b5;
  color: #fff !important;
  border-radius: 6px;
  transition: background 0.2s !important;
}

.linkedin-btn:hover { background-color: #005885 !important; }

@media (max-width: 900px) {
  .footer-main {
    flex-wrap: wrap;
    padding: 2rem 2rem;
    gap: 1.5rem;
  }

  .footer-bar {
    padding: 0.9rem 2rem;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
}

@media (max-width: 600px) {
  .footer-main {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .contact-header { justify-content: center; }
  .contact-address { padding-left: 0; }
  .footer-bar { justify-content: center; }
}
</style>
