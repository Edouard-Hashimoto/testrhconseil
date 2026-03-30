<script setup>
definePageMeta({ middleware: 'auth' })

const { data: particuliers, refresh } = await useFetch('/api/particuliers')

const newParticulier = ref({ titre: '', description_courte: '', description_complete: '', color: '#42B9B5' })
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

const uploadImage = async (file) => {
  if (!file) return null
  uploading.value = true
  try {
    const form = new FormData()
    form.append('file', file)
    const res = await $fetch('/api/upload-particulier-image', { method: 'POST', body: form })
    return res.filename
  } finally {
    uploading.value = false
  }
}

const createParticulier = async (evt) => {
  const fileInputPicto = evt.target.closest('form').querySelector('input[name="picto"]')
  const fileInputImage = evt.target.closest('form').querySelector('input[name="image"]')
  
  const pictoFile = fileInputPicto?.files?.[0]
  const imageFile = fileInputImage?.files?.[0]
  
  saving.value = true
  try {
    let picto = null
    let image = null
    
    if (pictoFile) picto = await uploadImage(pictoFile)
    if (imageFile) image = await uploadImage(imageFile)
    
    await $fetch('/api/particuliers', { method: 'POST', body: { ...newParticulier.value, picto, image } })
    newParticulier.value = { titre: '', description_courte: '', description_complete: '', color: '#42B9B5' }
    if (fileInputPicto) fileInputPicto.value = ''
    if (fileInputImage) fileInputImage.value = ''
    await refresh()
  } catch (e) {
    alert("Erreur lors de la création")
  } finally {
    saving.value = false
  }
}

const startEdit = (particulier) => {
  editingId.value = particulier.id
  editData.value = { ...particulier }
}

const saveEdit = async (evt) => {
  const fileInputPicto = evt.target.closest('tr')?.querySelector('input[name="pictoEdit"]')
  const fileInputImage = evt.target.closest('tr')?.querySelector('input[name="imageEdit"]')
  
  const pictoFile = fileInputPicto?.files?.[0]
  const imageFile = fileInputImage?.files?.[0]
  
  saving.value = true
  try {
    let picto = editData.value.picto
    let image = editData.value.image
    
    if (pictoFile) picto = await uploadImage(pictoFile)
    if (imageFile) image = await uploadImage(imageFile)
    
    await $fetch('/api/particuliers', { method: 'PUT', body: { ...editData.value, picto, image } })
    editingId.value = null
    await refresh()
  } catch (e) {
    alert("Erreur lors de la sauvegarde")
  } finally {
    saving.value = false
  }
}

