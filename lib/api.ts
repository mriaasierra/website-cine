// WEBSITE-CINE / lib / api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// --- 1. DEFINICIÓN DE TIPOS (Interfaces para TypeScript) ---

export interface Movie {
  movie_id: number;
  title: string;
  director: string;
  duration: string; 
  poster_url: string;
  status: boolean | string; // Permite tanto booleanos como texto ('Activa') sin romper la compilación
  genre_id: number;
  synopsis?: string;        // Opcional para solucionar el error en app/page.tsx
  id?: number;              // Opcional para solucionar el error de keys en app/page.tsx
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
  room_status: string; 
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
  booking_status: string; 
  screening_id: number;
  user_id: number; 
}

// Interfaz agregada para solucionar el error en app/reservas/page.tsx
export interface SeatAssignment {
  seat_id: number;
  booking_id: number;
  row_number?: string | number;
  seat_number?: number;
  [key: string]: any; // Permite cualquier otra propiedad extra que use tu vista de reservas
}


// --- 2. OBJETOS DE LA API (Endpoints del Backend) ---

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

// Objeto agregado para solucionar el error inicial de la cartelera
export const genresApi = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/genres`);
    if (!response.ok) throw new Error('Error al cargar géneros');
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

// Módulo de Reservas
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