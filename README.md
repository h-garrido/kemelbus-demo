# 🚌 KemelBus — Sistema de Reserva de Pasajes

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)

**Plataforma web para reserva y venta de pasajes de buses interurbanos en Chile.** Simula una experiencia de compra completa: búsqueda de servicios, selección de asientos, registro de datos de pasajeros y proceso de pago con Webpay Plus.

---

## 📋 Descripción

KemelBus es una aplicación web moderna y totalmente responsiva construida con **Next.js 16 (App Router)** y conectada a una base de datos real mediante **Supabase**. Cubre el flujo completo de compra de pasajes:

1. Búsqueda de servicios disponibles por origen, destino y fecha
2. Selección de asientos en tiempo real
3. Registro de datos de pasajeros por ticket
4. Proceso de pago simulado con Webpay Plus (Transbank)
5. Confirmación y generación de código de reserva

---

## 🚀 Funcionalidades

### ✨ Implementadas

- **Búsqueda de Servicios**: Filtra por ciudad de origen, destino y fecha de viaje consultando Supabase en tiempo real
- **Mapa de Asientos Interactivo**: Visualización en tiempo real de disponibilidad de asientos (Salón Cama y Semi Cama)
- **Carrito de Compras**: Gestión global con Context API y persistencia en `localStorage`
- **Formulario de Pasajeros**: Captura de nombre y RUT por cada ticket antes del pago
- **Simulador de Pago Webpay**: Flujo completo con estados de redirección, procesamiento y confirmación
- **Generación de Reserva**: Creación de `Booking` y `Tickets` en Supabase con código único
- **Diseño Responsivo**: Adaptado para móviles, tablets y escritorio
- **UX Fluida**: Skeleton loaders, spinners, toasts de notificación y animaciones con Tailwind

### 🗂️ Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page con buscador hero, selector de asientos, servicios, rutas, testimonios y FAQ |
| `/buscar` | Listado de servicios disponibles para la ruta y fecha seleccionada |
| `/seleccionar-asiento` | Mapa de asientos del servicio con selección interactiva por piso |
| `/checkout` | Confirmación de viaje, datos de pasajeros, resumen y proceso de pago |
| `/servicio` | Detalle de las clases de servicio (Salón Cama y Semi Cama) |
| `/flota` | Información sobre la flota vehicular y especificaciones técnicas |
| `/contact` | Canales de contacto, formulario y mapa de ubicación |

### 🧩 Componentes

