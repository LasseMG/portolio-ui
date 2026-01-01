<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

const navigateHome = () => {
  router.push('/')
}
</script>

<template>
  <header class="topbar">
    <div class="topbar-content">
      <h1 class="logo gradient-text" @click="navigateHome">Lasse Gelsbjerg</h1>
      <nav class="nav">
        <Button
          label="Kontakt"
          link
          class="nav-button"
          @click="() => window.location.href = 'mailto:your.email@example.com'"
        />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
}

.topbar-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;
  margin: 0;
}

.logo:hover {
  opacity: 0.8;
}

.nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-button {
  color: var(--text-secondary) !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
}

.nav-button:hover {
  color: var(--text-primary) !important;
}

@media (max-width: 768px) {
  .topbar-content {
    padding: 1rem 1.5rem;
  }

  .logo {
    font-size: 1.25rem;
  }
}
</style>
