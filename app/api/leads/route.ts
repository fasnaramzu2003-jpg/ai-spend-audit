import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, auditId, company, role } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('leads')
      .insert({
        email,
        audit_id: auditId,
        company: company || null,
        role: role || null,
        email_sent: false,
      })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}