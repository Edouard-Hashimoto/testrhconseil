<script setup>
definePageMeta({ middleware: 'auth' })

const { data: tables, pending: loadingTables } = await useFetch('/api/admin/db-tables')
const selectedTable = ref(null)
const tableData = ref([])
const loadingData = ref(false)

const selectTable = async (tableName) => {
  selectedTable.value = tableName
  loadingData.value = true
  try {
    tableData.value = await $fetch(`/api/admin/db-data?table=${tableName}`)
  } catch (e) {
    alert("Erreur lors du chargement des données")
  } finally {
    loadingData.value = false
  }
}

const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    navigateTo('/admin/login')
  } catch (e) {
    alert("Erreur lors de la déconnexion")
  }
}

const initializing = ref(false)
const runInitDb = async () => {
  if (!confirm("Cette opération va vérifier et créer les tables manquantes. Continuer ?")) return
  initializing.value = true
  try {
    const res = await $fetch('/api/admin/init-db')
    alert(res.message || "Initialisation réussie")
    const { data: updatedTables } = await useFetch('/api/admin/db-tables')
    if (updatedTables.value) tables.value = updatedTables.value
  } catch (e) {
    alert("Erreur lors de l'initialisation")
  } finally {
    initializing.value = false
  }
}

const columns = computed(() => {
  if (!tableData.value || tableData.value.length === 0) return []
  return Object.keys(tableData.value[0])
})
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
        <NuxtLink to="/admin/database" class="nav-item active">
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

    <!-- Main: sidebar + content -->
    <div class="db-main">
      <!-- Tables list -->
      <div class="table-sidebar">
        <p class="table-sidebar-label">Tables</p>
        <div v-if="loadingTables" class="table-loading">
          <div class="spinner"></div>
        </div>
        <button
          v-for="table in tables"
          :key="table.name"
          @click="selectTable(table.name)"
          class="table-btn"
          :class="{ active: selectedTable === table.name }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c0 .621.504 1.125 1.125 1.125m2.25-2.25c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M3.375 15.75c-.621 0-1.125.504-1.125 1.125m17.25-1.125c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125m1.125-2.625H13.125m7.5 0c0 .621-.504 1.125-1.125 1.125M13.125 15.75c-.621 0-1.125.504-1.125 1.125v1.5" /></svg>
          {{ table.name }}
        </button>
      </div>

      <!-- Table data -->
      <main class="table-content">
        <div v-if="!selectedTable" class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="empty-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
          </svg>
          <p>Sélectionnez une table dans le menu de gauche</p>
        </div>

        <template v-else>
          <div class="content-header">
            <div>
              <h2 class="content-title">{{ selectedTable }}</h2>
            </div>
            <div class="header-actions">
              <button @click="runInitDb" class="btn-init" :disabled="initializing">
                <span v-if="initializing" class="spinner-tiny"></span>
                Vérifier/Initialiser les tables
              </button>
              <span class="row-badge">{{ tableData.length }} ligne(s)</span>
            </div>
          </div>

          <div class="table-wrap">
            <div v-if="loadingData" class="loading-state">
              <div class="spinner"></div>
              <p>Chargement...</p>
            </div>
            <div v-else-if="tableData.length === 0" class="empty-table">Table vide</div>
            <div v-else class="overflow-x-auto">
              <table class="data-table">
                <thead>
                  <tr>
                    <th v-for="col in columns" :key="col">{{ col }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, idx) in tableData" :key="idx">
                    <td v-for="col in columns" :key="col">
                      <div class="cell-value" :title="String(row[col])">{{ row[col] }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
}

.sidebar {
  width: 220px;
  background: #1a1a2e;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.sidebar-logo {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, #e91e8c, #9c1b5e);
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 0.8rem; color: #fff; flex-shrink: 0;
}

