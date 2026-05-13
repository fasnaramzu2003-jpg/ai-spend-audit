import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('audits')
      .select('results, use_case, team_size')
      .eq('id', params.id)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { summary: getFallbackSummary(null) },
        { status: 200 }
      )
    }

    const result = data.results as any
    const summary = getFallbackSummary(result)

    return NextResponse.json({ summary })
  } catch {
    return NextResponse.json(
      { summary: getFallbackSummary(null) },
      { status: 200 }
    )
  }
}

function getFallbackSummary(result: any): string {
  if (!result) {
    return 'Your AI spend audit is complete. Review your results above to identify savings opportunities.'
  }
  if (result.isOptimal) {
    return 'Great news! Your AI tool stack appears well-optimized. You are on the right plans for your team size and use case. Keep monitoring as pricing changes frequently.'
  }
  const monthly = result.totalMonthlySavings
  const annual = result.totalAnnualSavings
  return 'Based on your current AI tool usage, you could save $' + monthly + ' per month ($' + annual + ' annually) by adjusting your plans. The biggest opportunities are in right-sizing your seats and switching to plans that match your actual usage.'
}