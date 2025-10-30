import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
	const admin = getSupabaseAdmin()
	if (!admin) return NextResponse.json({ error: 'Service role key missing' }, { status: 500 })
	// Prefer the stats view if present, fallback to raw plans
	let { data, error } = await admin
		.from('plan_stats')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(100)
	if (error) {
		// Fallback to base table
		const fb = await admin
			.from('plans')
			.select('*')
			.order('created_at', { ascending: false })
			.limit(100)
		data = fb.data as any
		error = fb.error as any
	}
	if (error) return NextResponse.json({ error: error.message }, { status: 400 })
	return NextResponse.json({ plans: data })
}

export async function POST(request: Request) {
	try {
		const admin = getSupabaseAdmin()
		if (!admin) return NextResponse.json({ error: 'Service role key missing' }, { status: 500 })
		const body = await request.json().catch(() => ({}))
		const { name, duration_days, price } = body || {}
		if (!name || !duration_days || price == null) {
			return NextResponse.json({ error: 'name, duration_days va price majburiy' }, { status: 400 })
		}
		// Minimal insert: faqat mavjud ustunlar (ko'p instansiyalarda access_rules/freeze_allowed yo'q)
		const insertData = { name, duration_days, price }
		const { data, error } = await admin
			.from('plans')
			.insert([insertData])
			.select()
			.single()
		if (error) return NextResponse.json({ error: error.message }, { status: 400 })
		return NextResponse.json({ plan: data }, { status: 201 })
	} catch (e: any) {
		return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
	}
}


