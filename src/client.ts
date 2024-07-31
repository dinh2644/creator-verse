import { createClient } from "@supabase/supabase-js";
const URL: string = import.meta.env.VITE_APP_SUPABASE_URL;
const API_KEY: string = import.meta.env.VITE_APP_SUPABASE_KEY;
export const supabase = createClient(URL, API_KEY);