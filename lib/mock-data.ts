export interface Business {
  id: string
  name: string
  category: string
  image: string
  followers: number
  location: string
  isOpen: boolean
  description?: string
  services?: string[]
  rating?: number
  reviews?: number
}

export interface WeeklyHighlight extends Business {
  weeklyGrowth: number
  specialOffer: string
  weeklyViews: number
  trendingRank: number
  growthPercentage: number
}

export const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Café El Aroma",
    category: "Café con ambiente acogedor",
    image: "/modern-cafe-interior.png",
    followers: 1250,
    location: "Centro",
    isOpen: true,
    description: "Un café acogedor con los mejores granos de la región",
    services: ["Café especializado", "Repostería", "WiFi gratis"],
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "2",
    name: "Restaurante Sabor del Mundo",
    category: "Cocina internacional y platos modernos",
    image: "/upscale-restaurant-interior.png",
    followers: 2890,
    location: "Zona Rosa",
    isOpen: true,
    description: "Experiencia gastronómica internacional única",
    services: ["Cocina internacional", "Cenas románticas", "Eventos privados"],
    rating: 4.9,
    reviews: 234,
  },
  {
    id: "3",
    name: "Panadería La Delicia",
    category: "Pan artesanal y pastelería fina",
    image: "/coffee-plant-wooden.png",
    followers: 890,
    location: "Barrio Norte",
    isOpen: true,
    description: "Pan fresco todos los días, horneado con amor",
    services: ["Pan artesanal", "Pasteles personalizados", "Desayunos"],
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "4",
    name: "Librería El Saber",
    category: "Libros de todos los géneros y eventos culturales",
    image: "/smiling-woman-brown-hair.png",
    followers: 567,
    location: "Universidad",
    isOpen: true,
    description: "Tu lugar para descubrir nuevos mundos a través de la lectura",
    services: ["Libros nuevos y usados", "Eventos literarios", "Club de lectura"],
    rating: 4.6,
    reviews: 67,
  },
  {
    id: "5",
    name: "Gimnasio FitLife",
    category: "Entrenamiento personalizado y clases grupales",
    image: "/modern-gym-interior.png",
    followers: 1456,
    location: "Deportiva",
    isOpen: true,
    description: "Transforma tu vida con nuestros programas de entrenamiento",
    services: ["Entrenamiento personal", "Clases grupales", "Nutrición"],
    rating: 4.5,
    reviews: 198,
  },
  {
    id: "6",
    name: "Salón de Belleza Glamour",
    category: "Servicios de belleza y cuidado personal",
    image: "/modern-beauty-salon.png",
    followers: 2134,
    location: "Centro Comercial",
    isOpen: false,
    description: "Realza tu belleza natural con nuestros tratamientos",
    services: ["Corte y peinado", "Tratamientos faciales", "Manicure y pedicure"],
    rating: 4.8,
    reviews: 145,
  },
]

export const weeklyHighlights: WeeklyHighlight[] = [
  {
    ...mockBusinesses[1], // Restaurante Sabor del Mundo
    weeklyGrowth: 45,
    specialOffer: "20% descuento en cenas románticas",
    weeklyViews: 1250,
    trendingRank: 1,
    growthPercentage: 15.6,
  },
  {
    ...mockBusinesses[4], // Gimnasio FitLife
    weeklyGrowth: 38,
    specialOffer: "Primera clase gratis + plan mensual",
    weeklyViews: 980,
    trendingRank: 2,
    growthPercentage: 12.3,
  },
  {
    ...mockBusinesses[0], // Café El Aroma
    weeklyGrowth: 32,
    specialOffer: "Café + postre por $15.000",
    weeklyViews: 756,
    trendingRank: 3,
    growthPercentage: 8.9,
  },
  {
    ...mockBusinesses[5], // Salón de Belleza Glamour
    weeklyGrowth: 28,
    specialOffer: "Tratamiento facial + manicure",
    weeklyViews: 634,
    trendingRank: 4,
    growthPercentage: 7.2,
  },
]
