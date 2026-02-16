# 🚌 KemelBus Demo - Sistema de Reserva de Pasajes

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

**Demo de plataforma web para reserva y venta de pasajes de buses interurbanos en Chile.** Este proyecto simula una experiencia completa de compra online, desde la selección de asientos hasta el proceso de pago con Webpay Plus.

---

## 📋 Descripción

KemelBus es una aplicación web moderna y responsiva desarrollada con Next.js 16 que permite a los usuarios:

- 🔍 Buscar rutas de buses entre distintas ciudades de Chile
- 💺 Seleccionar asientos en buses de dos pisos (Salón Cama y Semi Cama)
- 🛒 Gestionar un carrito de compras con persistencia en localStorage
- 💳 Simular el proceso de pago con Webpay Plus (Transbank)
- 📱 Experiencia totalmente responsiva para móviles y escritorio

---

## 🚀 Características Principales

### ✨ Funcionalidades Implementadas

- **Selector de Asientos Interactivo**: Visualización en tiempo real de asientos disponibles/ocupados en dos pisos
- **Gestión de Carrito**: Context API para manejo global del estado del carrito
- **Persistencia de Datos**: LocalStorage para mantener el carrito entre sesiones
- **Simulador de Pago**: Proceso completo de pago con animaciones tipo Webpay
- **Diseño Moderno**: UI/UX inspirada en plataformas de transporte actuales
- **Optimización SEO**: Metadata y estructura optimizada para motores de búsqueda
- **Animaciones Fluidas**: Transiciones y efectos visuales con Tailwind CSS

### 🎨 Componentes Principales

