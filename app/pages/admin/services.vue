<script setup>
definePageMeta({ middleware: 'auth' })

const { data: services, refresh: refreshServices } = await useFetch('/api/services')
const { data: categories } = await useFetch('/api/categories')

onMounted(async () => {
  if (services.value?.length === 0) await refresh()
  try {
    await $fetch('/api/admin/fix-db')
  } catch (e) {}
})

const refresh = async () => {
  await refreshServices()
}

const newService = ref({ title: '', color: '#6b21a8', description: '', category_ids: [], themes: [], formations: [] })
const editingId = ref(null)
const editData = ref({})
const uploading = ref(false)
const saving = ref(false)

const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    navigateTo('/admin/login')
  } catch (e) {
    alert("Erreur lors de la déconnexion")
  }
}

const uploadLogo = async (file) => {
  if (!file) return null
  uploading.value = true
  try {
    const form = new FormData()
    form.append('file', file)
    const res = await $fetch('/api/upload-logo', { method: 'POST', body: form })
    return res.filename
  } finally {
    uploading.value = false
  }
}

const uploadPdf = async (file) => {
  if (!file) return null
  uploading.value = true
  try {
    const form = new FormData()
    form.append('file', file)
    const res = await $fetch('/api/upload-pdf', { method: 'POST', body: form })
    return res.url
  } finally {
    uploading.value = false
  }
}

const createService = async (evt) => {
  const fileInput = evt.target.closest('form').querySelector('input[type="file"]')
  const file = fileInput?.files?.[0]
  saving.value = true
  try {
    let logo = null
    if (file) logo = await uploadLogo(file)
    
    const themesToSave = (newService.value.themes || []).map(t => ({
      ...t,
      objectives: Array.isArray(t.objectives) ? t.objectives.filter(o => o.trim()).join('\n') : t.objectives
    }))
    
    const formationsToSave = await Promise.all((newService.value.formations || []).map(async f => {
      let pdf_url = f.pdf_url
      if (f._pdfFile) pdf_url = await uploadPdf(f._pdfFile)
      return {
        ...f,
        pdf_url,
        objectives: Array.isArray(f.objectives) ? f.objectives.filter(o => o.trim()).join('\n') : f.objectives
      }
    }))
    
    await $fetch('/api/services', { 
      method: 'POST', 
      body: { ...newService.value, logo, themes: themesToSave, formations: formationsToSave } 
    })
    newService.value = { title: '', color: '#6b21a8', description: '', category_ids: [], themes: [], formations: [] }
    if (fileInput) fileInput.value = ''
    await refresh()
  } catch (e) {
    alert("Erreur lors de la création")
  } finally {
    saving.value = false
  }
}

const startEdit = (service) => {
  editingId.value = service.id
  editData.value = { 
    ...service, 
    category_ids: (service.category_ids || []).map(Number),
    themes: service.themes ? service.themes.map(t => ({
      ...t,
      objectives: t.objectives ? t.objectives.split('\n').filter(o => o.trim()) : ['']
    })) : [],
    formations: service.formations ? service.formations.map(f => ({
      ...f,
      date: f.date || '',
      pdf_url: f.pdf_url || '',
      _pdfFile: null,
      objectives: f.objectives ? f.objectives.split('\n').filter(o => o.trim()) : ['']
    })) : []
  }
}

const addTheme = (target) => {
  const data = target.value || target
  if (!data.themes) data.themes = []
  data.themes.push({ title: '', objectives: [''] })
}

const removeTheme = (target, index) => {
  const data = target.value || target
  data.themes.splice(index, 1)
}

const addFormation = (target) => {
  const data = (target && target.value) ? target.value : target
  if (!data.formations) data.formations = []
  data.formations.push({ 
    title: '', 
    objectives: [''], 
    date: '', 
    pdf_url: '', 
    _pdfFile: null 
  })
}

const migrateThemesToFormations = (target) => {
  const data = (target && target.value) ? target.value : target
  if (!data.themes || data.themes.length === 0) {
    alert("Aucune thématique à migrer")
    return
  }
  if (!data.formations) data.formations = []
  
  const today = new Date().toISOString().split('T')[0]
  
  const migrated = data.themes.map(t => ({
    title: t.title,
    objectives: [...t.objectives],
    date: today,
    pdf_url: '',
    _pdfFile: null
  }))
  
  data.formations = [...data.formations, ...migrated]
}

