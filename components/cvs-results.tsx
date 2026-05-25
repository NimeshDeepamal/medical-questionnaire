"use client";

import { Button } from "@/components/ui/button";
import {
  getRecommendationBand,
  getRiskColor,
  getRiskTextColor,
} from "@/lib/cvs-scoring";

interface CVSResultsProps {
  visualScore: number;
  ocularScore: number;
  extraOcularScore: number;
  symptomsFrequencyScore: number;
  screenTimeAssociationScore: number;
  totalScore: number;
  recommendationImageHref?: string;
  onSubmit: () => void;
  isSubmitting?: boolean;
  showSubmitButton?: boolean;
}

export function CVSResults({
  visualScore,
  ocularScore,
  extraOcularScore,
  symptomsFrequencyScore,
  screenTimeAssociationScore,
  totalScore,
  recommendationImageHref = "/img.jpeg",
  onSubmit,
  isSubmitting = false,
  showSubmitButton = true,
}: CVSResultsProps) {
  const colorClasses = getRiskColor(totalScore);
  const textColorClass = getRiskTextColor(totalScore);
  const recommendationBand = getRecommendationBand(totalScore);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden w-full max-w-2xl mx-auto">
      <div className="bg-purple-600 text-white px-4 sm:px-6 py-4">
        <h2 className="text-xl sm:text-2xl font-semibold leading-tight break-words">
          Your CVS Assessment Results
        </h2>
      </div>

      <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
        {/* Score Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Score Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 md:gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Visual Symptoms</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {visualScore}
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Ocular Surface</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {ocularScore}
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Extra-ocular</p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                {extraOcularScore}
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Frequency</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                {symptomsFrequencyScore}
              </p>
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 sm:p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Association</p>
              <p className="text-2xl sm:text-3xl font-bold text-pink-600">
                {screenTimeAssociationScore}
              </p>
            </div>
          </div>
        </div>

        {/* Total Score */}
        <div className={`${colorClasses} border rounded-lg p-4 sm:p-6`}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Total CVS Score
              </p>
              <p className={`text-4xl sm:text-5xl font-bold ${textColorClass}`}>
                {totalScore}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm font-medium text-gray-600 mb-2">
                CVS-case probability status
              </p>
              <p className={`text-xl sm:text-2xl font-bold ${textColorClass}`}>
                {recommendationBand.status}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mt-1">
                {recommendationBand.label}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="border-t pt-6 sm:pt-8 space-y-5 sm:space-y-6">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Recommendations
                </h3>
                <p className="text-sm text-gray-600">
                  {recommendationBand.label} · {recommendationBand.status}
                </p>
              </div>
              <div className="text-sm font-semibold text-gray-700">
                Total score: {totalScore}
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-dashed border-gray-300 bg-white p-3 sm:p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Iqbal protective measures reference
              </p>
              {recommendationImageHref ? (
                <a
                  href={recommendationImageHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
                >
                  Open reference image in new tab
                </a>
              ) : (
                <p className="text-sm text-gray-600">
                  Add an image URL or file path to show the protective measures
                  reference here.
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5">
              <h4 className="text-base font-semibold text-gray-800 mb-4">
                {recommendationBand.status}
              </h4>
              <div className="space-y-3 text-gray-700">
                {recommendationBand.recommendations.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-4 sm:p-5 bg-white">
              <h4 className="text-base font-semibold text-gray-800 mb-4">
                Score bands
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-red-700">
                    7-10 points:
                  </span>{" "}
                  Positive CVS-case
                </p>
                <p>
                  <span className="font-semibold text-orange-700">
                    5-6 points:
                  </span>{" "}
                  High probability
                </p>
                <p>
                  <span className="font-semibold text-green-700">
                    3-4 points:
                  </span>{" "}
                  Low probability
                </p>
                <p>
                  <span className="font-semibold text-blue-700">
                    1-2 points:
                  </span>{" "}
                  Not CVS-case
                </p>
                <p>
                  <span className="font-semibold text-purple-700">
                    0 points:
                  </span>{" "}
                  Normal subject
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-5">
          <p className="text-sm text-yellow-900">
            <strong>Disclaimer:</strong> This assessment is for informational
            purposes only and should not replace professional medical advice.
            Please consult an eye care professional for proper diagnosis and
            treatment.
          </p>
        </div>

        {/* Submit Button */}
        {showSubmitButton && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 text-base sm:text-lg"
            >
              {isSubmitting ? "Submitting..." : "Submit & Save Results"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
