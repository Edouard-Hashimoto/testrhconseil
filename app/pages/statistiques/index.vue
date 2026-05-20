<script setup>
const { data: statistics } = await useFetch('/api/statistics')

useHead({
  title: 'Statistiques - RH Conseil 71',
  meta: [{ name: 'description', content: 'Découvrez les statistiques clés de RH Conseil 71.' }]
})

const accentColors = ['#BA0F60', '#42B9B5', '#C8D400', '#E63E81', '#662D62', '#F7A600']

const getAccent = (idx) => accentColors[idx % accentColors.length]

const parseStatText = (htmlText) => {
  if (!htmlText) return []
  
  const sections = []
  let currentSection = null
  
  const blockRegex = /<(p|ul|h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi
  let match
  
  while ((match = blockRegex.exec(htmlText)) !== null) {
    const tag = match[1].toLowerCase()
    const content = match[2].trim()
    const plainText = content.replace(/<[^>]*>/g, '').trim()
    
    if (!plainText) continue
    
    if (tag === 'p' || tag.startsWith('h')) {
      const isHeader = plainText.endsWith(':') || 
                       tag.startsWith('h') ||
                       ((content.startsWith('<strong>') || content.startsWith('<b>')) && 
                        (content.endsWith('</strong>') || content.endsWith('</b>')) && 
                        plainText.length < 60)
      
      if (isHeader) {
        if (currentSection) {
          sections.push(currentSection)
        }
        currentSection = {
          title: plainText.replace(/:$/, ''),
          items: [],
          paragraphText: ''
        }
      } else {
        if (!currentSection) {
          currentSection = { title: '', items: [], paragraphText: '' }
        }
        if (currentSection.paragraphText) {
          currentSection.paragraphText += '<br>' + content
        } else {
          currentSection.paragraphText = content
        }
      }
    } else if (tag === 'ul') {
      if (!currentSection) {
        currentSection = { title: '', items: [], paragraphText: '' }
      }
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi
      let liMatch
      while ((liMatch = liRegex.exec(content)) !== null) {
        const liContent = liMatch[1].trim()
        if (liContent) {
          currentSection.items.push(liContent)
        }
      }
    }
  }
  
  if (currentSection) {
    sections.push(currentSection)
  }
  
  if (sections.length === 0) {
    sections.push({
      title: '',
      items: [],
      paragraphText: htmlText
    })
  }
  
  return sections
}

const parseMetric = (itemText) => {
  const cleanText = itemText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  
  const splitColon = cleanText.split(':')
  if (splitColon.length === 2) {
    const label = splitColon[0].trim()
    const value = splitColon[1].trim()
    if (/\d/.test(value)) {
      return { label, value, isMetric: true }
    }
  }
  
  const numStartMatch = cleanText.match(/^([\d\s.,/]+(?:%|€|k|ans?)?)\s+(.+)$/i)
  if (numStartMatch) {
    const value = numStartMatch[1].trim()
    const label = numStartMatch[2].trim()
    if (/\d/.test(value) && label.length > 2) {
      return { label, value, isMetric: true }
    }
  }
  
  return { label: itemText, value: '', isMetric: false }
}

const getMetricProgress = (value) => {
  if (!value) return null
  if (value.includes('%')) {
    const val = parseFloat(value.replace(/[^0-9.]/g, ''))
    if (!isNaN(val)) return { type: 'percent', percent: Math.min(val, 100) }
  }
  if (value.includes('/10')) {
    const val = parseFloat(value.split('/')[0])
    if (!isNaN(val)) return { type: 'rating10', percent: Math.min(val * 10, 100), display: value }
  }
  return null
}

const getNumericValue = (valStr) => {
  if (!valStr) return 0
  if (valStr.includes('/10')) {
    const parsed = parseFloat(valStr.split('/')[0])
    return isNaN(parsed) ? 0 : parsed
  }
  const match = valStr.match(/(\d+(?:\.\d+)?)/)
  if (match) {
    const parsed = parseFloat(match[1])
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

const metricCounters = ref({})
const cardRefs = ref([])
const visibleCards = ref(new Set())

const animateMetricCounter = (key, target, duration = 1500, hasDecimal = false) => {
  const start = performance.now()
  const step = (now) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    const currentVal = eased * target
    
    if (hasDecimal) {
      metricCounters.value[key] = currentVal.toFixed(1)
    } else {
      metricCounters.value[key] = Math.round(currentVal)
    }
    
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const formatAnimatedValue = (originalValue, animatedVal) => {
  if (animatedVal === undefined || animatedVal === null) return originalValue
  if (originalValue.includes('/10')) {
    return `${animatedVal}/10`
  }
  if (originalValue.includes('%')) {
    return `${animatedVal}%`
  }
  const match = originalValue.match(/^[\d\s.,/]+(.*)$/)
  const suffix = match ? match[1] : ''
  return `${animatedVal}${suffix}`
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.statId
        if (id && !visibleCards.value.has(id)) {
          visibleCards.value.add(id)
          entry.target.classList.add('visible')
          
          const stat = statistics.value?.find(s => String(s.id) === id)
          if (stat) {
            const sections = parseStatText(stat.text)
            sections.forEach((section, sIdx) => {
              if (section.items) {
                section.items.forEach((item, iIdx) => {
                  const parsed = parseMetric(item)
                  if (parsed.isMetric) {
                    const key = `${id}-${sIdx}-${iIdx}`
                    const target = getNumericValue(parsed.value)
                    const hasDecimal = parsed.value.includes('.') || (parsed.value.includes('/') && parsed.value.split('/')[0].includes('.'));
                    animateMetricCounter(key, target, 1500, hasDecimal)
                  }
                })
              }
            })
          }
        }
      }
    })
  }, { threshold: 0.1 })

  cardRefs.value.forEach(el => { if (el) observer.observe(el) })
})
</script>

