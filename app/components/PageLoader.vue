<template>
  <Transition name="fade">
    <div v-if="loading" class="page-loader" aria-hidden="true">
      <div class="loader-content">
        <!-- Logo and animated ring container -->
        <div class="logo-container">
          <div class="logo-wrapper">
            <img src="~/assets/img/logo_rhc.png" alt="RH Conseil 71" class="loader-logo" />
          </div>
          <!-- Outer glowing orbital rings -->
          <div class="orbit-ring orbit-ring-1"></div>
          <div class="orbit-ring orbit-ring-2"></div>
        </div>
        
        <!-- Premium Loading Spinner & Text -->
        <div class="status-container">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div class="loader-text">
            <span>Chargement</span>
            <span class="dot-bounce">.</span>
            <span class="dot-bounce">.</span>
            <span class="dot-bounce">.</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(false)
const router = useRouter()

let loadTimeout = null
let showTime = 0
const THRESHOLD = 350 // Affiche le chargeur seulement si le chargement dépasse 350ms
const MIN_SHOW_TIME = 500 // Si affiché, reste visible au moins 500ms pour éviter les clignotements

const startLoading = () => {
  if (loadTimeout) clearTimeout(loadTimeout)
  loadTimeout = setTimeout(() => {
    loading.value = true
    showTime = Date.now()
  }, THRESHOLD)
}

const stopLoading = () => {
  if (loadTimeout) {
    clearTimeout(loadTimeout)
    loadTimeout = null
  }
  
  if (loading.value) {
    const elapsed = Date.now() - showTime
    const remaining = Math.max(0, MIN_SHOW_TIME - elapsed)
    setTimeout(() => {
      loading.value = false
    }, remaining)
  }
}

// Listen to route changes
router.beforeEach(() => {
  startLoading()
})

router.afterEach(() => {
  stopLoading()
})

onMounted(() => {
  // S'assurer de nettoyer tout timeout et cacher le chargeur initial une fois monté
  stopLoading()
})
</script>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at center, #1e4670 0%, #0d233c 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999; /* Ensure it is above everything, including dialogs */
  overflow: hidden;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  perspective: 1000px;
}

/* Logo container & orbital animations */
.logo-container {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-wrapper {
  width: 130px;
  height: 130px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25), 
              0 0 0 8px rgba(255, 255, 255, 0.08);
  padding: 18px;
  z-index: 10;
  animation: pulse 2.5s infinite ease-in-out;
}

.loader-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Glowing Orbital Rings */
.orbit-ring {
  position: absolute;
  border: 3px solid transparent;
  border-radius: 50%;
}

.orbit-ring-1 {
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border-top-color: var(--color-accent, #e8a020);
  border-left-color: var(--color-accent, #e8a020);
  animation: spin-clockwise 1.5s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
  z-index: 5;
}

.orbit-ring-2 {
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-bottom-color: var(--color-magenta, #d81b60);
  border-right-color: var(--color-magenta, #d81b60);
  animation: spin-counter-clockwise 2s cubic-bezier(0.4, 0.1, 0.3, 0.8) infinite;
  opacity: 0.8;
  z-index: 4;
}

/* Status bar & text */
.status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  width: 160px;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  background: linear-gradient(90deg, var(--color-accent, #e8a020), var(--color-magenta, #d81b60));
  border-radius: 10px;
  animation: loading-bar-move 1.6s ease-in-out infinite;
}

.loader-text {
  font-family: var(--font-heading), "Bahnschrift", sans-serif;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 0.25rem;
}

.dot-bounce {
  animation: dot-bounce 1.4s infinite both;
}

.dot-bounce:nth-child(2) {
  animation-delay: 0.2s;
}

.dot-bounce:nth-child(3) {
  animation-delay: 0.4s;
}

/* Animations */
@keyframes spin-clockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-counter-clockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25), 
                0 0 0 8px rgba(255, 255, 255, 0.08);
  }
  50% {
    transform: scale(1.04);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35), 
                0 0 0 15px rgba(255, 255, 255, 0.12);
  }
}

@keyframes loading-bar-move {
  0% {
    left: -50%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes dot-bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
