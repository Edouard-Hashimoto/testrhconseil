<template>
  <div class="contact-page">
    <div class="contact-container">
      <div class="contact-grid">
        <div class="contact-form-section">
          <h1 class="contact-title">Contact</h1>
          <div class="title-bar"></div>

          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <input type="text" v-model="form.nom" placeholder="Nom" required />
              </div>
              <div class="form-group">
                <input type="text" v-model="form.prenom" placeholder="Prénom" required />
              </div>
            </div>

            <div class="form-group">
              <input type="tel" v-model="form.telephone" placeholder="Numéro de téléphone" />
            </div>

            <div class="form-group">
              <input type="email" v-model="form.email" placeholder="Adresse mail" required />
            </div>

            <div class="form-group">
              <textarea v-model="form.message" placeholder="Message" rows="6" required></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="sending">
              {{ sending ? 'Envoi...' : 'Envoyer' }}
            </button>
            <p v-if="success" class="success-message">Message envoyé avec succès !</p>
            <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
          </form>
        </div>

        <div class="contact-map-section">
          <div id="map" class="leaflet-map-container"></div>
          <div class="parking-notice">
            <div class="parking-notice-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"/>
              </svg>
            </div>
            <div class="parking-notice-body">
              <strong class="parking-notice-title">Accès à nos locaux</strong>
              <p class="parking-notice-text">
                Nos locaux sont situés en <strong>zone bleue</strong> — pensez à prévoir un <strong>disque de stationnement</strong>. Nous ne disposons pas de parking dédié.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const route = useRoute()
const form = ref({
  nom: '',
  prenom: '',
  telephone: '',
  email: '',
  message: ''
})

const sending = ref(false)
const success = ref(false)
const errorMsg = ref('')

const handleSubmit = async () => {
  sending.value = true
  errorMsg.value = ''
  success.value = false

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })

    if (response.success) {
      success.value = true
      form.value = {
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        message: ''
      }
    }
  } catch (err) {
    console.error('Erreur:', err)
    errorMsg.value = "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard."
  } finally {
    sending.value = false
  }
}

onMounted(async () => {
  if (route.query.message) {
    form.value.message = String(route.query.message)
  }

  if (process.client) {
    const L = await import('leaflet')
    import('leaflet/dist/leaflet.css')

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const coords = [46.77773, 4.84596]
    const map = L.map('map', {
      center: coords,
      zoom: 17,
      scrollWheelZoom: false
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    const marker = L.marker(coords).addTo(map)
    
    marker.bindPopup('<b>RH Conseil 71</b><br>75 Grande Rue Saint-Cosme<br>71100 Chalon-sur-Saône (UIMM 71)')
    
    setTimeout(() => {
      map.invalidateSize()
      map.setView(coords, 17)
      marker.openPopup()
    }, 250)
  }
})

useHead({
  title: 'Contact - RH Conseil 71',
  meta: [
    { name: 'description', content: 'Contactez RH Conseil 71 pour vos besoins en ressources humaines.' }
  ]
})
</script>

<style scoped>
.contact-page {
  padding: 120px 2rem 6rem;
  background-color: #f6f6f6;
  min-height: 100vh;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 5rem;
  align-items: stretch;
}

.contact-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #000;
  margin-bottom: 0px;
  line-height: 1;
}

.title-bar {
  width: 100%;
  height: 8px;
  background-color: #C8D465;
  margin-top: 10px;
  margin-bottom: 3.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-group {
  flex: 1;
}

input, textarea {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
  font-size: 1.1rem;
  background-color: #fcfcfc;
  color: #333;
  transition: all 0.2s;
}

input::placeholder, textarea::placeholder {
  color: #999;
}

input:focus, textarea:focus {
  outline: none;
  background-color: #fff;
  border-color: #C8D465;
  box-shadow: 0 0 0 3px rgba(200, 212, 101, 0.1);
}

textarea {
  resize: vertical;
}

.submit-btn {
  padding: 1rem 2.5rem;
  background-color: #2b2b2b;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  align-self: flex-start;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  background-color: #0d0d0d;
}

.submit-btn:active {
  transform: translateY(2px);
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-message {
  color: #2d4a3e;
  background: #e6fffa;
  padding: 1rem;
  border-radius: 4px;
  font-weight: 600;
  margin-top: 1rem;
}

.error-message {
  color: #c53030;
  background: #fff5f5;
  padding: 1rem;
  border-radius: 4px;
  font-weight: 600;
  margin-top: 1rem;
}

.contact-map-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: stretch;
}

.leaflet-map-container {
  height: 600px;
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 45px rgba(0,0,0,0.06);
  z-index: 10;
}

/* Parking Notice */
.parking-notice {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: #e8f4fd;
  border: 1px solid #b3d7f0;
  border-left: 4px solid #2196F3;
  border-radius: 14px;
  padding: 1rem 1.25rem;
}

.parking-notice-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: #2196F3;
  border-radius: 10px;
  color: #fff;
  flex-shrink: 0;
}

.parking-notice-body {
  flex: 1;
}

.parking-notice-title {
  display: block;
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #1565C0;
  margin-bottom: 0.4rem;
}

.parking-notice-text {
  font-size: 0.95rem;
  color: #334155;
  line-height: 1.6;
  margin: 0 !important;
  text-align: left !important;
}

.parking-notice-text strong {
  color: #1565C0;
}

@media (max-width: 1000px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 600px) {
  .contact-title { font-size: 2.8rem; }
  .form-row { flex-direction: column; gap: 1.5rem; }
  .leaflet-map-container { height: 400px; }
}
</style>
