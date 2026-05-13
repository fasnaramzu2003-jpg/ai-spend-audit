import { AuditInput, AuditResult, ToolRecommendation } from './types'

const PRICING = {
  cursor: { hobby: 0, pro: 20, business: 40 },
  github_copilot: { individual: 10, business: 19, enterprise: 39 },
  claude: { free: 0, pro: 20, max: 100, team: 30 },
  chatgpt: { free: 0, plus: 20, team: 30, enterprise: 60 },
  anthropic_api: { pay_as_you_go: 0 },
  openai_api: { pay_as_you_go: 0 },
  gemini: { free: 0, pro: 20, ultra: 300 },
  windsurf: { free: 0, pro: 15, team: 35 },
}

export function runAudit(input: AuditInput): AuditResult {
  const recommendations: ToolRecommendation[] = []
  let totalMonthlySavings = 0

  for (const tool of input.tools) {
    const currentSpend = tool.monthlySpend
    let saving = 0
    let action = 'No change needed'
    let reason = 'Your current plan appears optimal.'

    // Cursor checks
    if (tool.name === 'cursor') {
      if (tool.plan === 'business' && tool.seats <= 2) {
        saving = (PRICING.cursor.business - PRICING.cursor.pro) * tool.seats
        action = 'Downgrade to Cursor Pro'
        reason = "Cursor Pro is cheaper for small teams. "
      }
    }

    // GitHub Copilot checks
    if (tool.name === 'github_copilot') {
      if (tool.plan === 'business' && tool.seats === 1) {
        saving = (PRICING.github_copilot.business - PRICING.github_copilot.individual)
        action = 'Switch to Individual plan'
        reason = 'Single user does not need Business plan features.'
      }
    }

    // ChatGPT checks
    if (tool.name === 'chatgpt') {
      if (tool.plan === 'team' && tool.seats <= 2) {
        saving = currentSpend - (PRICING.chatgpt.plus * tool.seats)
        action = 'Switch to Plus individual plans'
        reason = `${tool.seats} users on Plus costs less than Team plan.`
      }
    }

    // Claude checks
    if (tool.name === 'claude') {
      if (tool.plan === 'team' && tool.seats === 1) {
        saving = PRICING.claude.team - PRICING.claude.pro
        action = 'Downgrade to Claude Pro'
        reason = 'Single user on Team plan — Pro has same features for less.'
      }
    }

    totalMonthlySavings += saving > 0 ? saving : 0

    recommendations.push({
      toolName: tool.name,
      currentSpend,
      recommendedAction: saving > 0 ? action : 'Keep current plan',
      potentialSaving: saving > 0 ? saving : 0,
      reason,
    })
  }

  return {
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    isOptimal: totalMonthlySavings === 0,
  }
}