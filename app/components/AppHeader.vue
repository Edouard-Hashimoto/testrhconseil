<template>
  <header class="site-header">
    <div class="header-inner">
      <NuxtLink to="/" class="logo-link">
        <img src="~/assets/img/RHC_RVB.jpg" alt="RH Conseil 71" class="logo" />
      </NuxtLink>

      <nav class="main-nav" aria-label="Navigation principale">
        <ul class="nav-list">
          <li><NuxtLink to="/presentation" class="nav-link">Qui sommes-nous ?</NuxtLink></li>
          <li class="nav-item-dropdown">
            <NuxtLink to="#" class="nav-link dropdown-trigger">
              Que faisons-nous ?
              <svg class="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </NuxtLink>
            <ul class="dropdown-menu">
              <li v-for="service in services" :key="service.id">
                <NuxtLink :to="`/services/${service.id}`" class="dropdown-link">
                  {{ service.title }}
                </NuxtLink>
              </li>
            </ul>
          </li>
          <li><NuxtLink to="/particuliers" class="nav-link">Particuliers</NuxtLink></li>
          <li><NuxtLink to="/offres-emplois" class="nav-link">Offres d'emplois</NuxtLink></li>
          <li><NuxtLink to="/contact" class="nav-link">Contact</NuxtLink></li>
        </ul>
      </nav>

      <button class="burger" :class="{ 'active': menuOpen }" @click="menuOpen = !menuOpen" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

      <nav class="mobile-nav" :class="{ open: menuOpen }" aria-label="Navigation mobile">
      <ul class="mobile-nav-list">
        <li><NuxtLink to="/presentation" class="mobile-nav-link" @click="menuOpen = false">Qui sommes-nous ?</NuxtLink></li>
        <li class="mobile-has-sub">
          <button class="mobile-nav-link mobile-sub-trigger" @click="servicesOpen = !servicesOpen">
            Que faisons-nous ?
            <span class="plus-minus">{{ servicesOpen ? '−' : '+' }}</span>
          </button>
          <ul v-show="servicesOpen" class="mobile-sub-nav">
            <li v-for="service in services" :key="service.id">
              <NuxtLink :to="`/services/${service.id}`" class="mobile-sub-link" @click="menuOpen = false">
                {{ service.title }}
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li><NuxtLink to="/particuliers" class="mobile-nav-link" @click="menuOpen = false">Particuliers</NuxtLink></li>
        <li><NuxtLink to="/offres-emplois" class="mobile-nav-link" @click="menuOpen = false">Offres d'emplois</NuxtLink></li>
        <li><NuxtLink to="/contact" class="mobile-nav-link" @click="menuOpen = false">Contact</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
const menuOpen = ref(false)
const servicesOpen = ref(false)
const { data: services } = await useFetch('/api/services')
</script>

<style scoped>
.site-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}


.logo-link {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo {
  height: 50px;
  width: auto;
  object-fit: contain;
}

/* Navigation desktop */
.main-nav {
  display: flex;
  align-items: center;
}

.nav-list {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  font-family: var(--font-body, 'Poppins', sans-serif);
  font-size: 0.92rem;
  font-weight: 400;
  color: #2d3748;
  padding: 0.5rem 0.85rem;
  border-radius: 6px;
  transition: color 0.2s ease, background-color 0.2s ease;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #BA0F60;
}

/* Dropdown logic */
.nav-item-dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.nav-item-dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 260px;
  background: #ffffff;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 0.75rem 0;
  margin-top: 5px;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1000;
}

.nav-item-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-link {
  display: block;
  padding: 0.7rem 1.5rem;
  color: #2d3748;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s;
  white-space: normal;
}

.dropdown-link:hover {
  background-color: #f7f9fc;
  color: #e91e8c;
  padding-left: 1.8rem;
}

.dropdown-cat-header {
  padding: 0.6rem 1.25rem 0.3rem;
}

.cat-link {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #e91e8c;
  text-decoration: none;
  transition: opacity 0.2s;
}

.cat-link:hover {
  opacity: 0.8;
}

.sub-link {
  padding-left: 2rem;
  font-size: 0.9rem;
}

.dropdown-divider {
  height: 1px;
  background: #f0f0f0;
  margin: 0.5rem 0;
}

.mobile-cat-header {
  padding: 0.75rem 0.5rem 0.25rem;
}

.mobile-cat-header a {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #e91e8c;
  text-decoration: none;
}

.pl-6 {
  padding-left: 1.5rem !important;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.burger span {
  display: block;
  width: 26px;
  height: 2px;
  background-color: #2d3748;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center right;
}

.burger.active span:nth-child(1) {
  transform: rotate(-45deg);
}

.burger.active span:nth-child(2) {
  opacity: 0;
}

.burger.active span:nth-child(3) {
  transform: rotate(45deg);
}

.mobile-nav {
  display: none;
  background: #ffffff;
  border-top: 1px solid #e8e8e8;
  overflow-y: auto;
  max-height: 0;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-nav.open {
  max-height: 85vh; /* Largement assez pour tout voir */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.mobile-nav-list {
  list-style: none;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  font-family: var(--font-body, 'Poppins', sans-serif);
  font-size: 1rem;
  color: #2d3748;
  padding: 0.6rem 0;
  border-bottom: 1px solid #f0f0f0;
  display: block;
  transition: color 0.2s ease;
}

.mobile-nav-link:hover {
  color: #e91e8c;
}

.mobile-sub-trigger {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: inherit;
  cursor: pointer;
}

.plus-minus {
  font-size: 1.2rem;
  font-weight: 300;
}

.mobile-sub-nav {
  list-style: none;
  padding-left: 1rem;
  background: #fcfcfc;
  margin-bottom: 0.5rem;
}

.mobile-sub-link {
  display: block;
  padding: 0.6rem 0.5rem;
  font-size: 0.9rem;
  color: #4a5568;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
}

@media (max-width: 900px) {
  .main-nav {
    display: none;
  }

  .burger {
    display: flex;
  }

  .mobile-nav {
    display: block;
  }
}
</style>
