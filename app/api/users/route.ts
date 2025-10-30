import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(request: Request) {
	try {
		console.log('🔧 POST /api/users called')
		const supabaseAdmin = getSupabaseAdmin()
		if (!supabaseAdmin) {
			console.error('❌ supabaseAdmin is null!')
			return NextResponse.json({ error: 'Server is not configured with service role key' }, { status: 500 })
		}

		const body = await request.json().catch(() => ({}))
		console.log('📦 Request body:', body)
		const {
			name,
			email,
			phone = null,
			course = 'General',
			progress = 0,
			enroll_date,
			last_activity = 'Hozir',
			status = 'active',
			certificates = 0,
			attendance = 0,
			avatar = '/placeholder.svg?height=40&width=40'
		} = body || {}

		if (!name || !email) {
			return NextResponse.json({ error: 'Ism va email majburiy' }, { status: 400 })
		}

		const nowIsoDate = new Date().toISOString().slice(0, 10)
		const insertData = {
			name,
			email,
			phone,
			course,
			progress,
			enroll_date: enroll_date || nowIsoDate,
			last_activity,
			status,
			certificates,
			attendance,
			avatar,
		}

		console.log('💾 Inserting to Supabase:', insertData)
		console.log('🔍 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
		console.log('🔍 Has service role key:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
		
		const { data, error } = await supabaseAdmin
			.from('users')
			.insert([insertData])
			.select()
			.single()

		if (error) {
			console.error('❌ Supabase error:', error)
			const msg = String(error.message || '')
			if (msg.includes('duplicate key') || msg.includes('users_email_key')) {
				return NextResponse.json({ error: 'Bu email allaqachon mavjud' }, { status: 409 })
			}
			if (msg.includes('relation "users" does not exist')) {
				return NextResponse.json({ error: 'Supabase users jadvali topilmadi' }, { status: 500 })
			}
			return NextResponse.json({ error: msg || 'Insert error' }, { status: 400 })
		}

		console.log('✅ User created:', data)
		return NextResponse.json({ user: data }, { status: 201 })
	} catch (err: any) {
		return NextResponse.json({ error: err?.message || 'Unexpected server error' }, { status: 500 })
	}
}

export async function GET() {
	try {
		const supabaseAdmin = getSupabaseAdmin()
		if (!supabaseAdmin) {
			return NextResponse.json({ error: 'Server is not configured with service role key' }, { status: 500 })
		}

		const { data, error } = await supabaseAdmin
			.from('users')
			.select('*')
			.order('enroll_date', { ascending: false })
			.limit(100)

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 })
		}

		return NextResponse.json({ users: data || [] })
	} catch (err: any) {
		return NextResponse.json({ error: err?.message || 'Unexpected server error' }, { status: 500 })
	}
}
