<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from './components/TopBar.vue'
import { onMounted } from 'vue'

onMounted(() => {
  document.documentElement.classList.add('dark-mode')
})
</script>

<template>
  <div class="app-container">
    <TopBar />
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background: var(--bg-primary);
}

.main-content {
  padding-top: 80px;
  min-height: 100vh;
}
</style>