const deleteParticulier = async (id) => {
  if (!confirm('Supprimer ce particulier ?')) return
  try {
    await $fetch('/api/particuliers', { method: 'DELETE', body: { id } })
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
        <NuxtLink to="/admin/services" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
          Services
        </NuxtLink>
        <NuxtLink to="/admin/categories" class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.159 3.659A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" /></svg>
          Catégories
        </NuxtLink>
        <NuxtLink to="/admin/particuliers" class="nav-item active">
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
          <h1 class="page-title">Particuliers</h1>
          <p class="page-desc">Gérez les cards pour la section Particuliers</p>
        </div>
        <div class="stat-pill">
          <span class="stat-value">{{ particuliers?.length ?? 0 }}</span>
          <span class="stat-label">card(s)</span>
        </div>
      </header>

      <!-- Form création -->
      <section class="card">
        <h2 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Nouvelle card
        </h2>
        <form @submit.prevent="createParticulier" class="form-row">
          <div class="field grow basis-full">
            <label>Titre</label>
            <input v-model="newParticulier.titre" type="text" placeholder="ex: Bilan de compétences" required />
          </div>
          <div class="field grow basis-full">
            <label>Description courte (sur la carte)</label>
            <input v-model="newParticulier.description_courte" type="text" placeholder="ex: Évaluez vos atouts" required />
          </div>
          <div class="field basis-full">
            <label>Description complète (page détail)</label>
            <textarea v-model="newParticulier.description_complete" placeholder="Description complète..." rows="4" required></textarea>
          </div>
          <div class="field grow">
            <label>Picto de la card (image)</label>
            <input type="file" name="picto" accept="image/*" class="file-input" />
          </div>
          <div class="field grow">
            <label>Image pour la page détail</label>
            <input type="file" name="image" accept="image/*" class="file-input" />
          </div>
          <div class="field grow">
            <label>Couleur / Dégradé de fond</label>
            <input v-model="newParticulier.color" type="text" placeholder="ex: #42B9B5 ou linear-gradient(...)" />
          </div>
          <div class="field basis-full" style="padding-top: 0.5rem; display: flex; justify-content: flex-end;">
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
          Cards configurées
        </h2>

        <div v-if="!particuliers || particuliers.length === 0" class="empty-state">
          Aucune card. Utilisez le formulaire ci-dessus pour en créer une.
        </div>

        <div v-else class="services-table-wrap">
          <table class="services-table">
            <thead>
              <tr>
                <th>Titre / Descriptions</th>
                <th>Picto / Image</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="part in particuliers" :key="part.id">
                <template v-if="editingId === part.id">
                  <td>
                    <input v-model="editData.titre" class="edit-input mb-2" style="width: 100%;" placeholder="Titre" />
                    <input v-model="editData.description_courte" class="edit-input mb-2" style="width: 100%;" placeholder="Description courte" />
                    <textarea v-model="editData.description_complete" class="edit-input mb-2" style="width: 100%; font-size: 0.8rem;" rows="3" placeholder="Description complète"></textarea>
                    <div class="mt-2">
                      <label class="text-xs font-bold block mb-1">Couleur / Dégradé:</label>
                      <input v-model="editData.color" class="edit-input" style="width: 100%;" placeholder="Couleur ou dégradé" />
                    </div>
                  </td>
                  <td>
                    <div class="logo-edit mb-2">
                      <span class="text-xs">Picto:</span>
                      <img v-if="editData.picto" :src="`/uploads/${editData.picto}`" class="logo-thumb" />
                      <input type="file" name="pictoEdit" accept="image/*" class="file-input-sm" />
                    </div>
                    <div class="logo-edit">
                      <span class="text-xs">Image:</span>
                      <img v-if="editData.image" :src="`/uploads/${editData.image}`" class="logo-thumb" />
                      <input type="file" name="imageEdit" accept="image/*" class="file-input-sm" />
                    </div>
                  </td>
                  <td class="text-right">
                    <button @click="saveEdit($event)" :disabled="saving" class="btn-save">Enregistrer</button>
                    <button @click="editingId = null" class="btn-cancel">Annuler</button>
                  </td>
                </template>
                <template v-else>
                  <td>
                    <div class="service-name">{{ part.titre }}</div>
                    <div class="service-desc-preview"><b>Courte:</b> {{ part.description_courte }}</div>
                    <div class="service-desc-preview"><b>Complète:</b> {{ part.description_complete?.substring(0, 50) }}{{ (part.description_complete?.length > 50) ? '...' : '' }}</div>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-xs text-gray-400">Fond:</span>
                      <div class="color-preview" :style="{ background: part.color || '#42B9B5' }"></div>
                      <span class="text-xs truncate" style="max-width: 150px;">{{ part.color || '#42B9B5' }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs text-gray-400">Picto:</span>
                      <img v-if="part.picto" :src="`/uploads/${part.picto}`" class="logo-thumb" />
                      <span v-else class="no-logo">Aucun</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs text-gray-400">Image:</span>
                      <img v-if="part.image" :src="`/uploads/${part.image}`" class="logo-thumb" />
                      <span v-else class="no-logo">Aucune</span>
                    </div>
                  </td>
                  <td class="text-right">
                    <button @click="startEdit(part)" class="btn-edit">Modifier</button>
                    <button @click="deleteParticulier(part.id)" class="btn-del">Supprimer</button>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; background: #f1f5f9; }
.sidebar { width: 220px; background: #1a1a2e; display: flex; flex-direction: column; flex-shrink: 0; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
.sidebar-brand { display: flex; align-items: center; gap: 0.75rem; padding: 1.25rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
.sidebar-logo { width: 36px; height: 36px; background: linear-gradient(135deg, #e91e8c, #9c1b5e); border-radius: 9px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.8rem; color: #fff; flex-shrink: 0; }
.sidebar-title { font-weight: 700; font-size: 0.82rem; color: #fff; margin: 0; line-height: 1.2; }
.sidebar-subtitle { font-size: 0.68rem; color: rgba(255,255,255,0.4); margin: 0; }
.sidebar-nav { flex: 1; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.15rem; }
.nav-section-label { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); padding: 0.5rem 0.6rem 0.25rem; margin: 0; }
.nav-item { display: flex; align-items: center; gap: 0.55rem; padding: 0.55rem 0.8rem; border-radius: 7px; font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.5); transition: all 0.2s; text-decoration: none; }
.nav-item svg { width: 17px; height: 17px; flex-shrink: 0; }
.nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
.nav-item.active { background: rgba(233,30,140,0.2); color: #f472b6; }
.logout-btn { background: none; border: none; cursor: pointer; width: 100%; text-align: left; color: rgba(255,100,100,0.65); }
.logout-btn:hover { background: rgba(239,68,68,0.12); color: #f87171; }

.main-content { flex: 1; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; max-width: 960px; }
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
.field.basis-full { flex: 0 0 100%; }
.field label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
.field input[type="text"], .field textarea { padding: 0.65rem 0.85rem; border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
.field input[type="text"]:focus, .field textarea:focus { border-color: #e91e8c; box-shadow: 0 0 0 3px rgba(233,30,140,0.08); background: #fff; }
.mb-2 { margin-bottom: 0.5rem; }
.file-input { font-size: 0.8rem; color: #475569; }
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
.service-name { font-weight: 600; color: #1e293b; margin-bottom: 0.2rem; }
.service-desc-preview { font-size: 0.75rem; color: #64748b; line-height: 1.4; }
.logo-thumb { width: 32px; height: 32px; object-fit: contain; border-radius: 6px; background: #f8fafc; border: 1px solid #e2e8f0; display: inline-block; vertical-align: middle; }
.no-logo { font-size: 0.75rem; color: #cbd5e1; }
.edit-input { padding: 0.45rem 0.7rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #1e293b; outline: none; }
.logo-edit { display: flex; align-items: center; gap: 0.5rem; }
.file-input-sm { font-size: 0.72rem; color: #64748b; width: 100px; }
.btn-save { font-size: 0.75rem; font-weight: 700; color: #16a34a; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 0.3rem 0.65rem; cursor: pointer; margin-right: 0.4rem; transition: all 0.15s; }
.btn-cancel { font-size: 0.75rem; font-weight: 600; color: #94a3b8; background: none; border: none; cursor: pointer; }
.btn-edit { font-size: 0.75rem; font-weight: 700; color: #2563eb; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 0.3rem 0.65rem; cursor: pointer; margin-right: 0.4rem; transition: all 0.15s; }
.btn-del { font-size: 0.75rem; font-weight: 700; color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 0.3rem 0.65rem; cursor: pointer; transition: all 0.15s; }
.empty-state { padding: 2.5rem; text-align: center; color: #94a3b8; font-size: 0.875rem; }

.flex { display: flex; }
.items-center { align-items: center; }
.gap-2 { gap: 0.5rem; }
.text-xs { font-size: 0.75rem; }
.text-gray-400 { color: #9ca3af; }
.mb-1 { margin-bottom: 0.25rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.font-bold { font-weight: 700; }
.block { display: block; }
.color-preview { width: 16px; height: 16px; border-radius: 4px; border: 1px solid #e2e8f0; }
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
