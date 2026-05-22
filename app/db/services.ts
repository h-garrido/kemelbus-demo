// ========================================
// SERVICIOS DE BASE DE DATOS
// Funciones para interactuar con Supabase
// ========================================

import { supabase } from './supabase';
import type {
  City,
  RouteWithCities,
  AvailableService,
  BusService,
  Seat,
  Booking,
  Ticket,
  SearchFilters,
  BookingRequest,
  CreateBookingResponse,
  ServiceWithRoute,
  RouteFare,
  RouteSchedule,
} from './types';

// ========================================
// CONSULTAS DE CIUDADES Y RUTAS
// ========================================

/**
 * Obtener todas las ciudades disponibles
 */
export async function getCities(): Promise<City[]> {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching cities:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtener ciudades de origen con rutas activas
 */
export async function getOriginCities(): Promise<City[]> {
  const { data, error } = await supabase
    .from('routes_with_cities')
    .select('origin_city_id, origin_city')
    .eq('status', 'active');

  if (error) {
    console.error('Error fetching origin cities:', error);
    return [];
  }

  // Eliminar duplicados
  const uniqueCities = Array.from(
    new Map(data.map(item => [item.origin_city_id, {
      id: item.origin_city_id,
      name: item.origin_city,
      region: '',
      terminal_name: null,
      created_at: ''
    }])).values()
  );

  return uniqueCities as City[];
}

/**
 * Obtener ciudades de destino disponibles desde un origen específico
 */
export async function getDestinationCities(originCityId: string): Promise<City[]> {
  const { data, error } = await supabase
    .from('routes_with_cities')
    .select('destination_city_id, destination_city')
    .eq('origin_city_id', originCityId)
    .eq('status', 'active');

  if (error) {
    console.error('Error fetching destination cities:', error);
    return [];
  }

  const uniqueCities = Array.from(
    new Map(data.map(item => [item.destination_city_id, {
      id: item.destination_city_id,
      name: item.destination_city,
      region: '',
      terminal_name: null,
      created_at: ''
    }])).values()
  );

  return uniqueCities as City[];
}

/**
 * Obtener una ruta por su ID
 */
export async function getRouteById(routeId: string): Promise<RouteWithCities | null> {
  const { data, error } = await supabase
    .from('routes_with_cities')
    .select('*')
    .eq('id', routeId)
    .single();

  if (error) {
    console.error('Error fetching route by id:', error);
    return null;
  }

  return data;
}

/**
 * Obtener una ruta específica entre dos ciudades
 */
export async function getRoute(originCityId: string, destinationCityId: string): Promise<RouteWithCities | null> {
  const { data, error } = await supabase
    .from('routes_with_cities')
    .select('*')
    .eq('origin_city_id', originCityId)
    .eq('destination_city_id', destinationCityId)
    .eq('status', 'active')
    .single();

  if (error) {
    console.error('Error fetching route:', error);
    return null;
  }

  return data;
}

/**
 * Obtener horarios fijos de una ruta específica
 */
export async function getRouteSchedules(routeId: string): Promise<RouteSchedule[]> {
  const { data, error } = await supabase
    .from('route_schedules')
    .select('*')
    .eq('route_id', routeId)
    .order('day_of_week')
    .order('departure_time');

  if (error) {
    console.error('Error fetching route schedules:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtener tarifas por tipo de pasajero para una ruta específica
 */
export async function getRouteFares(routeId: string): Promise<RouteFare[]> {
  const { data, error } = await supabase
    .from('route_fares')
    .select('*')
    .eq('route_id', routeId)
    .order('price');

  if (error) {
    console.error('Error fetching route fares:', error);
    return [];
  }

  return data || [];
}

// ========================================
// CONSULTAS DE SERVICIOS DE BUS
// ========================================

/**
 * Buscar servicios disponibles según filtros
 */
export async function searchServices(filters: SearchFilters): Promise<AvailableService[]> {
  const { data, error } = await supabase
    .from('available_services')
    .select('*')
    .gte('departure_date', filters.departureDate)
    .order('departure_date')
    .order('departure_time');

  if (error) {
    console.error('Error searching services:', error);
    return [];
  }

  // Filtrar por ciudades
  const filtered = data.filter(
    service =>
      service.origin_city === filters.originCityId ||
      service.destination_city === filters.destinationCityId
  );

  return filtered || [];
}

/**
 * Obtener servicios disponibles para una ruta y fecha específica
 */
export async function getAvailableServices(
  originCityId: string,
  destinationCityId: string,
  date: string
): Promise<ServiceWithRoute[]> {
  // Primero obtenemos la ruta
  const route = await getRoute(originCityId, destinationCityId);
  
  if (!route) {
    return [];
  }

  // Luego obtenemos los servicios para esa ruta y fecha
  const { data, error } = await supabase
    .from('bus_services')
    .select('*')
    .eq('route_id', route.id)
    .eq('departure_date', date)
    .eq('status', 'scheduled')
    .gt('available_seats', 0)
    .order('departure_time');

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  // Agregar información de ruta a cada servicio
  return (data || []).map(service => ({
    ...service,
    route
  }));
}

/**
 * Obtener detalles de un servicio específico
 */
export async function getServiceDetails(serviceId: string): Promise<BusService | null> {
  const { data, error } = await supabase
    .from('bus_services')
    .select('*')
    .eq('id', serviceId)
    .single();

  if (error) {
    console.error('Error fetching service details:', error);
    return null;
  }

  return data;
}

// ========================================
// CONSULTAS DE ASIENTOS
// ========================================

/**
 * Obtener todos los asientos de un servicio específico
 */
export async function getSeats(serviceId: string): Promise<Seat[]> {
  const { data, error } = await supabase
    .from('seats')
    .select('*')
    .eq('bus_service_id', serviceId)
    .order('seat_number');

  if (error) {
    console.error('Error fetching seats:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtener asientos disponibles de un servicio
 */
export async function getAvailableSeats(serviceId: string): Promise<Seat[]> {
  const { data, error } = await supabase
    .from('seats')
    .select('*')
    .eq('bus_service_id', serviceId)
    .eq('status', 'available')
    .order('seat_number');

  if (error) {
    console.error('Error fetching available seats:', error);
    return [];
  }

  return data || [];
}

/**
 * Verificar disponibilidad de un asiento específico
 */
export async function isSeatAvailable(seatId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('seats')
    .select('status')
    .eq('id', seatId)
    .single();

  if (error || !data) {
    return false;
  }

  return data.status === 'available';
}

// ========================================
// OPERACIONES DE RESERVA
// ========================================

/**
 * Crear una nueva reserva con tickets
 */
export async function createBooking(request: BookingRequest): Promise<CreateBookingResponse> {
  try {
    const formattedSeats = request.seats.map(s => ({
      seat_id: s.seat_id,
      passenger_name: s.passenger.name,
      passenger_rut: s.passenger.document_number,
      fare_type: s.fare_type,
      fare_price: s.fare_price
    }));

    const { data, error } = await supabase.rpc('process_booking_transaction', {
      p_seats: formattedSeats,
      p_user_email: request.user_email || null,
      p_user_phone: request.user_phone || null,
      p_payment_method: request.payment_method
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data && typeof data === 'object') {
      const res = data as { success: boolean; booking_code?: string; booking_id?: string; error?: string };
      if (!res.success) {
        return {
          success: false,
          error: res.error || 'Error al procesar la reserva'
        };
      }
      return {
        success: true,
        booking_code: res.booking_code,
        booking_id: res.booking_id
      };
    }

    throw new Error('Respuesta inválida de la base de datos');
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}

/**
 * Confirmar pago de una reserva
 */
export async function confirmPayment(
  bookingId: string,
  transactionId: string
): Promise<boolean> {
  const { error } = await supabase
    .from('bookings')
    .update({
      payment_status: 'paid',
      payment_transaction_id: transactionId
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Error confirming payment:', error);
    return false;
  }

  return true;
}

/**
 * Obtener detalles de una reserva por código
 */
export async function getBookingByCode(bookingCode: string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_code', bookingCode)
    .single();

  if (error) {
    console.error('Error fetching booking:', error);
    return null;
  }

  return data;
}

/**
 * Obtener tickets de una reserva
 */
export async function getBookingTickets(bookingId: string): Promise<Ticket[]> {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('booking_id', bookingId);

  if (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }

  return data || [];
}

/**
 * Cancelar una reserva
 */
export async function cancelBooking(bookingId: string): Promise<boolean> {
  try {
    // 1. Obtener tickets de la reserva
    const tickets = await getBookingTickets(bookingId);

    // 2. Liberar asientos
    for (const ticket of tickets) {
      await supabase
        .from('seats')
        .update({
          status: 'available',
          passenger_name: null,
          passenger_rut: null,
          reserved_at: null
        })
        .eq('id', ticket.seat_id);
    }

    // 3. Actualizar estado de tickets
    await supabase
      .from('tickets')
      .update({ status: 'cancelled' })
      .eq('booking_id', bookingId);

    // 4. Actualizar estado de reserva
    await supabase
      .from('bookings')
      .update({ payment_status: 'refunded' })
      .eq('id', bookingId);

    return true;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return false;
  }
}
