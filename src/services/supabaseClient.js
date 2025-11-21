import { createClient } from '@supabase/supabase-js';

// Importar las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Crear el cliente de conexión y exportarlo
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
