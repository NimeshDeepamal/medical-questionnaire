"use client";

import { CVSResults } from "@/components/cvs-results";
import { CVSSectionA } from "@/components/cvs-section-a";
import { CVSSectionB } from "@/components/cvs-section-b";
import { CVSSectionC } from "@/components/cvs-section-c";
import { CVSSectionD } from "@/components/cvs-section-d";
import { CVSSectionE } from "@/components/cvs-section-e";
import { CVSSymptomsSection } from "@/components/cvs-symptoms-section";
import { Button } from "@/components/ui/button";
import { calculateSectionScore, calculateTotalScore } from "@/lib/cvs-scoring";
import { useState } from "react";

const VISUAL_SYMPTOMS = [
  "Blurred vision",
  "Eye strain/fatigue",
  "Double vision",
  "Difficulty in refocusing the eye",
  "Near vision discomfort",
  "Unclear objects post screen use",
  "Glare/seeing halos of light",
  "Feeling diminution of vision",
  "Increased sensitivity to light",
];

const OCULAR_SURFACE_SYMPTOMS = [
  "Dry eyes",
  "Eye redness",
  "Eye irritation",
  "Foreign body sensation",
  "Burning sensation",
  "Itching",
  "Watery eye",
  "Eyelids feel heavy",
  "Frequent blinking",
];

const EXTRA_OCULAR_SYMPTOMS = [
  "Headache",
  "Neck pain",
  "Shoulder pain",
  "Back pain",
  "Joint pain in fingers",
  "Difficulty to write using pen",
  "Sleep disturbances",
  "Inattention",
];

export default function CVSQuestionnairePage() {
  const [currentSection, setCurrentSection] = useState<
    "start" | "a" | "b" | "c" | "symptoms" | "d" | "e" | "results"
  >("start");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Section A
    age: "",
    gender: "",
    faculty_of_study: "",

    // Section B
    digital_devices: [] as string[],
    digital_devices_other: "",
    consecutive_hours: "",
    screen_viewing_distance: "",
    regular_breaks: "",
    breaks_frequency: "",

    // Section C
    eye_strain_reduction: [] as string[],
    lighting_conditions: "",
    screen_position: "",
    sitting_posture: "",
    chair_support: "",
    neck_bending_frequency: "",
    device_holding_position: "",

    // Symptoms
    visual_symptoms: [] as string[],
    visual_symptoms_score: "",
    ocular_surface_symptoms: [] as string[],
    ocular_surface_score: "",
    extra_ocular_symptoms: [] as string[],
    extra_ocular_score: "",
    symptoms_frequency: "",
    associated_with_screen_use: "",

    // Section D
    eye_conditions: [] as string[],
    corrective_lenses: "",
    device_use_before_sleep: "",
    sleep_hours: "",
    eye_drops_usage: "",
    eye_drops_frequency: "",

    // Section E
    productivity_impact: "",
    consulted_eye_care: "",
    changed_study_habits: "",
    study_habit_changes_description: "",
    study_habit_changes_list: [] as string[],
    study_habit_frequency: "",
    study_habit_association: "",

    submit_confirmation: "",
  });

  const handleFieldChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateSection = (section: string): boolean => {
    const requiredFields: Record<string, string[]> = {
      a: ["age", "gender", "faculty_of_study"],
      b: [
        "digital_devices",
        "consecutive_hours",
        "screen_viewing_distance",
        "regular_breaks",
      ],
      c: [
        "eye_strain_reduction",
        "lighting_conditions",
        "screen_position",
        "sitting_posture",
        "chair_support",
        "neck_bending_frequency",
        "device_holding_position",
      ],
      symptoms: [
        "visual_symptoms",
        "ocular_surface_symptoms",
        "extra_ocular_symptoms",
        "symptoms_frequency",
        "associated_with_screen_use",
      ],
      d: [
        "eye_conditions",
        "corrective_lenses",
        "device_use_before_sleep",
        "sleep_hours",
        "eye_drops_usage",
      ],
      e: ["productivity_impact", "consulted_eye_care", "changed_study_habits"],
    };

    const fields = requiredFields[section] || [];

    return fields.every((field) => {
      const value = formData[field as keyof typeof formData];
      return Array.isArray(value) ? value.length > 0 : value !== "";
    });
  };

  const visualScore = calculateSectionScore(formData.visual_symptoms);
  const ocularScore = calculateSectionScore(formData.ocular_surface_symptoms);
  const extraOcularScore = calculateSectionScore(
    formData.extra_ocular_symptoms,
  );
  const scores = calculateTotalScore(
    visualScore,
    ocularScore,
    extraOcularScore,
    formData.symptoms_frequency,
    formData.associated_with_screen_use,
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...formData,
        visual_symptoms_score: visualScore,
        ocular_surface_score: ocularScore,
        extra_ocular_score: extraOcularScore,
        total_score: scores.total,
      };

      const response = await fetch("/api/questionnaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        alert("Submitted successfully!");
        window.location.href = "/";
      } else {
        alert("Submission error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* START */}
        {currentSection === "start" && (
          <div className="bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-4">CVS Questionnaire</h1>
            <Button onClick={() => setCurrentSection("a")}>Start</Button>
          </div>
        )}

        {/* A */}
        {currentSection === "a" && (
          <>
            <CVSSectionA data={formData} onChange={handleFieldChange} />
            <Button onClick={() => setCurrentSection("b")}>Next</Button>
          </>
        )}

        {/* B */}
        {currentSection === "b" && (
          <>
            <CVSSectionB data={formData} onChange={handleFieldChange} />
            <Button onClick={() => setCurrentSection("c")}>Next</Button>
          </>
        )}

        {/* C */}
        {currentSection === "c" && (
          <>
            <CVSSectionC data={formData} onChange={handleFieldChange} />
            <Button onClick={() => setCurrentSection("symptoms")}>Next</Button>
          </>
        )}

        {/* D */}
        {currentSection === "d" && (
          <>
            <CVSSectionD data={formData} onChange={handleFieldChange} />
            <Button onClick={() => setCurrentSection("e")}>Next</Button>
          </>
        )}

        {/* SYMPTOMS */}
        {currentSection === "symptoms" && (
          <>
            <CVSSymptomsSection
              sectionNumber={1}
              sectionTitle="Visual symptoms"
              symptomsList={VISUAL_SYMPTOMS}
              scoreOptions={[]}
              selectedSymptoms={formData.visual_symptoms}
              selectedScore={formData.visual_symptoms_score}
              onSymptomChange={(v) => handleFieldChange("visual_symptoms", v)}
              onScoreChange={(v) =>
                handleFieldChange("visual_symptoms_score", v)
              }
            />

            <Button onClick={() => setCurrentSection("d")}>Next</Button>
          </>
        )}

        {/* E */}
        {currentSection === "e" && (
          <>
            <CVSSectionE data={formData} onChange={handleFieldChange} />
            <Button onClick={() => setCurrentSection("results")}>
              View Results
            </Button>
          </>
        )}

        {/* RESULTS */}
        {currentSection === "results" && (
          <>
            <CVSResults
              visualScore={visualScore}
              ocularScore={ocularScore}
              extraOcularScore={extraOcularScore}
              symptomsFrequencyScore={scores.symptomsFrequency}
              screenTimeAssociationScore={scores.screenTimeAssociation}
              totalScore={scores.total}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </div>
    </main>
  );
}
