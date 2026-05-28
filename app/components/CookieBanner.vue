<script setup>
import { ref, onMounted } from 'vue'

const consentCookie = useCookie('rh_cookie_consent', {
  maxAge: 60 * 60 * 24 * 365, // 1 an (365 jours)
  path: '/'
})

const isVisible = ref(false)

onMounted(() => {
  // Affiche la bannière uniquement si aucun choix n'a été fait
  if (!consentCookie.value) {
    // Petit délai de 800ms pour une transition d'entrée fluide et premium
    setTimeout(() => {
      isVisible.value = true
    }, 800)
  }
})

const acceptAll = () => {
  consentCookie.value = 'accepted'
  isVisible.value = false
}

const declineAll = () => {
  consentCookie.value = 'declined'
  isVisible.value = false
}
</script>

<template>
  <Transition name="slide-up">
    <div v-if="isVisible" class="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-desc">
      <div class="cookie-content">
        <div class="cookie-header">
          <div class="cookie-icon-wrapper">
            <svg class="cookie-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z"/>
              <path d="M8.5 8.5v.01"/>
              <path d="M16 15.5v.01"/>
              <path d="M12 18v.01"/>
              <path d="M11 12v.01"/>
              <path d="M7 14v.01"/>
            </svg>
          </div>
          <h3 id="cookie-title">Respect de votre vie privée</h3>
        </div>
        <p id="cookie-desc">
          Nous utilisons des cookies fonctionnels nécessaires au bon fonctionnement de notre site. Vous pouvez choisir de les accepter ou de les refuser. Pour en savoir plus, consultez nos 
          <NuxtLink to="/mentions-legales" class="cookie-link">Mentions Légales</NuxtLink>.
        </p>
        <div class="cookie-actions">
          <button @click="declineAll" class="btn btn-secondary" aria-label="Refuser tous les cookies">
            Refuser
          </button>
          <button @click="acceptAll" class="btn btn-primary" aria-label="Accepter tous les cookies">
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  max-width: 400px;
  width: calc(100% - 48px);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  box-shadow: 
    0 10px 30px -10px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 30px 60px -15px rgba(26, 26, 46, 0.12);
  padding: 1.5rem;
  font-family: var(--font-body, 'Poppins', sans-serif);
}

.cookie-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cookie-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.cookie-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(186, 15, 96, 0.1);
  color: #BA0F60;
  border-radius: 10px;
}

.cookie-icon {
  width: 20px;
  height: 20px;
}

.cookie-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.cookie-content p {
  font-size: 0.88rem;
  line-height: 1.5;
  color: #4a5568;
  margin: 0;
}

.cookie-link {
  color: #BA0F60;
  text-decoration: underline;
  font-weight: 500;
  transition: color 0.2s ease;
}

.cookie-link:hover {
  color: #e91e8c;
}

.cookie-actions {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.btn {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.btn-primary {
  background: #BA0F60;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(186, 15, 96, 0.2);
}

.btn-primary:hover {
  background: #e91e8c;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(233, 30, 140, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: transparent;
  color: #4a5568;
  border: 1px solid #cbd5e1;
}

.btn-secondary:hover {
  background: rgba(74, 85, 104, 0.05);
  border-color: #94a3b8;
  color: #1a1a2e;
}

/* Animations de transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
  transform: translateY(40px) scale(0.96);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(20px) scale(0.98);
  opacity: 0;
}

@media (max-width: 480px) {
  .cookie-banner {
    bottom: 16px;
    right: 16px;
    left: 16px;
    width: auto;
    max-width: none;
    border-radius: 16px;
    padding: 1.25rem;
  }
  
  .cookie-actions {
    flex-direction: column-reverse;
  }
}
</style>
