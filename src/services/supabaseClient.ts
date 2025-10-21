import { createClient } from '@supabase/supabase-js';

// As chaves foram fornecidas pelo usuário e são de um ambiente de teste.
const supabaseUrl = 'https://cqfwmbiocmzzvsegdmid.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxZndtYmlvY216enZzZWdkbWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNDMyMjAsImV4cCI6MjA3NjYxOTIyMH0.aG9g3lztbHtsD8jZbP4EnA-exsvTc2ELTtj2wozwVjc';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);