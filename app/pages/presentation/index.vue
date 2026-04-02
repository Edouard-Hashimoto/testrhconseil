<script setup>
const { data: equipe } = await useFetch('/api/equipe')

useHead({
  title: 'Qui sommes-nous ? - RH Conseil 71',
  meta: [{ name: 'description', content: 'Découvrez l\'équipe de RH Conseil 71, cabinet RH à taille humaine créé en 2004.' }]
})
</script>

<template>
  <div class="pres-page">

    <section class="pres-hero">
      <img src="~/assets/img/fond_presentation.webp" alt="" class="hero-bg" />
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Qui sommes nous&nbsp;?</h1>
      </div>
    </section>

    <section class="team-section">
      <div class="team-inner">

        <div class="team-img-wrap">
          <div class="deco deco-green"></div>
          <div class="deco deco-pink"></div>
          <img src="~/assets/img/RHC.webp" alt="Équipe RH Conseil 71" class="team-img" />
        </div>

        <div class="team-text">
          <p class="team-desc">
            Une équipe de proximité enthousiaste et solidaire et des experts réactifs et agiles pour vous accompagner dans vos projets&nbsp;!
          </p>
        </div>

      </div>
    </section>

    <section class="members-section">
      <div class="members-inner">
        <div class="members-grid">
          
          <NuxtLink v-for="membre in equipe" :key="membre.id" :to="`/presentation/${membre.id}`" class="member-card">
            <div class="member-photo-wrap">
              <img v-if="membre.image" :src="useAssetUrl(membre.image, 'equipe')" :alt="membre.nom" class="member-photo" />
              <div v-else class="member-photo bg-gray-200"></div>
            </div>
            <div class="member-info">
              <h3 class="member-name">{{ membre.nom }}</h3>
              <p class="member-role">{{ membre.role }}</p>
            </div>
          </NuxtLink>

        </div>
      </div>
    </section>

    <section class="building-section">
      <div class="building-inner">
        <div class="building-text">
          <p>
            Membre du réseau UIMM et INTER-PRO nous apportons notre expertise et notre savoir-faire aux TPE, PME ou groupes avec le souci constant de qualité, satisfaction client, éthique et de professionnalisme.
          </p>
          <p>
            Nous sommes situés au sein de la maison des entreprises 71 à Chalon-sur-Saône, et nous intervenons sur tout le périmètre de la Saône-et-Loire.
          </p>
        </div>
        <div class="building-img-wrap">
          <div class="circle-border">
            <img src="~/assets/img/batiment.jpg" alt="Maison des Entreprises 71" class="building-img" />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.pres-page {
  padding-top: 0;
}

.pres-hero {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #fff;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: 0 3rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.hero-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  margin: 0;
}

.team-section {
  background: var(--color-bg);
  padding: 3rem 0 4rem;
}

.team-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  gap: 5rem;
}

.team-img-wrap {
  position: relative;
  flex: 0 0 380px;
  width: 380px;
}

.deco {
  position: absolute;
  border-radius: 14px;
  z-index: 0;
}

.deco-green {
  width: 130px;
  height: 120px;
  background: rgba(180, 210, 80, 0.35);
  top: -22px;
  right: -22px;
}

.deco-pink {
  width: 110px;
  height: 100px;
  background: rgba(233, 30, 140, 0.15);
  bottom: -22px;
  left: -22px;
}

.team-img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: auto;
  border-radius: 14px;
  display: block;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.team-text {
  flex: 1;
}

.team-desc {
  font-size: 1rem;
  color: #444;
  line-height: 1.8;
  text-align: justify;
  margin: 0;
}

.members-section {
  padding: 6rem 0 4rem;
  background-color: var(--color-bg);
}

.members-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.member-card {
  background: linear-gradient(135deg, rgba(66, 185, 181, 0.45) 0%, rgba(163, 21, 68, 0.45) 100%);
  border-radius: 24px;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.member-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.member-photo-wrap {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2.5rem;
  border: 4px solid #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  background-color: #eee;
}

.member-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  transition: transform 0.5s ease;
}

.member-card:hover .member-photo {
  transform: scale(1.08);
}

.member-info {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.member-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: #222;
  margin: 0;
  letter-spacing: 0.02em;
}

.member-role {
  font-size: 1rem;
  font-weight: 500;
  color: #444;
  margin: 0;
  line-height: 1.5;
}

.building-section {
  padding: 2rem 0 10rem;
  background-color: var(--color-bg);
}

.building-inner {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 4rem;
  display: flex;
  align-items: center;
  gap: 8rem;
}

.building-text {
  flex: 1;
}

.building-text p {
  font-size: 1.1rem;
  color: #444;
  line-height: 1.8;
  margin-bottom: 2rem;
  text-align: justify;
}

.building-text p:last-child {
  margin-bottom: 0;
}

.building-img-wrap {
  flex: 0 0 350px;
  display: flex;
  justify-content: center;
}

.circle-border {
  width: 100%;
  max-width: 330px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  padding: 10px;
  border: 4px solid #42B9B5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1);
}

.building-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

@media (max-width: 1000px) {
  .members-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 900px) {
  .team-inner {
    flex-direction: column;
    gap: 3rem;
    padding: 0 1.5rem;
  }

  .team-img-wrap {
    flex: none;
    width: 100%;
    max-width: 380px;
  }

  .hero-content {
    padding: 0 1.5rem;
  }

  .building-inner {
    flex-direction: column-reverse;
    text-align: center;
    gap: 4rem;
  }
  
  .building-img-wrap {
    flex: none;
    width: 100%;
  }
  
  .circle-border {
    max-width: 320px;
  }

  .building-text p {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .members-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>