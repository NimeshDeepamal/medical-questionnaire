'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const handleClick = () => {
    console.log("[v0] Welcome Start Assessment clicked")
    onNext()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-lg">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Health Screening Questionnaire</h1>
            <p className="text-gray-600 text-lg">Professional Medical Assessment Tool</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">About This Screening</h2>
            <p className="text-gray-700">
              This comprehensive health questionnaire is designed to help assess your current health status and identify potential risk factors. The assessment typically takes 5-10 minutes to complete.
            </p>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <span className="font-semibold text-blue-600 mt-0.5">✓</span>
                <span>Confidential and secure data collection</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-blue-600 mt-0.5">✓</span>
                <span>Multi-step assessment with clear guidance</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-blue-600 mt-0.5">✓</span>
                <span>Instant risk level assessment</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <strong>Disclaimer:</strong> This screening tool is for informational purposes only and should not be used as a substitute for professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">What to Expect</h3>
            <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
              <li>Personal Information - Basic demographics and contact details</li>
              <li>Symptom Assessment - Select any symptoms you are currently experiencing</li>
              <li>Results - Receive your instant risk level assessment</li>
              <li>Submission - Your data is securely stored for reference</li>
            </ol>
          </div>

          <Button
            onClick={handleClick}
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Start Assessment
          </Button>
        </div>
      </Card>
    </div>
  )
}