| Componente | Descripción |
|------------|-------------|
| `Hero` | Banner principal con buscador de rutas |
| `SeatPicker` | Selector interactivo de asientos con dos pisos |
| `Services` | Servicios y beneficios del transporte |
| `Fleet` | Información sobre la flota de buses |
| `Routes` | Mapa de destinos por zonas (Norte, Central, Sur) |
| `Testimonials` | Reseñas y opiniones de clientes |
| `FAQ` | Preguntas frecuentes con acordeón |
| `PaymentSimulator` | Simulador de pago Webpay con estados de carga |
| `Navbar` | Barra de navegación con carrito de compras |
| `Footer` | Pie de página con enlaces e información |

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **UI Library**: [React 19.2.3](https://react.dev/)
- **Lenguaje**: [TypeScript 5.x](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Animaciones**: tailwindcss-animate

### Herramientas de Desarrollo
- **Linting**: ESLint con configuración Next.js
- **PostCSS**: Procesamiento de CSS
- **Node**: v20+

---

## 📦 Instalación y Configuración

### Prerrequisitos

```bash
Node.js 20.x o superior
npm, yarn, pnpm o bun
```

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd kemelbus-demo
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en puerto 3000 |
| `npm run build` | Genera el build de producción optimizado |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint para validar el código |

---

## 📁 Estructura del Proyecto

```
kemelbus-demo/
├── app/                          # App Router de Next.js
│   ├── checkout/                 # Página de checkout y pago
│   │   └── page.tsx
│   ├── contact/                  # Página de contacto
│   │   └── page.tsx
│   ├── globals.css              # Estilos globales y Tailwind
│   ├── layout.tsx               # Layout principal con providers
│   └── page.tsx                 # Página de inicio
│
├── components/                   # Componentes reutilizables
│   ├── FAQ.tsx                  # Preguntas frecuentes
│   ├── Fleet.tsx                # Información de flota
│   ├── Footer.tsx               # Pie de página
│   ├── Hero.tsx                 # Banner principal con buscador
│   ├── Map.tsx                  # Mapa de rutas (opcional)
│   ├── Navbar.tsx               # Barra de navegación
│   ├── PaymentSimulator.tsx     # Simulador de pago Webpay
│   ├── Routes.tsx               # Destinos por zona
│   ├── SeatPicker.tsx           # Selector de asientos
│   ├── Services.tsx             # Servicios ofrecidos
│   ├── Testimonials.tsx         # Reseñas de clientes
│   └── TopBanner.tsx            # Banner superior promocional
│
├── context/                      # Contextos de React
│   └── CartContext.tsx          # Estado global del carrito
│
├── public/                       # Archivos estáticos
│
├── eslint.config.mjs            # Configuración ESLint
├── next.config.ts               # Configuración de Next.js
├── package.json                 # Dependencias del proyecto
├── postcss.config.mjs           # Configuración PostCSS
├── tailwind.config.ts           # Configuración Tailwind
└── tsconfig.json                # Configuración TypeScript
```

---

## 🎯 Funcionalidades por Página

### 🏠 Página Principal (`/`)
- Hero con buscador de rutas
- Selector de asientos (Piso 1: Salón Cama, Piso 2: Semi Cama)
- Servicios y beneficios
- Flota de buses
- Rutas disponibles por zona
- Testimonios
- Preguntas frecuentes

### 🛒 Checkout (`/checkout`)
- Resumen de pasajes seleccionados
- Gestión del carrito (agregar/eliminar)
- Formulario de datos del pasajero
- Simulador de pago Webpay Plus
- Estados de carga y confirmación

### 📧 Contacto (`/contact`)
- Formulario de contacto
- Información de la empresa
- Canales de atención

---

## 🔧 Configuración Avanzada

### Context API - Carrito de Compras

El carrito utiliza React Context para gestión de estado global:

```typescript
interface Ticket {
  id: string;
  origin: string;
  destination: string;
  date: string;
  seat: string;
  price: number;
  passengerName?: string;
  passengerRut?: string;
}
```

**Funciones disponibles:**
- `addToCart(ticket)` - Agregar pasaje al carrito
- `removeFromCart(id)` - Eliminar pasaje por ID
- `clearCart()` - Vaciar el carrito completamente
- `total` - Calcular el total de la compra

### LocalStorage

Los datos del carrito se persisten automáticamente en `localStorage` bajo la clave `translinea-cart`.

---

## 🎨 Personalización de Estilos

### Colores Principales (Tailwind)

```css
/* Paleta Emerald (Verde) */
emerald-50   → Fondos claros
emerald-600  → Botones principales
emerald-950  → Textos oscuros

/* Webpay (Rojo) */
bg-webpay    → #DC2626 (Rojo Transbank)
```

### Diseño Responsivo

El proyecto utiliza el sistema de breakpoints de Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

##  Simulador de Pago

El componente `PaymentSimulator` simula tres estados:

1. **Redirecting** (2 segundos)
   - Conexión con Transbank
   - Spinner de carga

2. **Processing** (3 segundos)
   - Procesando pago
   - Animación de puntos

3. **Success**
   - Confirmación exitosa
   - Limpieza del carrito
   - Redirección automática

---

## 📱 Rutas y Navegación

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con selector de asientos |
| `/checkout` | Proceso de pago y confirmación |
| `/contact` | Página de contacto |

---

## 🌐 Deploy en Producción

### Vercel (Recomendado)

1. Push del código a GitHub
2. Conectar repositorio en [Vercel](https://vercel.com)
3. Configuración automática detectada
4. Deploy en un clic

### Build Local

```bash
npm run build
npm run start
```

El build optimizado se genera en `.next/`

---

## 🤝 Contribuciones

Este es un proyecto de demostración. Si deseas contribuir:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Añadir nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es una demostración educativa y no tiene licencia específica.

---

## 👨‍💻 Autor

**Hernán Garrido**  
📧 her.garrido@duocuc.cl

---

## 🆘 Soporte

Para dudas o problemas:
- Abrir un Issue en GitHub
- Contactar al autor por correo

---

## 🔗 Enlaces Útiles

- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación React](https://react.dev/)
- [Documentación Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)

---

<div align="center">

**Hecho con ❤️ usando Next.js y Tailwind CSS**

</div>