const removeFormation = (target, index) => {
  const data = (target && target.value) ? target.value : target
  data.formations.splice(index, 1)
}

const addObjective = (theme) => {
  if (!theme.objectives) theme.objectives = []
  theme.objectives.push('')
}

const removeObjective = (theme, index) => {
  theme.objectives.splice(index, 1)
  if (theme.objectives.length === 0) theme.objectives.push('')
}

const saveEdit = async (evt) => {
  const fileInput = evt.target.closest('tr')?.querySelector('input[type="file"]')
  const file = fileInput?.files?.[0]
  saving.value = true
  try {
    let logo = editData.value.logo
    if (file) logo = await uploadLogo(file)
    
    const themesToSave = editData.value.themes.map(t => ({
      ...t,
      objectives: Array.isArray(t.objectives) ? t.objectives.filter(o => o.trim()).join('\n') : t.objectives
    }))

    const formationsToSave = await Promise.all(editData.value.formations.map(async f => {
      let currentPdf = f.pdf_url
      if (f._pdfFile) {
        const uploaded = await uploadPdf(f._pdfFile)
        if (uploaded) currentPdf = uploaded
      }
      return {
        ...f,
        pdf_url: currentPdf,
        objectives: Array.isArray(f.objectives) ? f.objectives.filter(o => o.trim()).join('\n') : f.objectives
      }
    }))
    
    await $fetch('/api/services', { 
      method: 'PUT', 
      body: { ...editData.value, logo, themes: themesToSave, formations: formationsToSave } 
    })
    editingId.value = null
    await refresh()
  } catch (e) {
    alert("Erreur lors de la sauvegarde")
  } finally {
    saving.value = false
  }
}

const deleteService = async (id) => {
  if (!confirm('Supprimer ce service ?')) return
  try {
    await $fetch('/api/services', { method: 'DELETE', body: { id } })
    await refresh()
  } catch (e) {
    alert("Erreur lors de la suppression")
  }
}
</script>

