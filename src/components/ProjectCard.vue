<script setup lang="ts">
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import type { Project } from '@/types/project'

const props = defineProps<{
  project: Project
}>()

const router = useRouter()

const handleClick = () => {
  if (props.project.type === 'external' && props.project.url) {
    window.open(props.project.url, '_blank')
  } else {
    router.push(`/project/${props.project.id}`)
  }
}
</script>

<template>
  <Card class="project-card glass-card" @click="handleClick">
    <template #header>
      <div class="card-header" :style="{ borderLeft: `4px solid ${project.color}` }">
        <i v-if="project.type === 'external'" class="pi pi-external-link external-icon"></i>
      </div>
    </template>
    <template #title>
      <h2 class="card-title">{{ project.title }}</h2>
    </template>
    <template #content>
      <p class="card-description">{{ project.description }}</p>
      <div v-if="project.technologies" class="tags-container">
        <Tag
          v-for="tag in project.technologies"
          :key="tag"
          :value="tag"
          severity="secondary"
          class="tag"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.project-card {
  cursor: pointer;
  height: 100%;
  min-height: 280px;
  background: var(--glass-bg);
  position: relative;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-8px);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(0, 212, 255, 0.05), transparent 50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.project-card:hover::before {
  opacity: 1;
}

.card-header {
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  justify-content: flex-end;
  min-height: 50px;
}

.external-icon {
  font-size: 1.25rem;
  color: var(--text-tertiary);
  transition: all 0.3s ease;
}

.project-card:hover .external-icon {
  color: var(--accent-primary);
  transform: translate(4px, -4px);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.card-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: var(--text-secondary) !important;
  font-size: 0.8rem !important;
  padding: 0.25rem 0.75rem !important;
}

@media (max-width: 768px) {
  .project-card {
    min-height: 240px;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .card-description {
    font-size: 0.9rem;
  }
}
</style>
