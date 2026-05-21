"use client";

import { Button } from "@/components/ui/button";
import {
  getRiskColor,
  getRiskLevel,
  getRiskTextColor,
} from "@/lib/cvs-scoring";

interface CVSResultsProps {
  visualScore: number;
  ocularScore: number;
  extraOcularScore: number;
  symptomsFrequencyScore: number;
  screenTimeAssociationScore: number;
  totalScore: number;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function CVSResults({
  visualScore,
  ocularScore,
  extraOcularScore,
  symptomsFrequencyScore,
  screenTimeAssociationScore,
  totalScore,
  onSubmit,
  isSubmitting = false,
}: CVSResultsProps) {
  const riskLevel = getRiskLevel(totalScore);
  const colorClasses = getRiskColor(totalScore);
  const textColorClass = getRiskTextColor(totalScore);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden max-w-2xl mx-auto">
      <div className="bg-purple-600 text-white px-6 py-4">
        <h2 className="text-2xl font-semibold">Your CVS Assessment Results</h2>
      </div>

      <div className="p-8 space-y-8">
        {/* Score Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Score Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Visual Symptoms</p>
              <p className="text-3xl font-bold text-blue-600">{visualScore}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Ocular Surface</p>
              <p className="text-3xl font-bold text-green-600">{ocularScore}</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Extra-ocular</p>
              <p className="text-3xl font-bold text-orange-600">
                {extraOcularScore}
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">21.4 Frequency</p>
              <p className="text-3xl font-bold text-purple-600">
                {symptomsFrequencyScore}
              </p>
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">21.5 Association</p>
              <p className="text-3xl font-bold text-pink-600">
                {screenTimeAssociationScore}
              </p>
            </div>
          </div>
        </div>

        {/* Total Score */}
        <div className={`${colorClasses} border rounded-lg p-6`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Total CVS Score
              </p>
              <p className={`text-4xl font-bold ${textColorClass}`}>
                {totalScore}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Risk Level
              </p>
              <p className={`text-2xl font-bold ${textColorClass}`}>
                {riskLevel}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="border-t pt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recommendations
          </h3>
          <div className="space-y-3 text-gray-700">
            {totalScore <= 2 && (
              <>
                <p>✓ Your eyes appear to be in good condition</p>
                <p>
                  ✓ Continue maintaining good screen habits and eye care
                  practices
                </p>
                <p>✓ Take regular breaks following the 20-20-20 rule</p>
              </>
            )}
            {totalScore > 2 && totalScore <= 4 && (
              <>
                <p>• You may experience mild CVS symptoms</p>
                <p>• Increase frequency of breaks during screen use</p>
                <p>• Consider using artificial tears if experiencing dryness</p>
                <p>• Evaluate your workstation ergonomics</p>
              </>
            )}
            {totalScore > 4 && totalScore <= 6 && (
              <>
                <p>• You may experience moderate CVS symptoms</p>
                <p>• Take frequent breaks (20 minutes every 1-2 hours)</p>
                <p>• Use lubricating eye drops regularly</p>
                <p>• Optimize lighting and reduce glare</p>
                <p>• Consider consulting an eye care professional</p>
              </>
            )}
            {totalScore > 6 && (
              <>
                <p>• You may experience severe CVS symptoms</p>
                <p>
                  • It is strongly recommended to consult an eye care
                  professional
                </p>
                <p>• Take frequent breaks every 30 minutes</p>
                <p>• Use prescribed eye drops and protective eyewear</p>
                <p>• Consider modifying your screen time or work schedule</p>
              </>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-900">
            <strong>Disclaimer:</strong> This assessment is for informational
            purposes only and should not replace professional medical advice.
            Please consult an eye care professional for proper diagnosis and
            treatment.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 text-lg"
          >
            {isSubmitting ? "Submitting..." : "Submit & Save Results"}
          </Button>
        </div>
      </div>
    </div>
  );
}
