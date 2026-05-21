'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

const SYMPTOM_OPTIONS = [
  { id: 'fever', label: 'Fever' },
  { id: 'cough', label: 'Persistent Cough' },
  { id: 'fatigue', label: 'Fatigue or Weakness' },
  { id: 'headache', label: 'Headache' },
  { id: 'body-ache', label: 'Body Aches' },
  { id: 'sore-throat', label: 'Sore Throat' },
  { id: 'shortness-breath', label: 'Shortness of Breath' },
  { id: 'chest-pain', label: 'Chest Pain or Pressure' },
  { id: 'nausea', label: 'Nausea or Vomiting' },
  { id: 'diarrhea', label: 'Diarrhea' },
  { id: 'loss-appetite', label: 'Loss of Appetite' },
  { id: 'chills', label: 'Chills' },
  { id: 'confusion', label: 'Confusion or Difficulty Concentrating' },
  { id: 'dizziness', label: 'Dizziness' },
]

interface SymptomsStepProps {
  onNext: (symptoms: string[]) => void
  onBack: () => void
  initialSymptoms?: string[]
}

export function SymptomsStep({
  onNext,
  onBack,
  initialSymptoms = [],
}: SymptomsStepProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(initialSymptoms)

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms((prev) => [...prev, symptomId])
    } else {
      setSelectedSymptoms((prev) => prev.filter((id) => id !== symptomId))
    }
  }

  const handleSubmit = () => {
    onNext(selectedSymptoms)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-lg">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Symptom Assessment</h1>
            <p className="text-gray-600">Step 2 of 3 - Select any symptoms you are currently experiencing</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Selected symptoms: <strong>{selectedSymptoms.length}</strong> out of {SYMPTOM_OPTIONS.length}
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SYMPTOM_OPTIONS.map((symptom) => (
                <div key={symptom.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={symptom.id}
                    checked={selectedSymptoms.includes(symptom.id)}
                    onCheckedChange={(checked) =>
                      handleSymptomChange(symptom.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={symptom.id}
                    className="cursor-pointer font-medium text-gray-700"
                  >
                    {symptom.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {selectedSymptoms.length === 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-900">
                You haven&apos;t selected any symptoms. If you are not experiencing any symptoms, you can proceed to the results.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Next: Results
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
