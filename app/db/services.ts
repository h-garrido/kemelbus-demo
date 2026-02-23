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
    // 1. Verificar disponibilidad de asientos
    for (const seatInfo of request.seats) {
      const available = await isSeatAvailable(seatInfo.seat_id);
      if (!available) {
        return {
          success: false,
          error: `El asiento ya no está disponible`
        };
      }
    }

    // 2. Generar código de reserva
    const { data: codeData, error: codeError } = await supabase
      .rpc('generate_booking_code');

    if (codeError || !codeData) {
      throw new Error('Error generando código de reserva');
    }

    const bookingCode = codeData;

    // 3. Calcular total usando las tarifas seleccionadas por el usuario
    const totalAmount = request.seats.reduce((sum, s) => sum + s.fare_price, 0);

    // 4. Crear booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        booking_code: bookingCode,
        user_email: request.user_email,
        user_phone: request.user_phone,
        total_amount: totalAmount,
        payment_status: 'pending',
        payment_method: request.payment_method
      })
      .select()
      .single();

    if (bookingError || !booking) {
      throw new Error('Error creando reserva');
    }

    // 5. Crear tickets y actualizar asientos
    const serviceIdsToUpdate = new Set<string>(); // Recolectar IDs durante este paso

    for (const seatInfo of request.seats) {
      // Obtener información del asiento
      const { data: seatData, error: seatError } = await supabase
        .from('seats')
        .select('bus_service_id, price')
        .eq('id', seatInfo.seat_id)
        .single();

      if (seatError || !seatData) {
        continue;
      }

      // Guardar service_id para actualizar después
      serviceIdsToUpdate.add(seatData.bus_service_id);

      // Generar código de ticket
      const { data: ticketCodeData } = await supabase
        .rpc('generate_ticket_code');

      const ticketCode = ticketCodeData || `TK-${Date.now()}`;

      // Crear ticket
      await supabase.from('tickets').insert({
        booking_id: booking.id,
        bus_service_id: seatData.bus_service_id,
        seat_id: seatInfo.seat_id,
        passenger_name: seatInfo.passenger.name,
        passenger_rut: seatInfo.passenger.document_number,
        price: seatInfo.fare_price,
        fare_type: seatInfo.fare_type,
        ticket_code: ticketCode,
        status: 'active'
      });

      // Actualizar estado del asiento
      await supabase
        .from('seats')
        .update({
          status: 'reserved',
          passenger_name: seatInfo.passenger.name,
          passenger_rut: seatInfo.passenger.document_number,
          reserved_at: new Date().toISOString()
        })
        .eq('id', seatInfo.seat_id);
    }

    // 6. Actualizar contador de asientos disponibles en cada servicio afectado
    for (const serviceId of serviceIdsToUpdate) {
      const { data: availableSeats } = await supabase
        .from('seats')
        .select('id')
        .eq('bus_service_id', serviceId)
        .eq('status', 'available');

      await supabase
        .from('bus_services')
        .update({ available_seats: availableSeats?.length || 0 })
        .eq('id', serviceId);
    }

    return {
      success: true,
      booking_code: bookingCode,
      booking_id: booking.id
    };

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
