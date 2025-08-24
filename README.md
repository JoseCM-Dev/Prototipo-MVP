# Local Connect AI 🏪

Una aplicación móvil inteligente para descubrir y conectar con negocios locales usando inteligencia artificial.

## 📱 Descripción

Local Connect AI es una plataforma que permite a los usuarios descubrir negocios locales de manera inteligente, con recomendaciones personalizadas basadas en IA, gestión de favoritos, y un sistema completo de perfiles tanto para usuarios como para negocios.

## ✨ Características Principales

### 🔍 Búsqueda Inteligente con IA
- Búsqueda predictiva con sugerencias inteligentes
- Asistente virtual para responder preguntas sobre negocios
- Filtros avanzados por categoría, ubicación y estado
- Recomendaciones personalizadas basadas en preferencias

### 🏆 Destacados de la Semana
- Ranking de negocios más populares
- Métricas de crecimiento semanal
- Ofertas especiales y promociones
- Análisis de tendencias locales

### ❤️ Gestión de Favoritos
- Guardar negocios de interés
- Organización por categorías
- Vista en lista o cuadrícula
- Acciones masivas (eliminar, exportar)

### 👤 Sistema de Perfiles Dual
- **Perfil de Usuario**: Personalización de preferencias, historial de favoritos
- **Perfil de Negocio**: Logo, descripción, servicios, métricas de seguidores
- Cambio de tema (claro/oscuro)
- Configuración de notificaciones

### 🗺️ Descubrimiento Local
- Negocios recomendados personalizados
- Sección "Cerca de ti" con ubicación
- Información de estado (abierto/cerrado)
- Contadores de seguidores y engagement

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: shadcn/ui
- **Iconos**: Lucide React
- **Fuentes**: Geist y Manrope (Google Fonts)
- **Estado**: React Hooks + Context API
- **Almacenamiento**: localStorage (persistencia local)

## 📁 Estructura del Proyecto

\`\`\`
local-connect-ai/
├── app/                          # App Router de Next.js
│   ├── page.tsx                  # Página principal (Descubre)
│   ├── destacados/page.tsx       # Destacados de la semana
│   ├── favoritos/page.tsx        # Gestión de favoritos
│   ├── perfil/page.tsx           # Sistema de perfiles
│   ├── layout.tsx                # Layout principal
│   └── globals.css               # Estilos globales
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes base de shadcn/ui
│   ├── ai-assistant.tsx          # Asistente virtual IA
│   ├── ai-search.tsx             # Búsqueda inteligente
│   ├── app-layout.tsx            # Layout de la aplicación
│   ├── bottom-navigation.tsx     # Navegación inferior
│   ├── business-card.tsx         # Tarjeta de negocio
│   ├── business-list-item.tsx    # Item de lista de negocio
│   ├── favorite-business-card.tsx # Tarjeta de favorito
│   ├── profile-stats.tsx         # Estadísticas de perfil
│   └── weekly-highlight-card.tsx # Tarjeta de destacado
├── hooks/                        # Custom hooks
│   ├── use-app-state.ts          # Estado global de la app
│   ├── use-favorites.ts          # Gestión de favoritos
│   ├── use-navigation.ts         # Estado de navegación
│   └── use-profile.ts            # Gestión de perfiles
├── lib/                          # Utilidades y datos
│   ├── mock-data.ts              # Datos de prueba
│   └── utils.ts                  # Funciones utilitarias
└── public/                       # Recursos estáticos
    └── *.png                     # Imágenes de negocios
\`\`\`

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone https://github.com/tu-usuario/local-connect-ai.git
cd local-connect-ai
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
# o
yarn install
# o
pnpm install
\`\`\`

3. **Ejecutar en desarrollo**
\`\`\`bash
npm run dev
# o
yarn dev
# o
pnpm dev
\`\`\`

4. **Abrir en el navegador**
\`\`\`
http://localhost:3000
\`\`\`

## 📱 Uso de la Aplicación

### Navegación Principal
- **Inicio**: Descubre negocios recomendados y cercanos
- **Destacados**: Explora los negocios más populares de la semana
- **Favoritos**: Gestiona tus negocios guardados
- **Perfil**: Configura tu perfil y preferencias

### Funcionalidades Clave

1. **Búsqueda Inteligente**
   - Escribe en la barra de búsqueda para obtener sugerencias
   - Usa el asistente IA para preguntas específicas
   - Filtra por categorías y ubicación

2. **Gestión de Favoritos**
   - Toca el corazón en cualquier negocio para guardarlo
   - Ve todos tus favoritos en la pestaña correspondiente
   - Organiza y elimina favoritos según necesites

3. **Perfiles Personalizables**
   - Cambia entre perfil de usuario y negocio
   - Personaliza tu información y preferencias
   - Activa/desactiva el modo oscuro

## 🎨 Personalización

### Temas
La aplicación soporta modo claro y oscuro. Cambia el tema desde:
- Perfil → Configuración → Tema

### Colores Personalizados
Los colores se definen en `app/globals.css` usando variables CSS:
- `--background`: Color de fondo principal
- `--foreground`: Color de texto principal
- `--primary`: Color primario de la marca
- `--secondary`: Color secundario

## 🔧 Desarrollo

### Comandos Disponibles
\`\`\`bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
\`\`\`

### Agregar Nuevos Componentes
\`\`\`bash
# Usando shadcn/ui CLI
npx shadcn@latest add [component-name]
\`\`\`

### Estructura de Datos
Los datos de negocios se definen en `lib/mock-data.ts` con la siguiente estructura:
\`\`\`typescript
interface Business {
  id: string
  name: string
  category: string
  image: string
  followers: number
  location: string
  isOpen: boolean
  weeklyGrowth?: number
  specialOffer?: string
}
\`\`\`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [shadcn/ui](https://ui.shadcn.com/) por los componentes UI
- [Lucide](https://lucide.dev/) por los iconos
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de estilos
- [Next.js](https://nextjs.org/) por el framework

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:
- Abre un [Issue](https://github.com/tu-usuario/local-connect-ai/issues)
- Contacta al equipo de desarrollo

---

Hecho con ❤️ para conectar comunidades locales
