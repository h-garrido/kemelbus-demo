# 🚌 KemelBus — Sistema de Reserva de Pasajes

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)

**Plataforma web para reserva y venta de pasajes de buses interurbanos en Chile.** Simula una experiencia de compra completa: búsqueda de servicios, selección de asientos, registro de datos de pasajeros y proceso de pago con Webpay Plus.

---

## 📋 Descripción

KemelBus es una aplicación web moderna y totalmente responsiva construida con **Next.js 16.1.6 (App Router)** y conectada a una base de datos real mediante **Supabase**. Cubre el flujo completo de compra de pasajes:

1. Búsqueda de servicios disponibles por origen, destino y fecha
2. Selección de asientos en tiempo real
3. Elección del tipo de tarifa (Normal, Estudiante, Adulto Mayor, Residente, No Residente)
4. Registro de nombre y RUT por cada pasajero antes del pago
5. Proceso de pago simulado con Webpay Plus (Transbank)
6. Confirmación y generación de código de reserva único

---

## 🚀 Funcionalidades

### ✨ Implementadas

- **Búsqueda de Servicios**: Filtra por ciudad de origen, destino y fecha de viaje consultando Supabase en tiempo real
- **Mapa de Asientos Interactivo**: Visualización en tiempo real de disponibilidad de asientos Semi Cama
- **Tarifas Diferenciales**: Soporte para 5 tipos de tarifa (`Normal`, `Estudiante`, `Adulto Mayor`, `Residente`, `No Residente`)
- **Carrito de Compras**: Gestión global con Context API y persistencia en `localStorage`
- **Formulario de Pasajeros**: Captura de nombre y RUT por cada ticket antes del pago
- **Simulador de Pago Webpay**: Flujo completo con estados de redirección, procesamiento y confirmación
- **Generación de Reserva**: Creación de `Booking` y `Tickets` en Supabase con código único
- **Diseño Responsivo**: Adaptado para móviles, tablets y escritorio
- **UX Fluida**: Skeleton loaders, modal de carga, spinners, toasts de notificación y animaciones con Tailwind
- **Imágenes Optimizadas**: Carga de imágenes remotas desde Unsplash a través de `next/image`

### 🗂️ Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page con buscador hero, selector de asientos, servicios, rutas, testimonios y FAQ |
| `/buscar` | Listado de servicios disponibles para la ruta y fecha seleccionada |
| `/seleccionar-asiento` | Mapa de asientos del servicio con selección interactiva |
| `/checkout` | Confirmación de viaje, datos de pasajeros, resumen y proceso de pago |
| `/servicio` | Detalle de la clase de servicio Semi Cama |
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
| `FleetCarousel` | Carrusel de imágenes de la flota |
| `Testimonials` | Carrusel de reseñas de clientes |
| `FAQ` | Acordeón de preguntas frecuentes |
| `Navbar` | Barra de navegación con contador de carrito |
| `TopBanner` | Banner superior con información promocional |
| `Footer` | Pie de página con enlaces e información |
| `PaymentSimulator` | Simulador de pago Webpay con estados animados |
| `Toast` | Sistema de notificaciones emergentes |
| `LoadingSpinner` | Indicador de carga reutilizable |
| `LoadingModal` | Modal de carga bloqueante para operaciones críticas |
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
| `route_fares` | Tarifas por tipo de pasajero para cada ruta |
| `route_schedules` | Horarios recurrentes por día de semana para cada ruta |
| `bus_services` | Servicios programados (fecha, hora, tipo de bus, precios, disponibilidad) |
| `seats` | Asientos por servicio con tipo Semi Cama, precio y estado de ocupación |
| `bookings` | Reservas con código único, email, monto y estado de pago |
| `tickets` | Tickets individuales por pasajero dentro de una reserva |

### Tipos de tarifa disponibles

| Tarifa | Descripción |
|--------|-------------|
| `Normal` | Tarifa estándar |
| `Estudiante` | Con credencial vigente |
| `Adulto Mayor` | 60 años o más |
| `Residente` | Residente de la zona |
| `No Residente` | Visitante no residente |

### Estados del sistema

| Entidad | Estados posibles |
|---------|-----------------|
| Servicio (`ServiceStatus`) | `scheduled`, `boarding`, `departed`, `arrived`, `cancelled` |
| Asiento (`SeatStatus`) | `available`, `reserved`, `occupied` |
| Reserva (`PaymentStatus`) | `pending`, `paid`, `failed`, `refunded` |
| Ticket (`TicketStatus`) | `active`, `cancelled`, `used` |

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

Crea las tablas en tu proyecto de Supabase ejecutando el esquema SQL correspondiente desde el editor SQL del panel. Asegúrate de crear todas las tablas descritas en el modelo de datos.

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
│   ├── assets/
│   │   └── img/                  # Imágenes estáticas locales
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
│   ├── custom.css                # Estilos personalizados
│   ├── globals.css               # Estilos globales y Tailwind
│   ├── layout.tsx                # Layout principal con providers
│   └── page.tsx                  # Página de inicio
│
├── components/                   # Componentes reutilizables
│   ├── FAQ.tsx
│   ├── Fleet.tsx
│   ├── FleetCarousel.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LoadingModal.tsx
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
│   ├── useScrollReveal.ts        # Hook de animaciones con IntersectionObserver
│   └── useToast.ts               # Hook para notificaciones toast
│
├── public/                       # Archivos estáticos públicos
├── next.config.ts                # Configuración de Next.js (imágenes Unsplash)
├── tsconfig.json
└── package.json
```

---

## 🛒 Carrito de Compras

Implementado con React Context API (`CartContext`) y persistencia en `localStorage` bajo la clave `kemelbus-cart`.

**Estructura de un ticket en el carrito (`CartTicket`):**

```typescript
interface CartTicket {
  id: string;             // UUID temporal local
  service_id: string;     // ID del bus_service en Supabase
  seat_id: string;        // ID del seat reservado
  origin: string;
  destination: string;
  date: string;
  time: string;
  seat: string;           // Ej: "Semi Cama - N°5"
  seatNumber: number;
  price: number;
  fare_type: string;      // Ej: "Normal", "Estudiante", etc.
  passengerName?: string;
  passengerRut?: string;
}
```

**API del contexto:**

```typescript
cart: CartTicket[]
addToCart(ticket: CartTicket): void
removeFromCart(id: string): void
clearCart(): void
total: number
```

---

## 💳 Simulador de Pago

El componente `PaymentSimulator` reproduce el flujo de Webpay Plus en tres etapas:

| Etapa | Duración | Descripción |
|-------|----------|-------------|
| Redirecting | 2 s | Simulación de redirección a Transbank |
| Processing | 3 s | Procesamiento del pago |
| Success | — | Confirmación, creación de reserva en Supabase y limpieza del carrito |

Al completarse el pago se crea un registro en `bookings` con estado `paid` y uno o más registros en `tickets`, cada uno con su `ticket_code` único.

---

## 🪝 Custom Hooks

| Hook | Descripción |
|------|-------------|
| `useScrollReveal` | Usa `IntersectionObserver` para revelar elementos al hacer scroll. Acepta `threshold`, `rootMargin` y `triggerOnce`. |
| `useToast` | Gestiona el estado de notificaciones toast con `showToast(config)` y `hideToast()`. Soporta tipos `success`, `error` e `info`. |

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
- [react-number-format](https://s-yadav.github.io/react-number-format/)

---

<div align="center">

Desarrollado con Next.js, Tailwind CSS y Supabase

</div>

