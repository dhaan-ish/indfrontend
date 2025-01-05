import { createClient } from '@supabase/supabase-js';

// Supabase URL and Key (replace with your actual Supabase URL and API key)
const supabaseUrl = 'https://lsqlmjtyfvnsuuvvhxog.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzcWxtanR5ZnZuc3V1dnZoeG9nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjA3MTA3MywiZXhwIjoyMDUxNjQ3MDczfQ.WNPEtc7-SNXuB5W7va6KeRh7q17RxdNekPcprgfOz-E';
export const supabase = createClient(supabaseUrl, supabaseKey);
