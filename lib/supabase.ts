import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Client-side uchun anon key orqali umumiy klient
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side: kerak bo'lganda service role bilan yangi klient yaratuvchi funksiya
export function getSupabaseAdmin() {
	const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
	if (!serviceKey) return null
	return createClient(supabaseUrl, serviceKey, {
		auth: { autoRefreshToken: false, persistSession: false },
	})
}