<template>
  <div class="stats-page">

    <section class="stats-hero">
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>
      <div class="hero-content">
        <span class="hero-eyebrow">Chiffres clés</span>
        <h1 class="hero-title">Nos Statistiques</h1>
        <p class="hero-sub">Des résultats concrets et transparents qui témoignent de notre accompagnement de qualité.</p>
      </div>
      <div class="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-bg, #EEEEEE)"/>
        </svg>
      </div>
    </section>

    <section class="stats-section">
      <div class="stats-inner">

        <div v-if="!statistics || statistics.length === 0" class="empty-state">
          Aucune statistique disponible pour le moment.
        </div>

        <div v-else class="stats-container">
          <div
            v-for="(stat, idx) in statistics"
            :key="stat.id"
            :ref="el => cardRefs[idx] = el"
            :data-stat-id="String(stat.id)"
            class="stat-card-wrapper"
          >
            <div class="stat-image-header" v-if="stat.image">
              <div class="stat-image-blur-bg" :style="{ backgroundImage: `url(${useAssetUrl(stat.image, 'stats')})` }"></div>
              <img :src="useAssetUrl(stat.image, 'stats')" :alt="stat.title" class="stat-image-main" />
            </div>

            <div class="stat-card-body">
              <h2 class="stat-card-title">{{ stat.title }}</h2>
              
              <div class="stat-sections-container">
                <div 
                  v-for="(section, sIdx) in parseStatText(stat.text)" 
                  :key="sIdx" 
                  class="stat-section-block"
                >
                  <h3 class="stat-section-title" v-if="section.title">
                    <span class="title-bullet" :style="{ backgroundColor: getAccent(sIdx) }"></span>
                    {{ section.title }}
                  </h3>
                  
                  <div class="stat-section-para" v-if="section.paragraphText" v-html="section.paragraphText"></div>
                  
                  <div class="stat-metrics-grid" v-if="section.items && section.items.length > 0">
                    <div 
                      v-for="(item, iIdx) in section.items" 
                      :key="iIdx"
                      :class="[
                        'metric-card', 
                        parseMetric(item).isMetric 
                          ? (getMetricProgress(parseMetric(item).value) ? 'metric-card--radial' : 'metric-card--number')
                          : 'metric-card--flat'
                      ]"
                      :style="{ '--accent': getAccent(sIdx + iIdx) }"
                    >
                      <template v-if="parseMetric(item).isMetric && getMetricProgress(parseMetric(item).value)">
                        <div class="metric-radial-wrap">
                          <svg class="metric-radial" viewBox="0 0 36 36">
                            <path
                              class="circle-bg"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#EEEEEE"
                              stroke-width="3"
                            />
                            <path
                              class="circle"
                              :stroke-dasharray="`${getMetricProgress(parseMetric(item).value).percent}, 100`"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              :stroke="getAccent(sIdx + iIdx)"
                              stroke-width="3"
                              stroke-linecap="round"
                            />
                          </svg>
                          <div class="metric-radial-value">
                            {{ formatAnimatedValue(parseMetric(item).value, metricCounters[`${stat.id}-${sIdx}-${iIdx}`]) }}
                          </div>
                        </div>
                        <div class="metric-radial-label" v-html="parseMetric(item).label"></div>
                      </template>

                      <template v-else-if="parseMetric(item).isMetric">
                        <div class="metric-value">
                          {{ formatAnimatedValue(parseMetric(item).value, metricCounters[`${stat.id}-${sIdx}-${iIdx}`]) }}
                        </div>
                        <div class="metric-label" v-html="parseMetric(item).label"></div>
                      </template>

                      <template v-else>
                        <div class="metric-bullet-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <div class="metric-text" v-html="item"></div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.stats-page {
  padding-top: 0;
  background-color: var(--color-bg, #EEEEEE);
  min-height: 100vh;
}

.stats-hero {
  position: relative;
  width: 100%;
  padding: 8rem 2rem 9rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #662D62 0%, #1a1a2e 100%);
}

