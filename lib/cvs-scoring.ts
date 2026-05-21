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
  symptomsFrequency: number;
  screenTimeAssociation: number;
  total: number;
}

export interface RecommendationBand {
  min: number;
  max?: number;
  label: string;
  status: string;
  recommendations: string[];
}

function calculateThreeOptionScore(
  selectedValue: string,
  firstOption: string,
  secondOption: string,
  thirdOption: string,
): number {
  if (selectedValue === firstOption) return 0;
  if (selectedValue === secondOption) return 1;
  if (selectedValue === thirdOption) return 3;
  return 0;
}

export function calculateSymptomsFrequencyScore(value: string): number {
  return calculateThreeOptionScore(value, "Rare", "Infrequent", "Frequent");
}

export function calculateScreenTimeAssociationScore(value: string): number {
  return calculateThreeOptionScore(value, "Never", "Sometimes", "Always");
}

export function calculateTotalScore(
  visualScore: number,
  ocularScore: number,
  extraOcularScore: number,
  symptomsFrequency: string = "",
  screenTimeAssociation: string = "",
): CVSScores {
  const symptomsFrequencyScore =
    calculateSymptomsFrequencyScore(symptomsFrequency);
  const screenTimeAssociationScore = calculateScreenTimeAssociationScore(
    screenTimeAssociation,
  );

  return {
    visualSymptoms: visualScore,
    ocularSurface: ocularScore,
    extraOcular: extraOcularScore,
    symptomsFrequency: symptomsFrequencyScore,
    screenTimeAssociation: screenTimeAssociationScore,
    total:
      visualScore +
      ocularScore +
      extraOcularScore +
      symptomsFrequencyScore +
      screenTimeAssociationScore,
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

export function getRecommendationBand(totalScore: number): RecommendationBand {
  if (totalScore <= 0) {
    return {
      min: 0,
      max: 0,
      label: "0 points",
      status: "Normal subject",
      recommendations: ["Follow Iqbal's instructions as prophylactic measures"],
    };
  }

  if (totalScore <= 2) {
    return {
      min: 1,
      max: 2,
      label: "1-2 points",
      status: "Not CVS-case",
      recommendations: [
        "Repeat CVS-Smart every 6 months for check-up",
        "Follow Iqbal's instructions to improve your score to 0 points",
      ],
    };
  }

  if (totalScore <= 4) {
    return {
      min: 3,
      max: 4,
      label: "3-4 points",
      status: "Low probability",
      recommendations: [
        "Repeat CVS-Smart every 6 months for check-up",
        "Reduce your screen-time",
        "Follow Iqbal's instructions",
      ],
    };
  }

  if (totalScore <= 6) {
    return {
      min: 5,
      max: 6,
      label: "5-6 points",
      status: "High probability",
      recommendations: [
        "Consult your ophthalmologist or optometrist to confirm or exclude CVS diagnosis",
        "In case you are diagnosed as a positive CVS-case, please receive the appropriate treatment",
        "If you are diagnosed as a negative CVS-case, please repeat CVS-Smart every 6 months for check-up",
        "Reduce your screen-time",
        "Follow Iqbal's instructions",
      ],
    };
  }

  return {
    min: 7,
    max: 10,
    label: "7-10 points",
    status: "Positive CVS-case (CVS diagnosis is confirmed)",
    recommendations: [
      "Consult your ophthalmologist or optometrist to receive the appropriate treatment",
      "Reduce your screen-time",
      "Follow Iqbal's instructions",
      "If you already have a chronic eye disease or pathology, or previous eye surgery, this diagnosis might be inaccurate in your condition",
    ],
  };
}
