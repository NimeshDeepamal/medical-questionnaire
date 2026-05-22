'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { calculateScore, getRiskColor } from '@/lib/scoring'
import type { RiskLevel } from '@/lib/scoring'

interface ResultsStepProps {
  symptoms: string[]
  onBack: () => void
  onSubmit: (notes: string) => Promise<void>
  isSubmitting?: boolean
}

interface RiskIndicator {
  level: RiskLevel
  description: string
  recommendations: string[]
}

const RISK_INDICATORS: Record<RiskLevel, RiskIndicator> = {
  Low: {
    level: 'Low',
    description:
      'You are experiencing minimal symptoms. Continue monitoring your health and maintain healthy lifestyle habits.',
    recommendations: [
      'Monitor your symptoms daily',
      'Get adequate rest and sleep',
      'Stay hydrated',
      'Eat nutritious meals',
      'Practice regular exercise',
    ],
  },
  Moderate: {
    level: 'Moderate',
    description:
      'You are experiencing several symptoms. It is recommended to consult with a healthcare professional for proper evaluation and guidance.',
    recommendations: [
      'Schedule an appointment with your doctor',
      'Monitor symptoms for any changes',
      'Keep a symptom diary',
      'Follow prescribed treatments',
      'Avoid activities that worsen symptoms',
    ],
  },
  High: {
    level: 'High',
    description:
      'You are experiencing multiple significant symptoms. Please seek immediate medical attention or contact a healthcare professional urgently.',
    recommendations: [
      'Contact your healthcare provider immediately',
      'Consider visiting an urgent care facility',
      'Call emergency services if experiencing severe symptoms',
      'Do not delay seeking professional medical advice',
      'Keep emergency contacts readily available',
    ],
  },
}

export function ResultsStep({
  symptoms,
  onBack,
  onSubmit,
  isSubmitting = false,
}: ResultsStepProps) {
  const [additionalNotes, setAdditionalNotes] = useState('')
  const { score, riskLevel } = calculateScore(symptoms)
  const riskInfo = RISK_INDICATORS[riskLevel]

  const handleSubmit = async () => {
    await onSubmit(additionalNotes)
  }

  const riskColorClass = getRiskColor(riskLevel)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-lg">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Your Assessment Results</h1>
            <p className="text-gray-600">Step 3 of 3</p>
          </div>

          {/* Risk Level Card */}
          <div className={`border-2 rounded-lg p-6 ${riskColorClass}`}>
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wide">Risk Level</p>
              <h2 className="text-4xl font-bold">{riskLevel}</h2>
              <p className="text-sm">Score: {score} symptoms detected</p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Score Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Symptoms Selected:</span>
                <span className="font-semibold text-2xl">{score}</span>
              </div>
              <div className="text-sm text-gray-600">
                <div>• Low Risk: 0-5 symptoms</div>
                <div>• Moderate Risk: 6-10 symptoms</div>
                <div>• High Risk: 11+ symptoms</div>
              </div>
            </div>
          </div>

          {/* Risk Description */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Assessment Summary</h3>
            <p className="text-gray-700">{riskInfo.description}</p>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Recommended Actions</h3>
            <ul className="space-y-2">
              {riskInfo.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-semibold text-blue-600 mt-0.5">→</span>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="font-semibold">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any additional information or notes about your health..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="min-h-24"
            />
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <strong>Important Disclaimer:</strong> This assessment is for informational purposes only. It is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis, treatment, and medical decisions.
            </p>
          </div>

          {/* <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
            </Button>
          </div> */}
        </div>
      </Card>
    </div>
  )
}
