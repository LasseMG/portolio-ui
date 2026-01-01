<script setup lang="ts">
import ProjectGrid from '../components/ProjectGrid.vue'
import { projects } from '../data/projects'
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title gradient-text">Portfolio</h1>
      <p class="hero-subtitle">Udforsk mine seneste projekter og kreationer</p>
    </section>
    <ProjectGrid :projects="projects" />
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  text-align: center;
  padding: 4rem 2rem 2rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  font-weight: 400;
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1.5rem 1.5rem 1.5rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}
</style>
