'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/db'

export default function AuditPage() {
  const { id } = useParams()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [summary, setSummary] = useState('')

  useEffect(() => {
    async function fetchAudit() {
      const { data, error } = await supabase
        .from('audits')
        .select('*')
        .eq('id', id)
        .single()
      if (!error && data) {
        setResult(data.results)
        setSummary(
          data.results.isOptimal
            ? 'Your AI stack is well optimized. You are spending efficiently across your tools.'
            : 'Based on your usage, there are significant savings available by adjusting your current plans.'
        )
      }
      setLoading(false)
    }
    if (id) fetchAudit()
  }, [id])

  const handleLeadSubmit = async () => {
    if (!email) return
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, auditId: id }),
    })
    setSubmitted(true)
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-green-400 text-xl animate-pulse">
        Analyzing your AI spend...
      </p>
    </div>
  )

  if (!result) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-red-400 text-xl">Audit not found.</p>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold text-center text-green-400 mb-6">
          Your AI Spend Audit
        </h1>

        {/* Hero Savings */}
        <div className="bg-gray-900 border border-green-700 rounded-2xl p-6 text-center mb-6">
          {result.isOptimal ? (
            <div>
              <p className="text-4xl mb-2">✅</p>
              <p className="text-2xl font-bold text-green-300">
                You are spending well!
              </p>
              <p className="text-gray-400 mt-2">
                Your AI stack looks optimized.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-400 mb-1 text-sm uppercase tracking-wide">
                Potential Monthly Savings
              </p>
              <p className="text-6xl font-black text-green-400">
                ${result.totalMonthlySavings}
              </p>
              <p className="text-2xl text-green-300 mt-1">
                ${result.totalAnnualSavings} / year
              </p>
            </div>
          )}
        </div>

        {/* AI Summary */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
            AI Summary
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Per Tool Breakdown */}
        <h2 className="text-xl font-bold text-green-300 mb-3">
          Tool Breakdown
        </h2>

        {result.recommendations.map((rec: any) => (
          <div
            key={rec.toolName}
            className="bg-gray-900 rounded-xl p-4 mb-3 border border-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold capitalize text-white">
                {rec.toolName.replace(/_/g, ' ')}
              </span>
              {rec.potentialSaving > 0 ? (
                <span className="text-green-400 font-bold text-sm">
                  Save ${rec.potentialSaving}/mo
                </span>
              ) : (
                <span className="text-gray-500 text-xs">Optimal</span>
              )}
            </div>
            <p className="text-blue-300 text-sm mb-1">
              → {rec.recommendedAction}
            </p>
            <p className="text-gray-500 text-xs">{rec.reason}</p>
          </div>
        ))}

        {/* Credex CTA */}
        {result.totalMonthlySavings > 100 && (
          <div className="bg-blue-950 border border-blue-600 rounded-xl p-4 mb-6 mt-4">
            <p className="font-bold text-blue-300 mb-1">
              Save even more with Credex
            </p>
            <p className="text-sm text-gray-300 mb-3">
              Credex offers discounted AI credits for Cursor, Claude,
              and ChatGPT Enterprise sourced from companies that
              overforecast. Book a free consultation.
            </p>
            <a
              href="https://credex.rocks"
              target="_blank"
              className="block text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-all"
            >
              Book Free Consultation
            </a>
          </div>
        )}

        {/* Email Capture */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          {!submitted ? (
            <div>
              <p className="font-semibold text-green-300 mb-1">
                Get your full report by email
              </p>
              <p className="text-xs text-gray-400 mb-3">
                We will send your audit summary and notify you when
                new savings apply to your stack.
              </p>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-3 mb-2 text-white border border-gray-700"
              />
              <button
                onClick={handleLeadSubmit}
                className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition-all"
              >
                Send My Report
              </button>
            </div>
          ) : (
            <p className="text-center text-green-300 font-bold py-2">
              Report sent! Check your inbox.
            </p>
          )}
        </div>

        {/* Share Button */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            alert('Link copied to clipboard!')
          }}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl mb-4 transition-all"
        >
          Copy Shareable Link
        </button>

        <a
          href="/"
          className="block text-center text-gray-500 hover:text-white text-sm transition-all"
        >
          Run another audit
        </a>

      </div>
    </main>
  )
}