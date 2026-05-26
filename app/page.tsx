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

const DIGITAL_DEVICE_OPTIONS = [
  "Desktop",
  "Laptop",
  "Tablet",
  "Smartphone",
  "Other",
];

const AVERAGE_SCREEN_TIME_OPTIONS = [
  "< 2 hours",
  "2-4 hours",
  "5-7 hours",
  "8-10 hours",
];

const EYE_STRAIN_REDUCTION_OPTIONS = [
  "Anti-glare screen",
  "Blue light filter glasses",
  "Screen brightness adjusted",
  "Adjusted workstation setup",
  "None",
];

const EYE_CONDITION_OPTIONS = [
  "Dry eye disease",
  "History of any Past eye surgeries",
  "Migraine",
  "Chronic headache disorders",
  "None",
];

const createAnswerMap = (options: string[]) =>
  options.reduce<Record<string, "" | "Yes" | "No">>((map, option) => {
    map[option] = "";
    return map;
  }, {});

export default function Home() {
  const [currentSection, setCurrentSection] = useState<
    "landing" | "start" | "a" | "b" | "c" | "symptoms" | "d" | "e" | "results"
  >("landing");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
    symptoms: false,
    e: false,
  });

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    faculty_of_study: "",
    academic_year: "",
    average_screen_time: "",
    digital_devices: [] as string[],
    digital_devices_answers: createAnswerMap(DIGITAL_DEVICE_OPTIONS),
    digital_devices_other: "",
    consecutive_hours: "",
    screen_viewing_distance: "",
    regular_breaks: "",
    breaks_frequency: "",
    eye_strain_reduction: [] as string[],
    eye_strain_reduction_answers: createAnswerMap(EYE_STRAIN_REDUCTION_OPTIONS),
    lighting_conditions: "",
    screen_position: "",
    sitting_posture: "",
    chair_support: "",
    neck_bending_frequency: "",
    device_holding_position: "",
    visual_symptoms: [] as string[],
    visual_symptoms_score: "",
    ocular_surface_symptoms: [] as string[],
    ocular_surface_score: "",
    extra_ocular_symptoms: [] as string[],
    extra_ocular_score: "",
    symptoms_frequency: "",
    associated_with_screen_use: "",
    eye_conditions: [] as string[],
    eye_conditions_answers: createAnswerMap(EYE_CONDITION_OPTIONS),
    corrective_lenses: "",
    device_use_before_sleep: "",
    sleep_hours: "",
    eye_drops_usage: "",
    eye_drops_frequency: "",
    productivity_impact: "",
    consulted_eye_care: "",
    changed_study_habits: "",
    submit_confirmation: "",
  });

  const handleFieldChange = (
    field: string,
    value: string | string[] | Record<string, string>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isAnswerMapComplete = (answers: Record<string, string>) =>
    Object.values(answers).every((value) => value === "Yes" || value === "No");

  const validateSection = (section: string): boolean => {
    const requiredFields: Record<string, string[]> = {
      a: ["age", "gender", "faculty_of_study"],
      b: ["consecutive_hours", "screen_viewing_distance", "regular_breaks"],
      c: [
        "lighting_conditions",
        "screen_position",
        "sitting_posture",
        "chair_support",
        "neck_bending_frequency",
        "device_holding_position",
        "eye_strain_reduction_answers",
      ],
      d: [
        "corrective_lenses",
        "device_use_before_sleep",
        "sleep_hours",
        "eye_drops_usage",
        "eye_conditions_answers",
      ],
      symptoms: ["associated_with_screen_use"],
      e: ["productivity_impact", "consulted_eye_care", "changed_study_habits"],
    };
    // include academic year as required for section A
    requiredFields.a.push("academic_year");

    const fields = requiredFields[section] || [];
    const allFieldsValid = fields.every((field) => {
      const value = formData[field as keyof typeof formData];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (value && typeof value === "object") {
        return isAnswerMapComplete(value as Record<string, string>);
      }
      return value !== "";
    });

    // Check conditional requirement: if eye_drops_usage is "Yes", eye_drops_frequency is required
    if (
      section === "d" &&
      formData.eye_drops_usage === "Yes" &&
      !formData.eye_drops_frequency
    ) {
      return false;
    }

    if (
      section === "b" &&
      !isAnswerMapComplete(formData.digital_devices_answers)
    ) {
      return false;
    }

    if (
      section === "b" &&
      formData.digital_devices_answers.Other === "Yes" &&
      !formData.digital_devices_other
    ) {
      return false;
    }

    if (
      section === "b" &&
      formData.regular_breaks === "Yes frequently" &&
      !formData.breaks_frequency
    ) {
      return false;
    }

    return allFieldsValid;
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
        alert("Questionnaire submitted successfully!");
        return true;
      } else {
        alert("Error submitting questionnaire");
        return false;
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting questionnaire");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-3 px-2 sm:py-4 sm:px-3 md:py-8 md:px-4">
      <div className="max-w-4xl mx-auto w-full">
        {currentSection === "landing" && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-5 md:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-words">
              Computer Vision Syndrome (CVS) Research Questionnaire
            </h1>
            <div className="space-y-4 md:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-[0.95rem] md:text-base">
              <p>
                We are a group of undergraduate medical students from University
                of Sri Jayewardenepura. We are conducting a research study on
                computer vision syndrome, which refers to a group of eye and
                vision-related problems that result from prolonged use of
                digital devices, among undergraduate students of a selected
                state university in Sri Lanka.
              </p>
              <p>
                <strong>
                  We would like to invite you to take part in this study.
                </strong>
              </p>
              <p>
                Though much research has been done on this topic, there are only
                a few done among Sri Lankan undergraduates to identify the
                effects of video display terminals on eye health. Hence, this
                research is planned to study the impact of CVS in Medical,
                Dental and Allied Health Sciences faculty students focusing on
                finding the associated factors that contribute to these symptoms
                along with their prolonged screen time.
              </p>
              <p>
                This study will involve completing a self-administered e
                questionnaire. Which includes questions about your
                socio-demographic details, digital screen usage habits, and eye
                and vision related symptoms. A standardized and pre-tested
                questionnaire will be used to assess computer vision syndrome.
              </p>
              <p>
                <strong>
                  Your participation in this research is entirely voluntary.
                </strong>{" "}
                It is your choice whether to participate or not.
              </p>
              <p>
                If you decide not to participate, there will be no penalty or
                any negative impact on your academic activities or relationships
                within the university.
              </p>
              <p>
                You may also withdraw from the study at any time, even after
                agreeing to participate, without giving a reason. There are no
                significant risks associated with this study. All responses will
                be kept confidential to minimize any risk to your privacy.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-6">
                <h2 className="font-bold text-purple-900 mb-3">Benefits</h2>
                <p className="text-purple-900">
                  By participating in this study, you will receive an individual
                  score that indicates your status regarding computer vision
                  syndrome. This can help you understand your risk level and
                  take appropriate measures to protect your eye health.
                </p>
                <p className="text-purple-900 mt-3">
                  For further information,{" "}
                  <a
                    href="/information%20sheet%20and%20volunteer%20consent%20form.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    Information Sheet and Volunteer Consent Form (PDF)
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8">
              <Button
                onClick={() => setCurrentSection("start")}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 md:py-3 text-sm md:text-base"
              >
                I Agree - Start Assessment
              </Button>
              <Button
                onClick={() =>
                  alert("Thank you for your time. You can close this page.")
                }
                variant="outline"
                className="flex-1 py-2 md:py-3 text-sm md:text-base"
              >
                Decline
              </Button>
            </div>
          </div>
        )}

        {currentSection === "start" && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-5 md:p-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 break-words">
              CVS Smart Questionnaire
            </h1>
            <p className="text-gray-600 text-sm md:text-lg mb-4 md:mb-6">
              Computer Vision Syndrome Assessment Tool
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6 mb-4 md:mb-8 text-left">
              <h2 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">
                About This Questionnaire:
              </h2>
              <ul className="space-y-1 md:space-y-2 text-gray-700 text-xs md:text-sm">
                <li>
                  • Comprehensive assessment of Computer Vision Syndrome
                  symptoms
                </li>
                <li>
                  • Evaluates visual, ocular surface, and extra-ocular
                  complaints
                </li>
                <li>• Automatically calculates your CVS risk level</li>
                <li>• Takes approximately 10-15 minutes to complete</li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4 mb-6 md:mb-8 text-left">
              <p className="text-xs md:text-sm text-yellow-900">
                <strong>Disclaimer:</strong> This questionnaire is for
                assessment purposes only and should not be used as a substitute
                for professional medical advice.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setCurrentSection("landing")}
                variant="outline"
                className="text-sm md:text-base py-2 md:py-3"
              >
                Back
              </Button>
              <Button
                onClick={() => setCurrentSection("a")}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 md:py-3 text-sm md:text-base"
              >
                Start Assessment
              </Button>
            </div>
          </div>
        )}

        {currentSection === "a" && (
          <div className="space-y-5 md:space-y-6">
            <CVSSectionA
              data={formData}
              onChange={handleFieldChange}
              showValidationErrors={validationErrors.a}
            />
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 md:mt-8">
              <Button
                onClick={() => setCurrentSection("start")}
                variant="outline"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  if (validateSection("a")) {
                    setValidationErrors((prev) => ({ ...prev, a: false }));
                    setCurrentSection("b");
                  } else {
                    setValidationErrors((prev) => ({ ...prev, a: true }));
                    alert("Please fill all required fields in this section");
                  }
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {currentSection === "b" && (
          <div className="space-y-5 md:space-y-6">
            <CVSSectionB
              data={formData}
              onChange={handleFieldChange}
              showValidationErrors={validationErrors.b}
            />
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 md:mt-8">
              <Button onClick={() => setCurrentSection("a")} variant="outline">
                Back
              </Button>
              <Button
                onClick={() => {
                  if (validateSection("b")) {
                    setValidationErrors((prev) => ({ ...prev, b: false }));
                    setCurrentSection("c");
                  } else {
                    setValidationErrors((prev) => ({ ...prev, b: true }));
                    alert("Please fill all required fields in this section");
                  }
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {currentSection === "c" && (
          <div className="space-y-5 md:space-y-6">
            <CVSSectionC
              data={formData}
              onChange={handleFieldChange}
              showValidationErrors={validationErrors.c}
            />
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 md:mt-8">
              <Button onClick={() => setCurrentSection("b")} variant="outline">
                Back
              </Button>
              <Button
                onClick={() => {
                  if (validateSection("c")) {
                    setValidationErrors((prev) => ({ ...prev, c: false }));
                    setCurrentSection("d");
                  } else {
                    setValidationErrors((prev) => ({ ...prev, c: true }));
                    alert("Please fill all required fields in this section");
                  }
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {currentSection === "d" && (
          <div className="space-y-5 md:space-y-6">
            <CVSSectionD
              data={formData}
              onChange={handleFieldChange}
              showValidationErrors={validationErrors.d}
            />
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 md:mt-8">
              <Button onClick={() => setCurrentSection("c")} variant="outline">
                Back
              </Button>
              <Button
                onClick={() => {
                  if (validateSection("d")) {
                    setValidationErrors((prev) => ({ ...prev, d: false }));
                    setCurrentSection("symptoms");
                  } else {
                    setValidationErrors((prev) => ({ ...prev, d: true }));
                    alert("Please fill all required fields in this section");
                  }
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {currentSection === "symptoms" && (
          <div className="space-y-5 md:space-y-6">
            <CVSSymptomsSection
              sectionNumber={22.1}
              sectionTitle="Visual symptoms"
              symptomsList={VISUAL_SYMPTOMS}
              scoreOptions={[]}
              selectedSymptoms={formData.visual_symptoms}
              selectedScore=""
              onSymptomChange={(symptoms) =>
                handleFieldChange("visual_symptoms", symptoms)
              }
              onScoreChange={() => {}}
              showValidationErrors={false}
            />

            <CVSSymptomsSection
              sectionNumber={22.2}
              sectionTitle="Ocular Surface complaints"
              symptomsList={OCULAR_SURFACE_SYMPTOMS}
              scoreOptions={[]}
              selectedSymptoms={formData.ocular_surface_symptoms}
              selectedScore=""
              onSymptomChange={(symptoms) =>
                handleFieldChange("ocular_surface_symptoms", symptoms)
              }
              onScoreChange={() => {}}
              showValidationErrors={false}
            />

            <CVSSymptomsSection
              sectionNumber={22.3}
              sectionTitle="Extra-ocular complaints"
              symptomsList={EXTRA_OCULAR_SYMPTOMS}
              scoreOptions={[]}
              selectedSymptoms={formData.extra_ocular_symptoms}
              selectedScore=""
              onSymptomChange={(symptoms) =>
                handleFieldChange("extra_ocular_symptoms", symptoms)
              }
              onScoreChange={() => {}}
              showValidationErrors={false}
            />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  22.4 Symptom Frequency <span className="text-red-500">*</span>
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  If yes, Frequency of those above mentioned symptoms in
                  question
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="freq-rare"
                    name="symptom_freq"
                    value="Rare"
                    checked={formData.symptoms_frequency === "Rare"}
                    onChange={(e) =>
                      handleFieldChange("symptoms_frequency", e.target.value)
                    }
                    className="w-5 h-5 cursor-pointer accent-purple-600"
                  />
                  <label
                    htmlFor="freq-rare"
                    className="text-gray-700 cursor-pointer text-base"
                  >
                    Never
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="freq-infrequent"
                    name="symptom_freq"
                    value="Infrequent"
                    checked={formData.symptoms_frequency === "Infrequent"}
                    onChange={(e) =>
                      handleFieldChange("symptoms_frequency", e.target.value)
                    }
                    className="w-5 h-5 cursor-pointer accent-purple-600"
                  />
                  <label
                    htmlFor="freq-infrequent"
                    className="text-gray-700 cursor-pointer text-base"
                  >
                    Infrequent
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="freq-frequent"
                    name="symptom_freq"
                    value="Frequent"
                    checked={formData.symptoms_frequency === "Frequent"}
                    onChange={(e) =>
                      handleFieldChange("symptoms_frequency", e.target.value)
                    }
                    className="w-5 h-5 cursor-pointer accent-purple-600"
                  />
                  <label
                    htmlFor="freq-frequent"
                    className="text-gray-700 cursor-pointer text-base"
                  >
                    Frequent
                  </label>
                </div>
              </div>
            </div>

            <div
              className={`bg-white rounded-lg shadow-sm border p-6 space-y-6 ${
                validationErrors.symptoms ? "border-red-200" : "border-gray-200"
              }`}
            >
              <div className="border-b pb-4">
                <h3
                  className={`text-lg font-semibold ${
                    validationErrors.symptoms ? "text-red-700" : "text-gray-900"
                  }`}
                >
                  22.5 Screen Time Association{" "}
                  <span className="text-red-500">*</span>
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Are these symptoms associated with the time of your screen
                  use? (Appearing Shortly after screen time)
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="timing-never"
                    name="symptom_timing"
                    value="Never"
                    checked={formData.associated_with_screen_use === "Never"}
                    onChange={(e) =>
                      handleFieldChange(
                        "associated_with_screen_use",
                        e.target.value,
                      )
                    }
                    className="w-5 h-5 cursor-pointer accent-purple-600"
                  />
                  <label
                    htmlFor="timing-never"
                    className="text-gray-700 cursor-pointer text-base"
                  >
                    Never
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="timing-sometimes"
                    name="symptom_timing"
                    value="Sometimes"
                    checked={
                      formData.associated_with_screen_use === "Sometimes"
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "associated_with_screen_use",
                        e.target.value,
                      )
                    }
                    className="w-5 h-5 cursor-pointer accent-purple-600"
                  />
                  <label
                    htmlFor="timing-sometimes"
                    className="text-gray-700 cursor-pointer text-base"
                  >
                    Sometimes
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="timing-always"
                    name="symptom_timing"
                    value="Always"
                    checked={formData.associated_with_screen_use === "Always"}
                    onChange={(e) =>
                      handleFieldChange(
                        "associated_with_screen_use",
                        e.target.value,
                      )
                    }
                    className="w-5 h-5 cursor-pointer accent-purple-600"
                  />
                  <label
                    htmlFor="timing-always"
                    className="text-gray-700 cursor-pointer text-base"
                  >
                    Always
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-8">
              <Button onClick={() => setCurrentSection("c")} variant="outline">
                Back
              </Button>
              <Button
                onClick={() => {
                  if (validateSection("symptoms")) {
                    setValidationErrors((prev) => ({
                      ...prev,
                      symptoms: false,
                    }));
                    setCurrentSection("e");
                  } else {
                    setValidationErrors((prev) => ({
                      ...prev,
                      symptoms: true,
                    }));
                    alert("Please fill all required fields in this section");
                  }
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}
        {currentSection === "e" && (
          <div className="space-y-6">
            <CVSSectionE
              data={formData}
              onChange={handleFieldChange}
              showValidationErrors={validationErrors.e}
            />

            <div className="flex justify-between gap-4 mt-8">
              <Button
                onClick={() => setCurrentSection("symptoms")}
                variant="outline"
              >
                Back
              </Button>

              <Button
                onClick={async () => {
                  if (validateSection("e")) {
                    setValidationErrors((prev) => ({ ...prev, e: false }));
                    const saved = await handleSubmit();
                    if (saved) {
                      setCurrentSection("results");
                    }
                  } else {
                    setValidationErrors((prev) => ({ ...prev, e: true }));
                    alert("Please fill all required fields in this section");
                  }
                }}
                disabled={isSubmitting}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit & View Results"}
              </Button>
            </div>
          </div>
        )}

        {currentSection === "results" && (
          <div className="space-y-6">
            <CVSResults
              visualScore={visualScore}
              ocularScore={ocularScore}
              extraOcularScore={extraOcularScore}
              symptomsFrequencyScore={scores.symptomsFrequency}
              screenTimeAssociationScore={scores.screenTimeAssociation}
              totalScore={scores.total}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              showSubmitButton={false}
            />
          </div>
        )}
      </div>
    </main>
  );
}
