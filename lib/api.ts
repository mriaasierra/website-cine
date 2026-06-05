// WEBSITE-CINE / lib / api.ts

const BASE_URL = 'http://localhost:5000/api';

// --- 1. DEFINICIÓN DE TIPOS (Interfaces para TypeScript) ---
export interface Movie {
  movie_id: number;
  title: string;
  director: string;
  duration: string; // En tu PDF aparece como varchar
  poster_url: string;
  status: boolean; // En tu PDF aparece como boolean
  genre_id: number;
}

export interface Genre {
  genre_id: number;
  name: string;
}

export interface Room {
  room_id: number;
  room_number: number;
  total_capacity: number;
  room_type: string;
  room_status: string; // Ej: Disponible, Ocupado
}

export interface Screening {
  screening_id: number;
  date_time: Date;
  movie_id: number;
  room_id: number;
}

export interface Booking {
  booking_id: number;
  customer_id: number;
  created_at: Date;
  booking_status: string; // Ej: Confirmada, Cancelada
  screening_id: number;
  user_id: number; // El usuario que gestiona la reserva
}


// --- 2. OBJETOS DE LA API (Hacia tus endpoints en plural del Backend) ---

// Módulo de Cine y Cartelera
export const moviesApi = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/movies`);
    if (!response.ok) throw new Error('Error al cargar películas');
    return response.json();
  },
  getById: async (id: number) => {
    const response = await fetch(`${BASE_URL}/movies/${id}`);
    if (!response.ok) throw new Error('Error al obtener la película');
    return response.json();
  }
};

export const screeningsApi = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/screenings`);
    if (!response.ok) throw new Error('Error al cargar funciones');
    return response.json();
  },
  getByMovie: async (movieId: number) => {
    const response = await fetch(`${BASE_URL}/screenings/movie/${movieId}`);
    if (!response.ok) throw new Error('Error al cargar funciones de la película');
    return response.json();
  }
};

export const roomsApi = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/rooms`);
    if (!response.ok) throw new Error('Error al cargar salas');
    return response.json();
  }
};

export const seatsApi = {
  getByRoom: async (roomId: number) => {
    const response = await fetch(`${BASE_URL}/seats/room/${roomId}`);
    if (!response.ok) throw new Error('Error al cargar los asientos de la sala');
    return response.json();
  }
};

// Módulo de Ventas y Reservas
export const bookingsApi = {
  create: async (bookingData: Booking) => {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) throw new Error('Error al procesar la reserva');
    return response.json();
  }
};