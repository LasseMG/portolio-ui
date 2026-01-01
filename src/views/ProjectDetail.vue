<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { projects } from '../data/projects'

const route = useRoute()
const router = useRouter()

const project = computed(() => {
  const id = route.params.id as string
  return projects.find(p => p.id === id)
})

const projectStyles = computed(() => {
  if (!project.value?.color) return {}

  return {
    '--project-color': project.value.color,
    '--project-color-light': project.value.color + '20', // 20 = ~12% opacity in hex
    '--project-color-lighter': project.value.color + '10', // 10 = ~6% opacity in hex
  }
})

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  if (!project.value) {
    router.push('/')
  }
})
</script>

<template>
  <div v-if="project" class="project-detail" :style="projectStyles">
    <div class="detail-container">
      <div class="detail-header">
        <Button
          icon="pi pi-arrow-left"
          label="Tilbage"
          text
          class="back-button"
          @click="goBack"
        />
      </div>

      <div class="detail-content glass-card">
        <div class="content-header">
          <h1 class="project-title gradient-text">{{ project.title }}</h1>
          <div v-if="project.technologies" class="tags-container">
            <Tag
              v-for="tag in project.technologies"
              :key="tag"
              :value="tag"
              severity="secondary"
              class="tag"
            />
          </div>
        </div>

        <div class="content-body">
          <p class="project-description">{{ project.description }}</p>

          <div class="project-details">
            <div v-if="project.detailedDescription">
              <h2 class="section-title">Detaljeret beskrivelse</h2>
              <p class="section-text detailed-description">{{ project.detailedDescription }}</p>
            </div>

            <div v-if="project.highlights && project.highlights.length > 0">
              <h2 class="section-title">Projektets highlights</h2>
              <div class="highlights-grid">
                <div v-for="highlight in project.highlights" :key="highlight.name" class="highlight-card">
                  <h3 class="highlight-name">{{ highlight.name }}</h3>
                  <p class="highlight-description">{{ highlight.description }}</p>
                </div>
              </div>
            </div>

            <div v-if="project.technologies && project.technologies.length > 0">
              <h2 class="section-title">Teknologier anvendt</h2>
              <div class="tech-list">
                <div v-for="tech in project.technologies" :key="tech" class="tech-item">
                  <i class="pi pi-check-circle"></i>
                  <span>{{ tech }}</span>
                </div>
              </div>
            </div>

            <div v-if="project.features && project.features.length > 0">
              <h2 class="section-title">Essentielle features</h2>
              <ul class="features-list">
                <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>

            <div v-if="project.url || project.githubUrl" class="project-url-section">
              <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer" class="project-url-link">
                <i class="pi pi-external-link"></i>
                <span>Se live website</span>
              </a>
              <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="project-url-link">
                <i class="pi pi-github"></i>
                <span>Se projekt på GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-detail {
  min-height: 100vh;
  padding: 2rem;
}

.detail-container {
  max-width: 900px;
  margin: 0 auto;
}

.detail-header {
  margin-bottom: 2rem;
}

.back-button {
  color: var(--text-secondary) !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
}

.back-button:hover {
  color: var(--text-primary) !important;
  transform: translateX(-4px);
}

.detail-content {
  padding: 0;
  overflow: visible;
}

.content-header {
  padding: 2.5rem 2.5rem 2.5rem 2.5rem;
  overflow: visible;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-left: 4px solid var(--project-color, var(--accent-primary));
}

.project-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  padding-bottom: 0.25rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.project-title.gradient-text {
  background: linear-gradient(135deg, var(--project-color, var(--accent-primary)) 0%, var(--project-color, var(--accent-secondary)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: var(--text-secondary) !important;
  font-size: 0.9rem !important;
  padding: 0.4rem 1rem !important;
}

.content-body {
  padding: 3rem;
}

.project-description {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 3rem;
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.project-details > div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.section-text {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1rem;
}

.detailed-description {
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-left: 3px solid var(--project-color, var(--accent-primary));
  border-radius: 8px;
  font-size: 0.95rem;
  line-height: 1.9;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.highlight-card {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.highlight-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--project-color, linear-gradient(180deg, var(--accent-primary), var(--accent-secondary)));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.highlight-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.highlight-card:hover::before {
  opacity: 1;
}

.highlight-name {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.highlight-name::before {
  content: '▸';
  color: var(--project-color, var(--accent-primary));
  font-size: 1.25rem;
}

.highlight-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0;
}

.tech-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-hover);
  transform: translateX(4px);
}

.tech-item i {
  color: var(--project-color, var(--accent-primary));
  font-size: 1.1rem;
}

.features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.features-list li {
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid var(--project-color, var(--accent-primary));
  border-radius: 4px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.features-list li:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(8px);
}

.project-url-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-url-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--project-color-lighter, linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(123, 47, 247, 0.1) 100%));
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.project-url-link:hover {
  background: var(--project-color-light, linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(123, 47, 247, 0.15) 100%));
  border-color: var(--border-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.project-url-link i {
  font-size: 1.1rem;
  color: var(--project-color, var(--accent-primary));
}

@media (max-width: 768px) {
  .project-detail {
    padding: 1rem;
  }

  .content-header {
    padding: 1.5rem 1.25rem 1.25rem 1.25rem;
  }

  .project-title {
    font-size: 1.75rem;
    line-height: 1.3;
  }

  .content-body {
    padding: 1.5rem 1.25rem;
  }

  .project-description {
    font-size: 1rem;
  }

  .detailed-description {
    padding: 1rem;
    font-size: 0.9rem;
    line-height: 1.8;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .highlights-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .highlight-card {
    padding: 1.25rem;
  }

  .highlight-name {
    font-size: 1.05rem;
  }

  .highlight-description {
    font-size: 0.9rem;
  }

  .tech-list {
    grid-template-columns: 1fr;
  }

  .features-list li {
    padding: 0.875rem 1.25rem;
  }

  .project-url-link {
    font-size: 0.95rem;
    padding: 0.875rem 1.5rem;
  }
}
</style>
