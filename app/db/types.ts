// ========================================
// TIPOS PARA LA BASE DE DATOS DE KEMELBUS
// ========================================

// Tipos de estado
export type RouteStatus = 'active' | 'inactive' | 'seasonal';
export type BusType = 'Salón Cama' | 'Semi Cama' | 'Clásico';
export type SeatType = 'Salón Cama' | 'Semi Cama' | 'Clásico';
export type SeatStatus = 'available' | 'reserved' | 'occupied';
export type ServiceStatus = 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type TicketStatus = 'active' | 'cancelled' | 'used';

// ========================================
// TIPOS DE TABLAS
// ========================================

export interface City {
  id: string;
  name: string;
  region: string;
  terminal_name: string | null;
  created_at: string;
}

export interface Route {
  id: string;
  origin_city_id: string;
  destination_city_id: string;
  duration_hours: number;
  distance_km: number | null;
  status: RouteStatus;
  created_at: string;
}

export interface BusService {
  id: string;
  route_id: string;
  departure_date: string; // YYYY-MM-DD
  departure_time: string; // HH:MM:SS
  arrival_time: string; // HH:MM:SS
  bus_type: BusType;
  bus_number: string | null;
  base_price: number;
  total_seats: number;
  available_seats: number;
  status: ServiceStatus;
  created_at: string;
  updated_at: string;
}

export interface Seat {
  id: string;
  bus_service_id: string;
  seat_number: number;
  floor: 1 | 2;
  type: SeatType;
  price: number;
  status: SeatStatus;
  passenger_name: string | null;
  passenger_rut: string | null;
  reserved_at: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  booking_code: string;
  user_email: string | null;
  user_phone: string | null;
  booking_date: string;
  total_amount: number;
  payment_status: PaymentStatus;
  payment_method: string | null;
  payment_transaction_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: string;
  booking_id: string;
  bus_service_id: string;
  seat_id: string;
  passenger_name: string;
  passenger_rut: string;
  price: number;
  ticket_code: string;
  status: TicketStatus;
  created_at: string;
}

// ========================================
// TIPOS DE VISTAS (JOIN DE TABLAS)
// ========================================

export interface RouteWithCities {
  id: string;
  origin_city_id: string;
  origin_city: string;
  origin_terminal: string | null;
  destination_city_id: string;
  destination_city: string;
  destination_terminal: string | null;
  duration_hours: number;
  distance_km: number | null;
  status: RouteStatus;
}

export interface AvailableService {
  service_id: string;
  departure_date: string;
  departure_time: string;
  arrival_time: string;
  bus_type: BusType;
  base_price: number;
  available_seats: number;
  status: ServiceStatus;
  origin_city: string;
  destination_city: string;
  duration_hours: number;
  distance_km: number | null;
}

export interface ServiceWithRoute extends BusService {
  route: RouteWithCities;
}

export interface SeatWithService extends Seat {
  service: BusService;
}

export interface TicketWithDetails extends Ticket {
  service: ServiceWithRoute;
  seat: Seat;
}

export interface BookingWithTickets extends Booking {
  tickets: TicketWithDetails[];
}

// ========================================
// TIPOS PARA FORMULARIOS Y UI
// ========================================

export interface SearchFilters {
  originCityId: string;
  destinationCityId: string;
  departureDate: string;
  passengers?: number;
}

export interface PassengerInfo {
  name: string;
  rut: string;
  email?: string;
  phone?: string;
}

export interface BookingRequest {
  seats: {
    seat_id: string;
    passenger: PassengerInfo;
  }[];
  user_email?: string;
  user_phone?: string;
  payment_method: string;
}

export interface CreateBookingResponse {
  success: boolean;
  booking_code?: string;
  booking_id?: string;
  error?: string;
}

// ========================================
// TIPOS PARA EL CARRITO (COMPATIBILIDAD)
// ========================================

export interface CartTicket {
  id: string; // Temporal UUID para el carrito local
  service_id: string; // ID del bus_service
  seat_id: string; // ID del seat reservado
  origin: string;
  destination: string;
  date: string;
  time: string;
  seat: string; // Ej: "Salón Cama - N°5"
  seatNumber: number;
  price: number;
  passengerName?: string;
  passengerRut?: string;
}
