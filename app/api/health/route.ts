import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
	try {
		const url = process.env.NEXT_PUBLIC_SUPABASE_URL
		const hasAnon = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
		const admin = getSupabaseAdmin()
		const hasService = Boolean(admin)

		let dbOk = false
		let dbError: string | null = null
		if (admin) {
			const { error } = await admin.from('users').select('id').limit(1)
			if (error) dbError = error.message
			else dbOk = true
		}

		return NextResponse.json({
			ok: true,
			env: {
				url: Boolean(url),
				hasAnon,
				hasService,
			},
			database: {
				ok: dbOk,
				error: dbError,
			},
		})
	} catch (e: any) {
		return NextResponse.json({ ok: false, error: e?.message || 'unexpected error' }, { status: 500 })
	}
}




