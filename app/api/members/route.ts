import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
	const admin = getSupabaseAdmin()
	if (!admin) return NextResponse.json({ error: 'Service role key missing' }, { status: 500 })
	const { data, error } = await admin
		.from('members')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(50)
	if (error) return NextResponse.json({ error: error.message }, { status: 400 })
	return NextResponse.json({ members: data })
}

export async function POST(request: Request) {
	try {
		const admin = getSupabaseAdmin()
		if (!admin) return NextResponse.json({ error: 'Service role key missing' }, { status: 500 })
		const body = await request.json().catch(() => ({}))
		const { full_name, phone, email = null, gender = null, dob = null, medical_notes = null, avatar = null, status = 'active' } = body || {}
		if (!full_name || !phone) return NextResponse.json({ error: 'full_name va phone majburiy' }, { status: 400 })
		const insertData = { full_name, phone, email, gender, dob, medical_notes, avatar, status }
		const { data, error } = await admin
			.from('members')
			.insert([insertData])
			.select()
			.single()
		if (error) return NextResponse.json({ error: error.message }, { status: 400 })
		return NextResponse.json({ member: data }, { status: 201 })
	} catch (e: any) {
		return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
	}
}


