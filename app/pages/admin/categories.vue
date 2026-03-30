<script setup>
definePageMeta({ middleware: 'auth' })

const { data: categories, refresh } = await useFetch('/api/categories', { query: { full: true } })

const newCategory = ref({ titre: '', description: '', parent_id: null })
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
    const res = await $fetch('/api/upload-category-image', { method: 'POST', body: form })
    return res.filename
  } finally {
    uploading.value = false
  }
}

const createCategory = async (evt) => {
  const fileInput = evt.target.closest('form').querySelector('input[type="file"]')
  const file = fileInput?.files?.[0]
  saving.value = true
  try {
    let image = null
    if (file) image = await uploadImage(file)
    await $fetch('/api/categories', { method: 'POST', body: { ...newCategory.value, image } })
    newCategory.value = { titre: '', description: '', parent_id: null }
    if (fileInput) fileInput.value = ''
    await refresh()
  } catch (e) {
    alert("Erreur lors de la création")
  } finally {
    saving.value = false
  }
}

const startEdit = (category) => {
  editingId.value = category.id
  editData.value = { ...category }
}

const saveEdit = async (evt) => {
  const fileInput = evt.target.closest('tr')?.querySelector('input[type="file"]')
  const file = fileInput?.files?.[0]
  saving.value = true
  try {
     let image = editData.value.image
    if (file) image = await uploadImage(file)
    await $fetch('/api/categories', { method: 'PUT', body: { ...editData.value, image } })
    editingId.value = null
    await refresh()
  } catch (e) {
    alert("Erreur lors de la sauvegarde")
  } finally {
    saving.value = false
  }
}

const deleteCategory = async (id) => {
  if (!confirm('Supprimer cette catégorie ? Cela déliera les services associés.')) return
  try {
    await $fetch('/api/categories', { method: 'DELETE', body: { id } })
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
        <NuxtLink to="/admin/categories" class="nav-item active">
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
          <h1 class="page-title">Catégories</h1>
          <p class="page-desc">Gérez les catégories de services</p>
        </div>
        <div class="stat-pill">
          <span class="stat-value">{{ categories?.length ?? 0 }}</span>
          <span class="stat-label">catégorie(s)</span>
        </div>
      </header>

      <!-- Form création -->
      <section class="card">
        <h2 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Nouvelle catégorie
        </h2>
        <form @submit.prevent="createCategory" class="form-row">
          <div class="field grow">
            <label>Titre</label>
            <input v-model="newCategory.titre" type="text" placeholder="ex: Recrutement & RH" required />
          </div>
          <div class="field grow">
            <label>Image</label>
            <input type="file" accept="image/*" class="file-input" />
          </div>
          <div class="field grow">
            <label>Catégorie parente</label>
            <select v-model="newCategory.parent_id" class="edit-input">
              <option :value="null">Aucune (Catégorie racine)</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.titre }}</option>
            </select>
          </div>
          <div class="field basis-full">
            <label>Description</label>
            <textarea v-model="newCategory.description" placeholder="Description de la catégorie..." rows="3"></textarea>
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
          Catégories configurées
        </h2>

        <div v-if="!categories || categories.length === 0" class="empty-state">
          Aucune catégorie. Utilisez le formulaire ci-dessus pour en créer une.
        </div>

        <div v-else class="services-table-wrap">
          <table class="services-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Titre / Description</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" :key="category.id">
                <template v-if="editingId === category.id">
                   <td>
                    <div class="logo-edit">
                      <img v-if="editData.image" :src="`/categories/${editData.image}`" class="logo-thumb" />
                      <input type="file" accept="image/*" class="file-input-sm" />
                    </div>
                  </td>
                  <td>
                    <input v-model="editData.titre" class="edit-input mb-1" style="width: 100%;" />
                    <select v-model="editData.parent_id" class="edit-input mb-1" style="width: 100%;">
                      <option :value="null">Aucune</option>
                      <template v-for="cat in categories" :key="cat.id">
                        <option v-if="cat.id !== editData.id" :value="cat.id">
                          {{ cat.titre }}
                        </option>
                      </template>
                    </select>
                    <textarea v-model="editData.description" class="edit-input" style="width: 100%; font-size: 0.8rem;" rows="2"></textarea>
                  </td>
                  <td class="text-right">
                    <button @click="saveEdit($event)" :disabled="saving" class="btn-save">Enregistrer</button>
                    <button @click="editingId = null" class="btn-cancel">Annuler</button>
                  </td>
                </template>
                <template v-else>
                   <td>
                    <img v-if="category.image" :src="`/categories/${category.image}`" class="logo-thumb" />
                    <span v-else class="no-logo">Aucune</span>
                  </td>
                  <td>
                    <div class="service-name">{{ category.titre }}</div>
                    <div class="service-desc-preview">
                      <span v-if="category.parent_titre" class="parent-path">
                        {{ category.parent_titre }} > 
                      </span>
                      {{ category.description?.substring(0, 80) }}{{ (category.description?.length > 80) ? '...' : '' }}
                    </div>
                  </td>
                  <td class="text-right">
                    <button @click="startEdit(category)" class="btn-edit">Modifier</button>
                    <button @click="deleteCategory(category.id)" class="btn-del">Supprimer</button>
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
.field label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
.field input[type="text"] { padding: 0.65rem 0.85rem; border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
.field input[type="text"]:focus { border-color: #e91e8c; box-shadow: 0 0 0 3px rgba(233,30,140,0.08); background: #fff; }
.field textarea { padding: 0.65rem 0.85rem; border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: vertical; }
.field textarea:focus { border-color: #e91e8c; box-shadow: 0 0 0 3px rgba(233,30,140,0.08); background: #fff; }
.field.basis-full { flex: 0 0 100%; }
.mb-2 { margin-bottom: 0.5rem; }
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

.service-name { font-weight: 600; color: #1e293b; margin-bottom: 0.2rem; }
.service-desc-preview { font-size: 0.75rem; color: #64748b; line-height: 1.4; }
.logo-thumb { width: 32px; height: 32px; object-fit: contain; border-radius: 6px; background: #f8fafc; border: 1px solid #e2e8f0; }
.no-logo { font-size: 0.75rem; color: #cbd5e1; }

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
.parent-path { color: #e91e8c; font-weight: 600; font-size: 0.7rem; text-transform: uppercase; }
</style>
