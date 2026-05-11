import { NextRequest, NextResponse } from 'next/server'
import { runAudit } from '@/lib/audit'
import { supabase } from '@/lib/db'
import { AuditInput } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const body: AuditInput = await req.json()

    if (!body.tools || body.tools.length === 0) {
      return NextResponse.json(
        { error: 'No tools provided' },
        { status: 400 }
      )
    }

    const result = runAudit(body)

    const { data, error } = await supabase
      .from('audits')
      .insert({
        tools: body.tools,
        results: result,
        total_monthly_savings: result.totalMonthlySavings,
        total_annual_savings: result.totalAnnualSavings,
        use_case: body.useCase,
        team_size: body.teamSize,
        is_public: true,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ auditId: data.id, result })
  } catch (err) {
    console.error('Audit error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}