.sidebar-title { font-weight: 700; font-size: 0.82rem; color: #fff; margin: 0; line-height: 1.2; }
.sidebar-subtitle { font-size: 0.68rem; color: rgba(255,255,255,0.4); margin: 0; }

.sidebar-nav { flex: 1; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.15rem; }

.nav-section-label {
  font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.1em; color: rgba(255,255,255,0.3);
  padding: 0.5rem 0.6rem 0.25rem; margin: 0;
}

.nav-item {
  display: flex; align-items: center; gap: 0.55rem;
  padding: 0.55rem 0.8rem; border-radius: 7px;
  font-size: 0.82rem; font-weight: 500;
  color: rgba(255,255,255,0.5); transition: all 0.2s; text-decoration: none;
}
.nav-item svg { width: 17px; height: 17px; flex-shrink: 0; }
.nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
.nav-item.active { background: rgba(233,30,140,0.2); color: #f472b6; }
.logout-btn { background: none; border: none; cursor: pointer; width: 100%; text-align: left; color: rgba(255,100,100,0.65); }
.logout-btn:hover { background: rgba(239,68,68,0.12); color: #f87171; }

.sidebar-logout {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.8rem 1rem; border-top: 1px solid rgba(255,255,255,0.08);
  background: none; border-left: none; border-right: none; border-bottom: none;
  color: rgba(255,255,255,0.35); font-size: 0.82rem; cursor: pointer; transition: color 0.2s; width: 100%;
}
.sidebar-logout svg { width: 17px; height: 17px; }
.sidebar-logout:hover { color: #f87171; }

.db-main {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 100vh;
}

.table-sidebar {
  width: 220px;
  background: #fff;
  border-right: 1px solid #e2e8f0;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  overflow-y: auto;
}

.table-sidebar-label {
  font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.09em; color: #94a3b8; margin: 0 0 0.25rem 0.25rem;
}

.table-loading { display: flex; justify-content: center; padding: 1rem; }

.table-btn {
  display: flex; align-items: center; gap: 0.5rem;
  width: 100%; padding: 0.55rem 0.7rem; border-radius: 8px;
  font-size: 0.82rem; font-weight: 500; color: #475569;
  background: none; border: none; cursor: pointer; transition: all 0.2s; text-align: left;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.table-btn svg { flex-shrink: 0; opacity: 0.5; width: 14px; height: 14px; }
.table-btn:hover { background: #f8fafc; color: #1e293b; }
.table-btn.active { background: #eff6ff; color: #2563eb; font-weight: 700; }
.table-btn.active svg { opacity: 1; }

.table-content { flex: 1; padding: 1.5rem; overflow: auto; display: flex; flex-direction: column; gap: 1rem; }

.empty-state {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 0.75rem; color: #94a3b8; font-size: 0.9rem;
}

.empty-icon { width: 48px; height: 48px; opacity: 0.3; }

.content-header {
  display: flex; align-items: center; justify-content: space-between;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-init {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-init:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #e91e8c;
  color: #e91e8c;
}

.btn-init:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-tiny {
  width: 12px;
  height: 12px;
  border: 2px solid rgba(233, 30, 140, 0.2);
  border-top-color: #e91e8c;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.content-title { font-size: 1.3rem; font-weight: 800; color: #0f172a; margin: 0; }

.row-badge {
  background: #f1f5f9; border: 1px solid #e2e8f0; color: #64748b;
  font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 20px;
}

.table-wrap { background: #fff; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; }

.loading-state { padding: 3rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; color: #94a3b8; font-size: 0.875rem; }

.empty-table { padding: 3rem; text-align: center; color: #94a3b8; font-size: 0.875rem; }

.data-table { width: 100%; border-collapse: collapse; }
.data-table thead tr { background: #f8fafc; border-bottom: 1.5px solid #e2e8f0; }
.data-table th { padding: 0.65rem 1rem; text-align: left; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; white-space: nowrap; }
.data-table tbody tr { border-bottom: 1px solid #f1f5f9; transition: background 0.15s; }
.data-table tbody tr:last-child { border-bottom: none; }
.data-table tbody tr:hover { background: #f8fafc; }
.data-table td { padding: 0.65rem 1rem; font-size: 0.85rem; color: #475569; }

.cell-value { max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.spinner { width: 22px; height: 22px; border: 2.5px solid #e2e8f0; border-top-color: #e91e8c; border-radius: 50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