| Componente | Descripción |
|------------|-------------|
| `Hero` | Banner principal con buscador de rutas dinámico |
| `SeatPicker` | Selector de asientos estático para la home |
| `Services` | Sección de servicios y beneficios |
| `Routes` | Mapa de destinos por zona geográfica |
| `Fleet` | Información de la flota |
| `Testimonials` | Carrusel de reseñas de clientes |
| `FAQ` | Acordeón de preguntas frecuentes |
| `Navbar` | Barra de navegación con contador de carrito |
| `TopBanner` | Banner superior con información promocional |
| `Footer` | Pie de página con enlaces e información |
| `PaymentSimulator` | Simulador de pago Webpay con estados animados |
| `Toast` | Sistema de notificaciones emergentes |
| `LoadingSpinner` | Indicador de carga reutilizable |
| `SkeletonLoader` | Placeholders animados durante la carga de datos |
| `ScrollToTop` | Botón flotante para volver al inicio |
| `Map` | Mapa de ubicación en la página de contacto |

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: [Next.js 16.1.6](https://nextjs.org/) — App Router
- **UI Library**: [React 19.2.3](https://react.dev/)
- **Lenguaje**: [TypeScript 5.x](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4.0](https://tailwindcss.com/) + tailwindcss-animate
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Formato de números**: [react-number-format](https://github.com/s-yadav/react-number-format)

### Backend / Base de Datos
- **BaaS**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Cliente**: `@supabase/supabase-js v2`

### Herramientas de Desarrollo
- **Linting**: ESLint 9 con `eslint-config-next`
- **PostCSS**: `@tailwindcss/postcss`
- **Node.js**: v20+

---

## 🗄️ Modelo de Datos

La base de datos en Supabase gestiona las siguientes entidades:

| Tabla | Descripción |
|-------|-------------|
| `cities` | Ciudades disponibles con región y nombre de terminal |
| `routes` | Rutas entre pares de ciudades con duración y distancia |
| `bus_services` | Servicios programados (fecha, hora, tipo de bus, precios, disponibilidad) |
| `seats` | Asientos por servicio con piso, tipo, precio y estado de ocupación |
| `bookings` | Reservas con código único, email, monto y estado de pago |
| `tickets` | Tickets individuales por pasajero dentro de una reserva |

---

## 📦 Instalación y Configuración

### Prerrequisitos

```
Node.js 20.x o superior
npm, yarn, pnpm o bun
Una instancia de Supabase (proyecto propio)
```

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd kemelbus-demo
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-anon-key>
```

> Obtén estos valores desde el panel de tu proyecto en [supabase.com](https://supabase.com) → Project Settings → API.

### 4. Configurar la base de datos

Ejecuta el esquema SQL incluido en `supabase/` desde el editor SQL de Supabase para crear las tablas e insertar datos de prueba.

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en puerto 3000 |
| `npm run build` | Build de producción optimizado |
| `npm run start` | Servidor de producción |
| `npm run lint` | Validación con ESLint |

---

## 📁 Estructura del Proyecto

```
kemelbus-demo/
├── app/                          # App Router de Next.js
│   ├── buscar/
│   │   └── page.tsx              # Búsqueda de servicios disponibles
│   ├── checkout/
│   │   └── page.tsx              # Confirmación y pago
│   ├── contact/
│   │   └── page.tsx              # Contacto
│   ├── db/
│   │   ├── services.ts           # Funciones de consulta a Supabase
│   │   ├── supabase.ts           # Inicialización del cliente
│   │   └── types.ts              # Tipos TypeScript del modelo de datos
│   ├── flota/
│   │   └── page.tsx              # Información de flota
│   ├── seleccionar-asiento/
│   │   └── page.tsx              # Mapa de asientos
│   ├── servicio/
│   │   └── page.tsx              # Detalle de servicios
│   ├── globals.css               # Estilos globales y Tailwind
│   ├── layout.tsx                # Layout principal con providers
│   └── page.tsx                  # Página de inicio
│
├── components/                   # Componentes reutilizables
│   ├── FAQ.tsx
│   ├── Fleet.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LoadingSpinner.tsx
│   ├── Map.tsx
│   ├── Navbar.tsx
│   ├── PaymentSimulator.tsx
│   ├── Routes.tsx
│   ├── ScrollToTop.tsx
│   ├── SeatPicker.tsx
│   ├── Services.tsx
│   ├── SkeletonLoader.tsx
│   ├── Testimonials.tsx
│   ├── Toast.tsx
│   └── TopBanner.tsx
│
├── context/
│   └── CartContext.tsx            # Estado global del carrito
│
├── hooks/
│   ├── useScrollReveal.ts        # Hook para animaciones en scroll
│   └── useToast.ts               # Hook para notificaciones toast
│
├── supabase/                     # Esquema SQL de la base de datos
├── public/                       # Archivos estáticos
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🛒 Carrito de Compras

Implementado con React Context API (`CartContext`) y persistencia en `localStorage`.

**Estructura de un ítem en el carrito:**

```typescript
interface CartItem {
  id: string;           // UUID local
  service_id: string;
  seat_id: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  seat: string;         // Ej: "Salón Cama - Piso 1 - N°5"
  seatNumber: number;
  price: number;
}
```

**API del contexto:**

```typescript
addToCart(item: CartItem): void
removeFromCart(id: string): void
clearCart(): void
total: number
```

---

##  Simulador de Pago

El componente `PaymentSimulator` reproduce el flujo de Webpay Plus en tres etapas:

| Etapa | Duración | Descripción |
|-------|----------|-------------|
| Redirecting | 2 s | Simulación de redirección a Transbank |
| Processing | 3 s | Procesamiento del pago |
| Success | — | Confirmación, creación de reserva en Supabase y limpieza del carrito |

---

## 🎨 Paleta de Colores

El proyecto usa la escala `emerald` de Tailwind como color principal:

| Token | Uso |
|-------|-----|
| `emerald-950` | Fondos oscuros de header, tarjetas de resumen |
| `emerald-600` | Botones primarios, íconos, acentos |
| `emerald-500` | Acentos y highlights |
| `emerald-50` / `emerald-100` | Fondos claros de secciones y cards |

---

## 🌐 Deploy

### Vercel (recomendado)

1. Sube el código a GitHub
2. Conecta el repositorio en [vercel.com](https://vercel.com)
3. Agrega las variables de entorno (`NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`) en la configuración del proyecto
4. Vercel detecta automáticamente Next.js y realiza el deploy

### Build local

```bash
npm run build
npm run start
```

---

## 🔗 Referencias

- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)

---

<div align="center">

Desarrollado con Next.js, Tailwind CSS y Supabase

</div>

