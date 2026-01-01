<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'
import type { Project } from '@/types/project'

defineProps<{
  projects: Project[]
}>()
</script>

<template>
  <div class="project-grid">
    <TransitionGroup name="slide-up">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :style="{ transitionDelay: `${index * 0.1}s` }"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .project-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
