<script setup>
const credentials = ref({ username: '', password: '' })
const error = ref('')
const isLoggingIn = ref(false)

const handleLogin = async () => {
  isLoggingIn.value = true
  error.value = ''
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: credentials.value })
    navigateTo('/admin')
  } catch (e) {
    error.value = 'Identifiants incorrects. Veuillez réessayer.'
  } finally {
    isLoggingIn.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-brand">
        <div class="login-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h1>Administration</h1>
        <p>RH Conseil 71</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="field">
          <label>Nom d'utilisateur</label>
          <input v-model="credentials.username" type="text" placeholder="Votre identifiant" required autocomplete="username" />
        </div>
        <div class="field">
          <label>Mot de passe</label>
          <input v-model="credentials.password" type="password" placeholder="••••••••" required autocomplete="current-password" />
        </div>

        <div v-if="error" class="login-error">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-4 h-4 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
          {{ error }}
        </div>

        <button type="submit" :disabled="isLoggingIn" class="login-btn">
          <span v-if="isLoggingIn" class="spinner"></span>
          {{ isLoggingIn ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>

      <NuxtLink to="/" class="login-back">← Retour au site</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 25px 60px rgba(0,0,0,0.35);
}

.login-brand {
  text-align: center;
  margin-bottom: 2rem;
}

.login-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #e91e8c, #9c1b5e);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #fff;
}

.login-icon svg {
  width: 28px;
  height: 28px;
}

.login-brand h1 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0;
}

.login-brand p {
  color: #94a3b8;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin-bottom: 0.4rem;
}

.field input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #1e293b;
  background: #f8fafc;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;
}

.field input:focus {
  border-color: #e91e8c;
  box-shadow: 0 0 0 3px rgba(233,30,140,0.1);
  background: #fff;
}

.login-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
}

.login-btn {
  width: 100%;
  padding: 0.85rem;
  background: linear-gradient(135deg, #e91e8c, #9c1b5e);
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: opacity 0.2s, transform 0.15s;
  margin-top: 0.5rem;
}

.login-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.login-back {
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #94a3b8;
  transition: color 0.2s;
}

.login-back:hover { color: #475569; }
</style>
