// Scoring utility for medical questionnaire
export type RiskLevel = 'Low' | 'Moderate' | 'High'

export interface ScoringResult {
  score: number
  riskLevel: RiskLevel
}

/**
 * Calculate score and risk level based on selected symptoms
 * Scoring: Each symptom counts as 1 point
 * Risk Levels:
 * - Low: 0-5 points
 * - Moderate: 6-10 points
 * - High: 11+ points
 */
export function calculateScore(symptoms: string[]): ScoringResult {
  const score = symptoms.length

  let riskLevel: RiskLevel = 'Low'
  if (score >= 11) {
    riskLevel = 'High'
  } else if (score >= 6) {
    riskLevel = 'Moderate'
  }

  return {
    score,
    riskLevel,
  }
}

/**
 * Get color based on risk level for UI display
 */
export function getRiskColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case 'Low':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Moderate':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'High':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}
