"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { calculateSectionScore } from "@/lib/cvs-scoring";
import { FormSectionHeader } from "./form-section-header";

interface SymptomsSectionProps {
  sectionNumber: number;
  sectionTitle: string;
  symptomsList: string[];
  scoreOptions: { label: string; value: string }[];
  selectedSymptoms: string[];
  selectedScore: string;
  onSymptomChange: (symptoms: string[]) => void;
  onScoreChange: (score: string) => void;
  showValidationErrors?: boolean;
}

export function CVSSymptomsSection({
  sectionNumber,
  sectionTitle,
  symptomsList,
  scoreOptions,
  selectedSymptoms,
  selectedScore,
  onSymptomChange,
  onScoreChange,
  showValidationErrors = false,
}: SymptomsSectionProps) {
  const score = calculateSectionScore(selectedSymptoms);

  const toggleSymptom = (symptom: string) => {
    const updated = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter((s) => s !== symptom)
      : [...selectedSymptoms, symptom];
    onSymptomChange(updated);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border ${
        showValidationErrors && selectedSymptoms.length === 0
          ? "border-red-300 bg-red-50/60"
          : "border-gray-200"
      }`}
    >
      <FormSectionHeader sectionTitle={`${sectionNumber}. ${sectionTitle}`} />

      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <p
          className={`font-semibold ${showValidationErrors && selectedSymptoms.length === 0 ? "text-red-700" : "text-gray-800"}`}
        >
          Did you experience any of the following symptoms in the past 4 weeks?(Skip if you don't have any symptoms)
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <div className="space-y-3">
            {symptomsList.map((symptom) => (
              <div key={symptom} className="flex items-center space-x-3">
                <Checkbox
                  id={symptom}
                  checked={selectedSymptoms.includes(symptom)}
                  onCheckedChange={() => toggleSymptom(symptom)}
                  className="border-2 border-gray-400 data-[state=checked]:border-blue-600"
                />
                <label
                  htmlFor={symptom}
                  className="text-gray-700 cursor-pointer"
                >
                  {symptom}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
