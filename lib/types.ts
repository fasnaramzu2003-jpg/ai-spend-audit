export type ToolName =
  | 'cursor'
  | 'github_copilot'
  | 'claude'
  | 'chatgpt'
  | 'anthropic_api'
  | 'openai_api'
  | 'gemini'
  | 'windsurf'

export interface ToolInput {
  name: ToolName
  plan: string
  seats: number
  monthlySpend: number
}

export interface AuditInput {
  tools: ToolInput[]
  teamSize: number
  useCase: 'coding' | 'writing' | 'data' | 'research' | 'mixed'
}

export interface ToolRecommendation {
  toolName: ToolName
  currentSpend: number
  recommendedAction: string
  potentialSaving: number
  reason: string
}

export interface AuditResult {
  recommendations: ToolRecommendation[]
  totalMonthlySavings: number
  totalAnnualSavings: number
  isOptimal: boolean
}