<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span class="sidebar-logo">RH</span>
        <div>
          <p class="sidebar-title">RH Conseil 71</p>
          <p class="sidebar-subtitle">Administration</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <p class="nav-section-label">Contenu</p>
        <NuxtLink to="/admin" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>
          Actualités
        </NuxtLink>
        <NuxtLink to="/admin/services" class="nav-item active">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
          Services
        </NuxtLink>
        <NuxtLink to="/admin/categories" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.159 3.659A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" /></svg>
          Catégories
        </NuxtLink>
        <NuxtLink to="/admin/particuliers" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
          Particuliers
        </NuxtLink>
        <NuxtLink to="/admin/equipe" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
          Équipe
        </NuxtLink>
        <NuxtLink to="/admin/statistics" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
          Statistiques
        </NuxtLink>

        <p class="nav-section-label">Outils</p>
        <NuxtLink to="/admin/database" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
          Base de données
        </NuxtLink>
        <NuxtLink to="/" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" /></svg>
          Voir le site
        </NuxtLink>

        <button @click="handleLogout" class="nav-item logout-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
          Déconnexion
        </button>
      </nav>
    </aside>

    <!-- Main -->
    <div class="main-content">
      <header class="page-header">
        <div>
          <h1 class="page-title">Services</h1>
          <p class="page-desc">Gérez les cards de service affichées sur l'accueil</p>
        </div>
        <div class="stat-pill">
          <span class="stat-value">{{ services?.length ?? 0 }}</span>
          <span class="stat-label">service(s)</span>
        </div>
      </header>

      <!-- Form création -->
      <section class="card">
        <h2 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Nouveau service
        </h2>
        <form @submit.prevent="createService" class="form-row">
          <div class="field grow">
            <label>Titre</label>
            <input v-model="newService.title" type="text" placeholder="ex: Recrutement" required />
          </div>
          <div class="field">
            <label>Couleur</label>
            <div class="color-input">
              <input v-model="newService.color" type="color" />
              <span class="color-hex">{{ newService.color }}</span>
            </div>
          </div>
          <div class="field grow">
            <label>Logo (image)</label>
            <input type="file" accept="image/*" class="file-input" />
          </div>
          <div class="field grow basis-full">
            <label>Catégories</label>
            <div class="checkbox-grid">
              <label v-for="cat in categories" :key="cat.id" class="checkbox-item">
                <input type="checkbox" :value="Number(cat.id)" v-model="newService.category_ids" />
                <span>{{ cat.titre }}</span>
              </label>
            </div>
          </div>
          <div class="field basis-full">
            <label>Description introduction (facultatif)</label>
            <textarea v-model="newService.description" placeholder="Courte introduction avant les thématiques..." rows="2"></textarea>
          </div>
          <div class="field basis-full">
            <div class="themes-header">
              <label>Thématiques & Objectifs</label>
              <button type="button" @click="addTheme(newService)" class="btn-add-mini">+ Ajouter une thématique</button>
            </div>
            <div class="themes-list">
              <div v-for="(theme, idx) in newService.themes" :key="idx" class="theme-item-edit">
                <div class="theme-row-top">
                  <input v-model="theme.title" type="text" placeholder="Titre de la thématique (ex: Audit sur la classification...)" class="grow" />
                  <button type="button" @click="removeTheme(newService, idx)" class="btn-remove-mini">×</button>
                </div>
                
                <div class="objectives-edit-section">
                  <span class="label-tiny">Objectifs</span>
                  <div v-for="(obj, oIdx) in theme.objectives" :key="oIdx" class="objective-field-row">
                    <input v-model="theme.objectives[oIdx]" type="text" placeholder="Saisir un objectif..." class="grow" />
                    <button type="button" @click="removeObjective(theme, oIdx)" class="btn-remove-tiny">×</button>
                  </div>
                  <button type="button" @click="addObjective(theme)" class="btn-add-tiny-plain">+ Ajouter un objectif</button>
                </div>
              </div>
            </div>
          </div>

          <div class="field basis-full" style="border-top: 1px dashed #e2e8f0; padding-top: 1.5rem;">
            <div class="themes-header">
              <label>Formations & Objectifs</label>
              <div class="header-btns">
                <button type="button" @click="migrateThemesToFormations(newService)" class="btn-migrate-mini" v-if="newService.themes?.length > 0">Copier les thématiques</button>
                <button type="button" @click="addFormation(newService)" class="btn-add-mini">+ Ajouter une formation</button>
              </div>
            </div>
            <div class="themes-list">
              <div v-for="(form, idx) in newService.formations" :key="idx" class="theme-item-edit-large" style="border-left: 4px solid #F7A600;">
                <div class="theme-row-top">
                  <input v-model="form.title" type="text" placeholder="Titre de la formation..." class="grow" />
                  <button type="button" @click="removeFormation(newService, idx)" class="btn-remove-mini">×</button>
                </div>
                
                <div class="formation-meta-edit">
                  <div class="field">
                    <label class="label-tiny">Date de la formation</label>
                    <input v-model="form.date" type="date" />
                  </div>
                  <div class="field">
                    <label class="label-tiny">Document PDF</label>
                    <div class="pdf-upload-box">
                      <input type="file" @change="e => form._pdfFile = e.target.files[0]" accept="application/pdf" class="file-input-sm" />
                      <span v-if="form.pdf_url" class="pdf-status">✓ En ligne</span>
                    </div>
                  </div>
                </div>

                <div class="objectives-edit-section">
                  <span class="label-tiny">Objectifs pédagogiques</span>
                  <div v-for="(obj, oIdx) in form.objectives" :key="oIdx" class="objective-field-row">
                    <input v-model="form.objectives[oIdx]" type="text" placeholder="Saisir un objectif..." class="grow" />
                    <button type="button" @click="removeObjective(form, oIdx)" class="btn-remove-tiny">×</button>
                  </div>
                  <button type="button" @click="addObjective(form)" class="btn-add-tiny-plain">+ Ajouter un objectif</button>
                </div>
              </div>
            </div>
          </div>
          <div class="field" style="padding-top: 0.5rem; width: 100%; display: flex; justify-content: flex-end;">
            <button type="submit" :disabled="saving || uploading" class="btn-primary">
              <span v-if="saving || uploading" class="spinner-sm"></span>
              {{ (saving || uploading) ? '...' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </section>

      <!-- Tableau -->
      <section class="card">
        <h2 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
          Services configurés
        </h2>

        <div v-if="!services || services.length === 0" class="empty-state">
          Aucun service. Utilisez le formulaire ci-dessus pour en créer un.
        </div>

        <div v-else class="services-table-wrap">
          <table class="services-table">
            <thead>
              <tr>
                <th>Couleur</th>
                <th>Catégories</th>
                <th>Titre / Description</th>
                <th>Logo</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="service in services" :key="service.id">
                <template v-if="editingId === service.id">
                  <td colspan="5" class="edit-mode-cell">
                    <div class="edit-full-layout">
                      <!-- Barre latérale / Catégories -->
                      <div class="edit-sidebar">
                        <div class="field">
                          <label>Couleur</label>
                          <input v-model="editData.color" type="color" class="color-pick-small" />
                        </div>
                        <div class="field mt-4">
                          <label>Catégories</label>
                          <div class="checkbox-grid-mini">
                            <label v-for="cat in categories" :key="cat.id" class="checkbox-item-mini">
                              <input type="checkbox" :value="Number(cat.id)" v-model="editData.category_ids" />
                              <span>{{ cat.titre }}</span>
                            </label>
                          </div>
                        </div>
                        <div class="field mt-4">
                          <label>Logo du service</label>
                          <div class="logo-edit">
                            <img v-if="editData.logo" :src="useAssetUrl(editData.logo, 'logo')" class="logo-thumb" />
                            <input type="file" accept="image/*" class="file-input-sm" />
                          </div>
                        </div>
                        
                        <div class="edit-actions-sidebar mt-8">
                          <button @click="saveEdit($event)" :disabled="saving" class="btn-save-full">Enregistrer les modifications</button>
                          <button @click="editingId = null" class="btn-cancel-full">Annuler</button>
                        </div>
                      </div>

                      <!-- Contenu principal -->
                      <div class="edit-main-fields">
                        <div class="field mb-4">
                          <label>Titre du service</label>
                          <input v-model="editData.title" class="edit-input-lg" placeholder="ex: Formations" />
                        </div>
                        <div class="field mb-6">
                          <label>Introduction du service</label>
                          <textarea v-model="editData.description" class="edit-input" rows="3" placeholder="Présentation rapide du service..."></textarea>
                        </div>

                        <div class="edit-sections-grid">
                          <!-- Thématiques -->
                          <div class="edit-section-block">
                            <div class="themes-header-mini mb-4">
                              <span class="label-mini">Thématiques & Accompagnement</span>
                              <button type="button" @click="addTheme(editData)" class="btn-add-mini-plain">+ Ajouter un thème</button>
                            </div>
                            <div class="themes-list-scroll">
                              <div v-for="(theme, idx) in editData.themes" :key="idx" class="theme-item-mini-v2">
                                <div class="theme-mini-row">
                                  <input v-model="theme.title" placeholder="Titre du thème" class="mini-input grow" style="font-weight: 700;" />
                                  <button type="button" @click="removeTheme(editData, idx)" class="btn-remove-mini">×</button>
                                </div>
                                <div class="mini-objectives">
                                  <div v-for="(obj, oIdx) in theme.objectives" :key="oIdx" class="mini-objective-row">
                                    <input v-model="theme.objectives[oIdx]" class="mini-input grow" placeholder="Objectif..." />
                                    <button type="button" @click="removeObjective(theme, oIdx)" class="btn-remove-tiny">×</button>
                                  </div>
                                  <button type="button" @click="addObjective(theme)" class="btn-add-tiny-plain">+ Obj.</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Formations -->
                          <div class="edit-section-block">
                            <div class="themes-header-mini mb-4">
                              <span class="label-mini" style="color: #F7A600;">Catalogue Formations (Calendrier)</span>
                              <div class="mini-header-btns">
                                <button type="button" @click="migrateThemesToFormations(editData)" class="btn-migrate-mini-plain" v-if="editData.themes?.length > 0">Copier les thèmes</button>
                                <button type="button" @click="addFormation(editData)" class="btn-add-mini-plain" style="color: #F7A600;">+ Ajouter une formation</button>
                              </div>
                            </div>
                            <div class="themes-list-scroll">
                              <div v-for="(form, idx) in editData.formations" :key="idx" class="theme-item-mini-v2" style="border-left-color: #F7A600;">
                                <div class="theme-mini-row">
                                  <input v-model="form.title" placeholder="Nom de la formation" class="mini-input grow" style="font-weight: 700;" />
                                  <button type="button" @click="removeFormation(editData, idx)" class="btn-remove-mini">×</button>
                                </div>
                                <div class="formation-meta-edit-mini-v2">
                                  <div class="field">
                                    <span class="label-tiny">Date (Calendrier)</span>
                                    <input v-model="form.date" type="date" class="mini-input-date" />
                                  </div>
                                  <div class="field">
                                    <span class="label-tiny">Programme PDF</span>
                                    <div class="mini-pdf-row">
                                      <input type="file" @change="e => form._pdfFile = e.target.files[0]" accept="application/pdf" class="file-input-xs" />
                                      <span v-if="form.pdf_url" class="pdf-tag">OK</span>
                                    </div>
                                  </div>
                                </div>
                                <div class="mini-objectives">
                                  <div v-for="(obj, oIdx) in form.objectives" :key="oIdx" class="mini-objective-row">
                                    <input v-model="form.objectives[oIdx]" class="mini-input grow" placeholder="Objectif..." />
                                    <button type="button" @click="removeObjective(form, oIdx)" class="btn-remove-tiny">×</button>
                                  </div>
                                  <button type="button" @click="addObjective(form)" class="btn-add-tiny-plain" style="color: #F7A600;">+ Obj.</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </template>
                <template v-else>
                  <td>
                    <div class="color-swatch" :style="{ background: service.color }"></div>
                  </td>
                  <td>
                    <div class="tag-container" v-if="service.category_ids && service.category_ids.length > 0">
                      <span v-for="catId in service.category_ids" :key="catId" class="stat-pill-sm">
                        {{ categories?.find(c => c.id === catId)?.titre || '?' }}
                      </span>
                    </div>
                    <span v-else class="no-logo">Aucune</span>
                  </td>
                  <td>
                    <div class="service-name">{{ service.title }}</div>
                    <div class="service-desc-preview">{{ service.description?.substring(0, 60) }}{{ (service.description?.length > 60) ? '...' : '' }}</div>
                  </td>
                  <td>
                    <img v-if="service.logo" :src="useAssetUrl(service.logo, 'logo')" class="logo-thumb" />
                    <span v-else class="no-logo">Aucun</span>
                  </td>
                  <td class="text-right">
                    <button @click="startEdit(service)" class="btn-edit">Modifier</button>
                    <button @click="deleteService(service.id)" class="btn-del">Supprimer</button>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Aperçu -->
      <section class="card">
        <h2 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Aperçu — grille homepage
        </h2>
        <div class="preview-grid">
          <div
            v-for="service in services"
            :key="service.id"
            class="preview-card"
            :style="{ backgroundColor: service.color }"
          >
            <span class="preview-title">{{ service.title }}</span>
            <img
              v-if="service.logo"
              :src="useAssetUrl(service.logo, 'logo')"
              class="preview-logo"
            />
          </div>
          <div v-if="!services || services.length === 0" class="preview-empty">
            Aucun service à afficher.
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; background: #f1f5f9; }

.sidebar {
  width: 220px; background: #1a1a2e;
  display: flex; flex-direction: column; flex-shrink: 0;
  position: sticky; top: 0; height: 100vh; overflow-y: auto;
}
.sidebar-brand { display: flex; align-items: center; gap: 0.75rem; padding: 1.25rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
.sidebar-logo { width: 36px; height: 36px; background: linear-gradient(135deg, #e91e8c, #9c1b5e); border-radius: 9px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.8rem; color: #fff; flex-shrink: 0; }
.sidebar-title { font-weight: 700; font-size: 0.82rem; color: #fff; margin: 0; line-height: 1.2; }
.sidebar-subtitle { font-size: 0.68rem; color: rgba(255,255,255,0.4); margin: 0; }
.sidebar-nav { flex: 1; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.15rem; }
.nav-section-label { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); padding: 0.5rem 0.6rem 0.25rem; margin: 0; }
.nav-item { display: flex; align-items: center; gap: 0.55rem; padding: 0.55rem 0.8rem; border-radius: 7px; font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.5); transition: all 0.2s; text-decoration: none; }
.nav-item svg { width: 17px; height: 17px; flex-shrink: 0; }
.nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
.nav-item.active { background: rgba(66, 185, 181, 0.2); color: #42b9b5; }
.logout-btn { background: none; border: none; cursor: pointer; width: 100%; text-align: left; color: rgba(255,100,100,0.65); }
.logout-btn:hover { background: rgba(239,68,68,0.12); color: #f87171; }
.sidebar-logout { margin-top: auto; display: flex; align-items: center; gap: 0.6rem; padding: 0.8rem 1rem; border-top: 1px solid rgba(255,255,255,0.08); background: none; border-left: none; border-right: none; border-bottom: none; color: rgba(255,255,255,0.45); font-size: 0.82rem; cursor: pointer; transition: color 0.2s; width: 100%; }
.sidebar-logout svg { width: 17px; height: 17px; }
.sidebar-logout:hover { color: #f87171; }
.main-content { flex: 1; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; max-width: 1300px; margin: 0 auto; width: 100%; }

.page-header { display: flex; align-items: flex-start; justify-content: space-between; }
.page-title { font-size: 1.75rem; font-weight: 800; color: #0f172a; margin: 0; }
.page-desc { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }
.stat-pill { display: flex; align-items: baseline; gap: 0.3rem; background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 0.4rem 0.9rem; }
.stat-value { font-size: 1.1rem; font-weight: 800; color: #e91e8c; }
.stat-label { font-size: 0.75rem; color: #94a3b8; }

.card { background: #fff; border-radius: 16px; padding: 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
.card-title { display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 700; color: #1e293b; margin: 0 0 1.25rem; }
.card-title svg { width: 18px; height: 18px; flex-shrink: 0; }

.form-row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: flex-start; }
.field { display: flex; flex-direction: column; gap: 0.35rem; }
.field.grow { flex: 1; min-width: 140px; }
.field label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
.field input[type="text"] { padding: 0.65rem 0.85rem; border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
.field input[type="text"]:focus { border-color: #e91e8c; box-shadow: 0 0 0 3px rgba(233,30,140,0.08); background: #fff; }
.field textarea { padding: 0.65rem 0.85rem; border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: vertical; }
.field textarea:focus { border-color: #e91e8c; box-shadow: 0 0 0 3px rgba(233,30,140,0.08); background: #fff; }
.field.basis-full { flex: 0 0 100%; }
.mb-2 { margin-bottom: 0.5rem; }
.color-input { display: flex; align-items: center; gap: 0.5rem; }
.color-input input[type="color"] { width: 40px; height: 38px; border-radius: 8px; border: 1.5px solid #e2e8f0; padding: 2px; cursor: pointer; }
.color-hex { font-size: 0.75rem; font-family: monospace; color: #64748b; }
.file-input { font-size: 0.8rem; color: #475569; }
.file-input::file-selector-button { margin-right: 0.5rem; padding: 0.3rem 0.75rem; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: #64748b; cursor: pointer; }
.btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.25rem; background: linear-gradient(135deg, #e91e8c, #9c1b5e); color: #fff; font-weight: 700; font-size: 0.875rem; border: none; border-radius: 9px; cursor: pointer; transition: opacity 0.2s, transform 0.15s; white-space: nowrap; }
.btn-primary:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.spinner-sm { width: 13px; height: 13px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.services-table-wrap { overflow-x: auto; border-radius: 10px; border: 1px solid #f1f5f9; }
.services-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
.services-table thead tr { background: #f8fafc; }
.services-table th { padding: 0.6rem 1rem; text-align: left; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
.services-table tbody tr { border-top: 1px solid #f1f5f9; transition: background 0.15s; }
.services-table tbody tr:hover { background: #fafafa; }
.services-table td { padding: 0.75rem 1rem; vertical-align: middle; }
.text-right { text-align: right !important; }

.color-swatch { width: 28px; height: 28px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.1); }
.service-name { font-weight: 600; color: #1e293b; margin-bottom: 0.2rem; }
.service-desc-preview { font-size: 0.75rem; color: #64748b; line-height: 1.4; }
.logo-thumb { width: 32px; height: 32px; object-fit: contain; border-radius: 6px; background: #f8fafc; border: 1px solid #e2e8f0; }
.no-logo { font-size: 0.75rem; color: #cbd5e1; }

.color-pick-small { width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid #e2e8f0; padding: 2px; cursor: pointer; }
.edit-input { padding: 0.45rem 0.7rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #1e293b; outline: none; }
.edit-input:focus { border-color: #e91e8c; }
.logo-edit { display: flex; align-items: center; gap: 0.5rem; }
.file-input-sm { font-size: 0.72rem; color: #64748b; }

.btn-save { font-size: 0.75rem; font-weight: 700; color: #16a34a; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 0.3rem 0.65rem; cursor: pointer; margin-right: 0.4rem; transition: all 0.15s; }
.btn-save:hover { background: #dcfce7; }
.btn-cancel { font-size: 0.75rem; font-weight: 600; color: #94a3b8; background: none; border: none; cursor: pointer; }
.btn-edit { font-size: 0.75rem; font-weight: 700; color: #2563eb; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 0.3rem 0.65rem; cursor: pointer; margin-right: 0.4rem; transition: all 0.15s; }
.btn-edit:hover { background: #dbeafe; }
.btn-del { font-size: 0.75rem; font-weight: 700; color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 0.3rem 0.65rem; cursor: pointer; transition: all 0.15s; }
.btn-del:hover { background: #fee2e2; }

.empty-state { padding: 2.5rem; text-align: center; color: #94a3b8; font-size: 0.875rem; }

.preview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.preview-card { border-radius: 12px; min-height: 80px; padding: 1rem; position: relative; overflow: hidden; display: flex; align-items: flex-start; transition: transform 0.2s; }
.preview-card:hover { transform: translateY(-2px); }
.preview-title { font-size: 0.82rem; font-weight: 600; color: #fff; line-height: 1.3; position: relative; z-index: 1; }
.preview-logo { position: absolute; bottom: 0.5rem; right: 0.5rem; width: 40px; height: 40px; object-fit: contain; opacity: 0.18; }
.preview-empty { grid-column: 1 / -1; text-align: center; color: #94a3b8; font-size: 0.875rem; padding: 2rem; }
.checkbox-grid { display: flex; flex-wrap: wrap; gap: 0.8rem; background: #f8fafc; padding: 1rem; border: 1.5px solid #e2e8f0; border-radius: 9px; }
.checkbox-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; font-weight: 600; color: #475569; cursor: pointer; padding: 0.25rem 0.5rem; border-radius: 6px; transition: background 0.2s; }
.checkbox-item:hover { background: #f1f5f9; }
.checkbox-item input { width: 16px; height: 16px; accent-color: #e91e8c; cursor: pointer; }

.checkbox-grid-mini { display: flex; flex-direction: column; gap: 0.35rem; max-height: 250px; overflow-y: auto; padding: 0.6rem; background: #f8fafc; border: 1.1px solid #e2e8f0; border-radius: 6px; min-width: 180px; }
.checkbox-item-mini { display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; font-weight: 500; color: #64748b; cursor: pointer; }
.checkbox-item-mini input { width: 14px; height: 14px; accent-color: #e91e8c; }

.tag-container { display: flex; flex-wrap: wrap; gap: 0.35rem; max-width: 180px; }
.stat-pill-sm { font-size: 0.65rem; font-weight: 700; color: #e91e8c; background: rgba(233, 30, 140, 0.08); border: 1px solid rgba(233, 30, 140, 0.15); border-radius: 12px; padding: 0.15rem 0.45rem; white-space: nowrap; }

.themes-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.btn-add-mini { font-size: 0.72rem; font-weight: 700; color: #e91e8c; background: #fff; border: 1.5px dashed #e91e8c; border-radius: 8px; padding: 0.4rem 0.8rem; cursor: pointer; }
.themes-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem; }
.theme-item-edit { display: flex; flex-direction: column; gap: 0.6rem; padding: 1.25rem; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
.theme-row-top { display: flex; gap: 0.6rem; align-items: center; }
.theme-row-top input { font-weight: 700; font-size: 0.95rem; padding: 0.6rem 0.8rem; }
.btn-remove-mini { color: #dc2626; font-size: 1.3rem; background: none; border: none; cursor: pointer; padding: 0 0.5rem; display: flex; align-items: center; opacity: 0.6; transition: opacity 0.2s; }
.btn-remove-mini:hover { opacity: 1; }
.themes-edit-wrap { margin-top: 1rem; border-top: 1px solid #e2e8f0; padding-top: 1rem; }
.themes-header-mini { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.label-mini { font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.btn-add-mini-plain { font-size: 0.72rem; font-weight: 800; color: #e91e8c; background: rgba(233, 30, 140, 0.05); border: 1px solid rgba(233, 30, 140, 0.2); border-radius: 6px; padding: 0.2rem 0.6rem; cursor: pointer; }
.theme-item-mini { margin-bottom: 1rem; padding: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; }
.theme-mini-row { display: flex; gap: 0.4rem; margin-bottom: 0.5rem; }
.mini-input { width: 100%; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.4rem 0.6rem; font-size: 0.85rem; outline: none; background: #fff; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02); }
.mini-input:focus { border-color: #e91e8c; box-shadow: 0 0 0 2px rgba(233,30,140,0.05); }

.objectives-edit-section { margin-top: 0.75rem; padding: 1rem; background: #f1f5f9; border-radius: 8px; border: 1px solid #e2e8f0; }
.label-tiny { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; color: #64748b; margin-bottom: 0.6rem; display: block; letter-spacing: 0.05em; }
.objective-field-row { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
.objective-field-row input { padding: 0.5rem 0.75rem; }
.btn-remove-tiny { color: #94a3b8; font-size: 1.1rem; background: none; border: none; cursor: pointer; transition: color 0.2s; }
.btn-remove-tiny:hover { color: #dc2626; }
.btn-add-tiny-plain { font-size: 0.75rem; font-weight: 800; color: #e91e8c; background: #fff; border: 1px solid rgba(233, 30, 140, 0.2); border-radius: 6px; padding: 0.3rem 0.8rem; cursor: pointer; margin-top: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
.mini-objectives { padding-left: 0.75rem; border-left: 3px solid #e2e8f0; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.4rem; }
.mini-objective-row { display: flex; gap: 0.35rem; align-items: center; }
.formation-meta-edit { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.5rem; }
.pdf-upload-box { display: flex; align-items: center; gap: 0.5rem; }
.pdf-status { font-size: 0.7rem; color: #16a34a; font-weight: 700; white-space: nowrap; }
.formation-meta-edit-mini { background: #fff; padding: 0.5rem; border-radius: 6px; margin-bottom: 0.5rem; display: flex; flex-direction: column; gap: 0.4rem; }
.edit-mode-cell { background: #f0f7f7; padding: 0 !important; }
.edit-full-layout { display: flex; gap: 0; min-height: 500px; border: 2px solid #42b9b5; border-radius: 12px; overflow: hidden; }
.edit-sidebar { width: 260px; background: #fff; padding: 2rem; border-right: 1px solid #e2e8f0; }
.edit-main-fields { flex: 1; padding: 2rem; display: flex; flex-direction: column; }
.edit-input-lg { width: 100%; padding: 0.8rem 1rem; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 1.1rem; font-weight: 700; outline: none; transition: border-color 0.2s; }
.edit-input-lg:focus { border-color: #42b9b5; }
.edit-sections-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem; flex: 1; }
.edit-section-block { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.25rem; display: flex; flex-direction: column; }
.themes-list-scroll { flex: 1; overflow-y: auto; max-height: 480px; padding-right: 0.5rem; display: flex; flex-direction: column; gap: 1rem; }
.theme-item-mini-v2 { padding: 1rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; border-left: 4px solid #e91e8c; }
.formation-meta-edit-mini-v2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; background: #f0fdfd; padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0; border: 1px solid #c2eaea; }
.mini-pdf-row { display: flex; align-items: center; gap: 0.4rem; }
.file-input-xs { font-size: 0.65rem; width: 100%; }
.pdf-tag { font-size: 0.6rem; font-weight: 800; background: #42b9b5; color: #fff; padding: 2px 6px; border-radius: 4px; }
.btn-save-full { width: 100%; background: #42b9b5; color: #fff; border: none; padding: 0.8rem; border-radius: 10px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
.btn-save-full:hover { opacity: 0.9; }
.btn-cancel-full { width: 100%; background: none; border: 1px solid #e2e8f0; color: #64748b; padding: 0.8rem; border-radius: 10px; font-weight: 600; cursor: pointer; margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-8 { margin-top: 2rem; }
.mini-input-date { padding: 0.35rem; border: 1.1px solid #c2eaea; border-radius: 6px; font-size: 0.8rem; width: 100%; outline: none; background: #fff; color: #42b9b5; font-weight: 700; cursor: pointer; }
.mini-input-date:focus { border-color: #42b9b5; }
</style>
