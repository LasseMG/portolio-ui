# Portfolio UI

A modern, minimalistic portfolio website built with Vue 3, TypeScript, and PrimeVue. Features a sleek dark theme with glassmorphism effects, smooth animations, and responsive design.

## Features

- Ultra-sleek dark theme with gradient accents
- Glassmorphism card effects
- Smooth micro-animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Project showcase with grid layout
- Individual project detail pages
- External link support for live projects
- Built with modern Vue 3 Composition API
- TypeScript for type safety
- PrimeVue component library

## Tech Stack

- **Framework**: Vue 3 (Composition API with `<script setup>`)
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: PrimeVue 4
- **Routing**: Vue Router 4
- **Styling**: Custom CSS with CSS Variables
- **Icons**: PrimeIcons

## Project Setup

### Prerequisites

- Node.js 20.x or higher
- npm

### Installation

```sh
npm install
```

### Development

Run the development server with hot-reload:

```sh
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

Build for production with type checking:

```sh
npm run build
```

Build only (without type checking):

```sh
npm run build-only
```

### Preview Production Build

```sh
npm run preview
```

## Docker Deployment

Build and run with Docker:

```sh
# Build the Docker image
docker build -t portfolio-ui .

# Run the container
docker run -p 80:80 portfolio-ui
```

The app will be available at `http://localhost`

## Customization

### Adding Projects

Edit `src/data/projects.ts` to add your projects:

```typescript
{
  id: 'unique-id',
  title: 'Project Name',
  description: 'Project description',
  type: 'internal' | 'external',
  url: 'https://example.com', // for external projects
  tags: ['Vue', 'TypeScript'],
  color: '#00d4ff'
}
```

### Personalizing

1. Update your name in `src/components/TopBar.vue`
2. Update contact email in `src/components/TopBar.vue`
3. Customize colors in `src/assets/base.css`
4. Modify project detail content in `src/views/ProjectDetail.vue`

### Theme Customization

Edit CSS variables in `src/assets/base.css`:

```css
:root {
  --bg-primary: #0a0a0f;
  --accent-primary: #00d4ff;
  --accent-secondary: #7b2ff7;
  /* ... other variables */
}
```

## Project Structure

```
src/
├── assets/          # Global styles
├── components/      # Vue components
│   ├── TopBar.vue
│   ├── ProjectCard.vue
│   └── ProjectGrid.vue
├── data/            # Data files
│   └── projects.ts
├── router/          # Vue Router configuration
├── types/           # TypeScript types
├── views/           # Page components
│   ├── HomeView.vue
│   └── ProjectDetail.vue
└── main.ts          # App entry point
```

## Additional Commands

### Type Checking

```sh
npm run type-check
```

### Linting

```sh
npm run lint
```

### Testing

```sh
npm run test:unit
```

### Format Code

```sh
npm run format
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Browser DevTools

- [Vue.js devtools for Chrome](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Vue.js devtools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
