'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface SuccessStepProps {
  submissionId: string
  riskLevel: string
}

export function SuccessStep({ submissionId, riskLevel }: SuccessStepProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-lg">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <div className="text-6xl font-bold text-green-600">✓</div>
            <h1 className="text-3xl font-bold text-gray-900">Assessment Submitted Successfully</h1>
            <p className="text-gray-600">Your health screening has been recorded</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4 text-left">
            <h2 className="font-semibold text-gray-900">Submission Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Submission ID:</span>
                <code className="bg-white px-3 py-1 rounded text-sm font-mono text-gray-900">
                  {submissionId.slice(0, 8)}...
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Risk Level:</span>
                <span className={`px-3 py-1 rounded font-semibold ${
                  riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                  riskLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {riskLevel}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Submitted:</span>
                <span className="text-gray-900 font-medium">{new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-gray-900 text-left">Next Steps</h3>
            <ul className="space-y-2 text-left text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Review the recommendations provided in your assessment results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Schedule an appointment with your healthcare provider if recommended</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Keep a copy of your submission ID for future reference</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span>Monitor your symptoms and seek immediate care if they worsen</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              If you experience emergency symptoms or significant health changes, please seek immediate medical attention by contacting emergency services.
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Complete New Assessment
              </Button>
            </Link>
            <Link href="/admin" className="flex-1">
              <Button variant="outline" className="w-full">
                View Submissions (Admin)
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
