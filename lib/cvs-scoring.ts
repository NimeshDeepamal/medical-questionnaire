// CVS Questionnaire Scoring Logic
// Score calculation: 0 selections = 0, 1 selection = 1, 2+ selections = 2

export function calculateSectionScore(selectedItems: string[]): number {
  if (!selectedItems || selectedItems.length === 0) {
    return 0; // No selections = Score 0
  } else if (selectedItems.length === 1) {
    return 1; // One selection = Score 1
  } else {
    return 2; // Two or more selections = Score 2
  }
}

export interface CVSScores {
  visualSymptoms: number;
  ocularSurface: number;
  extraOcular: number;
  total: number;
}

export function calculateTotalScore(
  visualScore: number,
  ocularScore: number,
  extraOcularScore: number
): CVSScores {
  return {
    visualSymptoms: visualScore,
    ocularSurface: ocularScore,
    extraOcular: extraOcularScore,
    total: visualScore + ocularScore + extraOcularScore,
  };
}

export function getRiskLevel(totalScore: number): string {
  if (totalScore <= 2) {
    return "No CVS Symptoms";
  } else if (totalScore <= 4) {
    return "Mild CVS";
  } else if (totalScore <= 6) {
    return "Moderate CVS";
  } else {
    return "Severe CVS";
  }
}

export function getRiskColor(totalScore: number): string {
  if (totalScore <= 2) {
    return "bg-green-50 border-green-200";
  } else if (totalScore <= 4) {
    return "bg-yellow-50 border-yellow-200";
  } else if (totalScore <= 6) {
    return "bg-orange-50 border-orange-200";
  } else {
    return "bg-red-50 border-red-200";
  }
}

export function getRiskTextColor(totalScore: number): string {
  if (totalScore <= 2) {
    return "text-green-900";
  } else if (totalScore <= 4) {
    return "text-yellow-900";
  } else if (totalScore <= 6) {
    return "text-orange-900";
  } else {
    return "text-red-900";
  }
}