.hero-glow-1 {
  position: absolute;
  top: -20%;
  left: -10%;
  width: 50%;
  height: 80%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(186, 15, 96, 0.25) 0%, transparent 75%);
  filter: blur(40px);
  pointer-events: none;
  animation: floatGlow 20s infinite alternate;
}

.hero-glow-2 {
  position: absolute;
  bottom: -20%;
  right: -10%;
  width: 50%;
  height: 80%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(66, 185, 181, 0.18) 0%, transparent 75%);
  filter: blur(45px);
  pointer-events: none;
  animation: floatGlow 25s infinite alternate-reverse;
}

@keyframes floatGlow {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(5%, 5%) scale(1.1); }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
}

.hero-eyebrow {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #BA0F60;
  background: rgba(186, 15, 96, 0.12);
  border: 1px solid rgba(186, 15, 96, 0.25);
  margin-bottom: 1.5rem;
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  color: #fff;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  margin: 0 0 1.25rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.hero-sub {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
}

.hero-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 2;
}

.hero-wave svg {
  width: 100%;
  height: 100%;
  display: block;
}

.stats-section {
  padding: 5rem 0 8rem;
}

.stats-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.empty-state {
  text-align: center;
  font-size: 1.25rem;
  color: #64748b;
  padding: 6rem;
  background: #fff;
  border-radius: 20px;
  border: 1px dashed #EEEEEE;
}

.stats-container {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.stat-card-wrapper {
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
  border: 1px solid #EEEEEE;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.stat-card-wrapper.visible {
  opacity: 1;
  transform: translateY(0);
}

.stat-card-wrapper:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 5px rgba(0, 0, 0, 0.03);
}

.stat-image-header {
  position: relative;
  width: 100%;
  height: 380px;
  overflow: hidden;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #EEEEEE;
}

.stat-image-blur-bg {
  position: absolute;
  inset: -20px;
  background-size: cover;
  background-position: center;
  filter: blur(25px) brightness(0.95);
  opacity: 0.25;
  z-index: 0;
}

.stat-image-main {
  position: relative;
  z-index: 1;
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.08));
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.stat-card-wrapper:hover .stat-image-main {
  transform: scale(1.03);
}

.stat-card-body {
  padding: 3.5rem;
}

.stat-card-title {
  font-size: 2.25rem;
  font-weight: 850;
  color: #0f172a;
  margin: 0 0 2.5rem;
  letter-spacing: -0.03em;
  position: relative;
  display: inline-block;
}

.stat-card-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 60px;
  height: 4px;
  background: #BA0F60;
  border-radius: 2px;
}

.stat-sections-container {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.stat-section-block {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stat-section-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0;
  letter-spacing: -0.01em;
}

.title-bullet {
  width: 6px;
  height: 22px;
  border-radius: 3px;
}

.stat-section-para {
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.6;
}

.stat-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.metric-card {
  background: #f8fafc;
  border: 1px solid #EEEEEE;
  border-radius: 20px;
  padding: 1.8rem;
  display: flex;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.04);
  background: #ffffff;
  border-color: var(--accent);
}

.metric-card--number {
  flex-direction: column;
  gap: 0.6rem;
  border-top: 4px solid var(--accent);
}

.metric-value {
  font-size: 2.75rem;
  font-weight: 900;
  color: var(--accent);
  letter-spacing: -0.03em;
  line-height: 1;
}

.metric-label {
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.5;
  font-weight: 600;
}

.metric-card--radial {
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  border-left: 4px solid var(--accent);
}

.metric-radial-wrap {
  position: relative;
  width: 72px;
  height: 72px;
  flex-shrink: 0;
}

.metric-radial {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circle-bg {
  stroke: #EEEEEE;
}

.circle {
  transition: stroke-dasharray 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.metric-radial-value {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 850;
  color: #0f172a;
}

.metric-radial-label {
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.5;
  font-weight: 600;
  flex: 1;
}

.metric-card--flat {
  grid-column: 1 / -1;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.75rem;
  border-left: 4px solid var(--accent);
  background: #f8fafc;
}

.metric-bullet-icon {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  background: rgba(71, 85, 105, 0.08);
  border-radius: 50%;
}

.metric-bullet-icon svg {
  width: 12px;
  height: 12px;
  color: var(--accent);
}

.metric-text {
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.55;
}

.metric-text :deep(strong) {
  font-weight: 750;
  color: #1e293b;
}

@media (max-width: 1024px) {
  .stat-card-body {
    padding: 2.5rem;
  }
  
  .stat-image-header {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .stats-hero {
    padding: 6rem 1.5rem 7rem;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .stats-section {
    padding: 3rem 0 5rem;
  }
  
  .stats-inner {
    padding: 0 1rem;
  }
  
  .stat-card-body {
    padding: 2rem 1.5rem;
  }
  
  .stat-card-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  
  .stat-image-header {
    height: 220px;
  }
  
  .stat-metrics-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .metric-card--radial {
    gap: 1.25rem;
  }
}
</style>


