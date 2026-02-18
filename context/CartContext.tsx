"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartTicket } from '@/app/db/types';

interface CartContextType {
  cart: CartTicket[];
  addToCart: (ticket: CartTicket) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartTicket[]>([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('kemelbus-cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('kemelbus-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (ticket: CartTicket) => setCart((prev) => [...prev, ticket]);
  
  const removeFromCart = (id: string) => 
    setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};