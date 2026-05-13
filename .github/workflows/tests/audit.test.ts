import { describe, it, expect } from 'vitest'
import { runAudit } from '../../../lib/audit'

describe('Audit Engine', () => {

  it('should return optimal when plans are correct', () => {
    const result = runAudit({
      tools: [{
        name: 'cursor',
        plan: 'pro',
        seats: 1,
        monthlySpend: 20
      }],
      teamSize: 1,
      useCase: 'coding'
    })
    expect(result.isOptimal).toBe(true)
    expect(result.totalMonthlySavings).toBe(0)
  })

  it('should detect cursor business overspend for small team', () => {
    const result = runAudit({
      tools: [{
        name: 'cursor',
        plan: 'business',
        seats: 2,
        monthlySpend: 80
      }],
      teamSize: 2,
      useCase: 'coding'
    })
    expect(result.totalMonthlySavings).toBeGreaterThan(0)
    expect(result.recommendations[0].potentialSaving).toBe(40)
  })

  it('should detect github copilot business overkill for solo user', () => {
    const result = runAudit({
      tools: [{
        name: 'github_copilot',
        plan: 'business',
        seats: 1,
        monthlySpend: 19
      }],
      teamSize: 1,
      useCase: 'coding'
    })
    expect(result.totalMonthlySavings).toBeGreaterThan(0)
    expect(result.recommendations[0].recommendedAction).toBe('Switch to Individual plan')
  })

  it('should calculate correct annual savings', () => {
    const result = runAudit({
      tools: [{
        name: 'cursor',
        plan: 'business',
        seats: 2,
        monthlySpend: 80
      }],
      teamSize: 2,
      useCase: 'coding'
    })
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12)
  })

  it('should handle multiple tools correctly', () => {
    const result = runAudit({
      tools: [
        {
          name: 'cursor',
          plan: 'business',
          seats: 2,
          monthlySpend: 80
        },
        {
          name: 'github_copilot',
          plan: 'business',
          seats: 1,
          monthlySpend: 19
        }
      ],
      teamSize: 2,
      useCase: 'coding'
    })
    expect(result.recommendations).toHaveLength(2)
    expect(result.totalMonthlySavings).toBeGreaterThan(0)
  })

  it('should return empty recommendations for empty tools', () => {
    const result = runAudit({
      tools: [],
      teamSize: 1,
      useCase: 'coding'
    })
    expect(result.recommendations).toHaveLength(0)
    expect(result.totalMonthlySavings).toBe(0)
  })

})