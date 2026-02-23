'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '@/app/assets/img/img1.jpg';
import img2 from '@/app/assets/img/img2.jpg';
import img3 from '@/app/assets/img/img3.jpg';
import img4 from '@/app/assets/img/img4.jpg';
import img5 from '@/app/assets/img/img5.jpg';

interface Slide {
  src: StaticImageData;
  alt: string;
  caption: string;
  model: string;
}

const slides: Slide[] = [
  {
    src: img1,
    alt: 'Bus KemelBus Neobus New Road 340 en patio de operaciones',
    caption: 'Neobus New Road 340',
    model: 'Chasis Mercedes-Benz',
  },
  {
    src: img2,
    alt: 'Bus KemelBus Neobus lateral en patio de grava',
    caption: 'Neobus New Road',
    model: 'Vista lateral',
  },
  {
    src: img3,
    alt: 'Bus KemelBus con destino Hornopirén',
    caption: 'Ruta Puerto Montt → Hornopirén',
    model: 'Neobus — Chasis Mercedes-Benz',
  },
  {
    src: img4,
    alt: 'Bus KemelBus Busscar Vissta Buss HI con cumbres nevadas al fondo',
    caption: 'Busscar Vissta Buss HI',
    model: 'Chasis Mercedes-Benz · Región de Los Lagos',
  },
  {
    src: img5,
    alt: 'Bus KemelBus Mascarello Roma en librea turquesa y verde',
    caption: 'Mascarello Roma',
    model: 'Chasis Mercedes-Benz · Aire acondicionado',
  },
];

export default function FleetCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() =>
    setCurrent(c => (c === 0 ? slides.length - 1 : c - 1)), []);

  const next = useCallback(() =>
    setCurrent(c => (c === slides.length - 1 ? 0 : c + 1)), []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <div
      className="bus-hero-image relative h-65 sm:h-85 md:h-105 select-none w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={idx === 0}
          />
          {/* Overlay degradado inferior */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Caption */}
      <div className="absolute bottom-12 left-4 right-16 z-10">
        <p className="text-white text-sm font-black uppercase tracking-wider leading-tight drop-shadow">
          {slides[current].caption}
        </p>
        <p className="text-white/70 text-xs font-medium mt-0.5 drop-shadow">
          {slides[current].model}
        </p>
      </div>

      {/* Controles de navegación */}
      <button
        onClick={prev}
        aria-label="Imagen anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                   bg-black/40 hover:bg-black/70 text-white
                   rounded-full p-2 transition-all duration-200
                   hover:scale-110 backdrop-blur-sm"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Imagen siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                   bg-black/40 hover:bg-black/70 text-white
                   rounded-full p-2 transition-all duration-200
                   hover:scale-110 backdrop-blur-sm"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicadores de puntos */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Ir a imagen ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              idx === current
                ? 'w-5 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Contador */}
      <div className="badge-bus absolute top-4 right-4 px-3 py-1 text-xs font-black uppercase z-10">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}
