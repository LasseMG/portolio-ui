import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Flowbridge Integration',
    description: 'Simpelt system som foreviser integrationen mellem to ordresystemer.',
    detailedDescription: 'Systemet simulerer en komplet ordre‑pipeline. Order Hub genererer tilfældige ordrer via JavaFaker, og sender dem som events på en RabbitMQ‑kø. Flow Bridge lytter på køen, transformerer ordrerne først til vores Canonical Data Model (CDM) og derefter til FulfillmentX format. Hvert produkt har et særligt ID i hhv. Order Hub og FulfillmentX. Disse mappes via. et mapping table i en PostgreSQL database, som knytter de to tilsvarende IDer sammen. Når ordren er klar, sendes den via HTTP til FulfillmentX. Undervejs publicerer Flow Bridge status‑events (fx ORDER_CREATED, CDM_READY, COMPLETE) til en separat monitoring‑kø. Flow Monitor lytter på denne kø og sender live status‑updates til en webklient via WebSocket. Al intern kommunikation er asynkron via RabbitMQ, bortset fra det sidste synkrone HTTP‑kald til FulfillmentX.',
    technologies: ['Java', 'Spring Boot', 'RabbitMQ', 'PostgreSQL', 'WebSocket'],
    features: [
      'Event-drevet arkitektur med RabbitMQ message queues',
      'Canonical Data Model (CDM) for system-agnostisk data transformation',
      'Produkt ID mapping mellem forskellige systemer via PostgreSQL',
      'Real-time status monitoring med WebSocket broadcasting',
      'Asynkron ordre-processering med status-tracking'
    ],
    color: '#00d4ff',
    githubUrl: 'https://github.com/LasseMG/FlowBridge-Integration',
    highlights: [
      {
        name: 'Order Hub',
        description: 'Genererer tilfældige ordrer med JavaFaker og publicerer dem som events til RabbitMQ-køen'
      },
      {
        name: 'Flow Bridge',
        description: 'Event-drevet transformation service der konverterer ordrer til CDM-format og derefter til FulfillmentX-format. Håndterer også produkt ID mapping'
      },
      {
        name: 'FulfillmentX',
        description: 'Target system der modtager og gemmer transformerede ordrer via HTTP API'
      },
      {
        name: 'Flow Monitor',
        description: 'Overvågningsservice der tracker ordre-flow status og broadcaster real-time updates til webklienter via WebSocket'
      }
    ]
  },
  {
    id: "kuncontemporary-gallery",
    title: "KunContemporary Galleri",
    description: "Studieprojekt omhandlende en moderne kunstgalleri-hjemmeside med content management system",
    detailedDescription: "En omfattende webapplikation til styring og fremvisning af samtidkunst og udstillinger. Platformen omfatter et sikkert adminpanel til galleristyring og en offentlig brugerflade, hvor besøgende kan udforske udstillinger, kunstnere og tilgængelige kunstværker. Systemet inkluderer avanceret billedhåndtering med automatisk skalering og PDF-generering af arbejdslister til udstillinger.",
    githubUrl: "https://github.com/LasseMG/KunContemporary",
    imageUrl: undefined,
    thumbnail: undefined,
    technologies: [
      "Vue.js 3",
      "TypeScript",
      ".NET 9.0",
      "ASP.NET Core",
      "PostgreSQL",
      "Entity Framework Core",
      "MinIO",
      "Vite",
      "Vue Router",
      "JWT",
      "Axios",
      "QuestPDF",
      "xUnit",
      "Reqnroll"
    ],
    features: [
      "Styring af kunstværker, udstillinger og kunstnerprofilers indhold",
      "Organisation af udstillinger og samlinger",
      "Billedbehandling med flere opløsniner og lagring med MinIO blob storage",
      "JWT-baseret auth til admin adgang",
      "PDF-genereringsværktøj til værkslister for en udstilling",
      "Responsiv brugerflade til at fremvise udstillinger, værker og kunstnere",
      "Admin dashboard med fuld CRUD-funktionalitet for alle førnævnte entiteter"
    ],
    color: "#3cff94ff",
    highlights: [
      {
        name: "Full Stack projekt",
        description: "Design og implementering af komplet webapplikation med Vue.js frontend og .NET backend"
      },
      {
        name: "RESTful API",
        description: "Udvikling af skalerbar API-arkitektur med repository pattern og dependency injection"
      },
      {
        name: "Database",
        description: "Oprettelse af relationel databaseskema med Entity Framework Core og PostgreSQL"
      },
      {
        name: "Billedbehandling",
        description: "Implementering af multi-opløsnings billedprocessering med MinIO storage mhp. hjemmesidens performance"
      },
      {
        name: "Autentifikation & Sikkerhed",
        description: "JWT-baseret autentifikationssystem med BCrypt password hashing og RBAC"
      },
      {
        name: "PDF Generering",
        description: "Udvikling af dynamisk PDF-generering til værklister med QuestPDF"
      },
    ]
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio website / K3S',
    description: 'Moderne portfolio-website med cloud-native deployment på Kubernetes',
    detailedDescription: 'Dette projekt er en Vue.js frontend deployed i mit eget hygge-Kubernetes cluster. Websitet er bygget med Vue 3, TypeScript og PrimeVue med Vite som build tool. Hele applikationen kører i en container via. Docker og er deployed på mit cluster hostet på en Hetzner cloud server i Finland.',
    githubUrl: ''
    technologies: ['Vue.js 3', 'TypeScript', 'Vite', 'PrimeVue', 'Docker', 'Kubernetes', 'k3s', 'Traefik', 'Cert-Manager', 'Hetzner Cloud', 'Nginx'],
    features: [
      'Moderne UI med Vue 3 Composition API og TypeScript',
      'Projekt showcase sider med detaljer og link til GitHub repo',
      'Containeriseret applikation med Docker builds',
      'K3s Kubernetes cluster på Hetzner cloud server',
      'Automatisk HTTPS med Cert-Manager og Let\'s Encrypt',
    ],
    color: '#ff3535ff',
    highlights: [
      {
        name: 'Frontend',
        description: 'Vue 3 med Composition API, TypeScript og PrimeVue component library for et moderne UI'
      },
      {
        name: 'Containerization',
        description: 'Docker builds til production images deployed i K3S'
      },
      {
        name: 'K3s Cluster',
        description: 'Lightweight Kubernetes distribution kørt på Hetzner cloud server i Finland'
      },
      {
        name: 'Ingress & SSL',
        description: 'Traefik ingress controller integreret med Cert-Manager for automatisk SSL-certificering og fornyelse via Let\'s Encrypt'
      },
      {
        name: 'Kommer snart: DevOps Pipeline',
        description: 'Automatiserede tests, image build + deployment til cluster ved push til main branch'
      }
    ]
  }
]