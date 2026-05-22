"use client";

import { FormQuestion, FormSectionHeader } from "./form-section-header";

interface SectionEProps {
  data: {
    productivity_impact: string;
    consulted_eye_care: string;
    changed_study_habits: string; // Keep this for the visible question
  };
  onChange: (field: string, value: string | string[]) => void;
}

const STUDY_HABIT_CHANGES = [
  "Increased screen breaks",
  "Adjusted screen distance",
  "Changed lighting setup",
];

export function CVSSectionE({ data, onChange }: SectionEProps) {
  const toggleStudyHabitChange = (item: string) => {};

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <FormSectionHeader
        sectionTitle="Section E"
        sectionSubtitle="Impact on daily life"
      />

      <div className="bg-gray-50 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
        <h3 className="text-gray-700 md:text-gray-800 font-semibold text-sm md:text-base">
          Impact on daily life
        </h3>
      </div>

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <FormQuestion
          questionNumber="22."
          questionText="Do your symptoms affect your productivity?"
          isRequired
        >
          <div className="space-y-2 md:space-y-3">
            {["Not at all", "Slightly", "Moderately", "Severely"].map(
              (option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2 md:space-x-3"
                >
                  <input
                    type="radio"
                    id={`prod-${option}`}
                    name="productivity_impact"
                    value={option}
                    checked={data.productivity_impact === option}
                    onChange={(e) =>
                      onChange("productivity_impact", e.target.value)
                    }
                    className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
                  />

                  <label
                    htmlFor={`prod-${option}`}
                    className="text-gray-700 cursor-pointer text-sm md:text-base"
                  >
                    {option}
                  </label>
                </div>
              ),
            )}
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="23."
          questionText="Have you consulted an eye care professional for these symptoms?"
          isRequired
        >
          <div className="space-y-2 md:space-y-3">
            {["Yes", "No"].map((option) => (
              <div
                key={option}
                className="flex items-center space-x-2 md:space-x-3"
              >
                <input
                  type="radio"
                  id={`consult-${option}`}
                  name="consulted_eye_care"
                  value={option}
                  checked={data.consulted_eye_care === option}
                  onChange={(e) =>
                    onChange("consulted_eye_care", e.target.value)
                  }
                  className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
                />

                <label
                  htmlFor={`consult-${option}`}
                  className="text-gray-700 cursor-pointer text-sm md:text-base"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="24."
          questionText="Have you changed your study habits due to CVS symptoms?"
          isRequired
        >
          <div className="space-y-2 md:space-y-3">
            {["Yes", "No"].map((option) => (
              <div
                key={option}
                className="flex items-center space-x-2 md:space-x-3"
              >
                <input
                  type="radio"
                  id={`habits-${option}`}
                  name="changed_study_habits"
                  value={option}
                  checked={data.changed_study_habits === option}
                  onChange={(e) =>
                    onChange("changed_study_habits", e.target.value)
                  }
                  className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
                />

                <label
                  htmlFor={`habits-${option}`}
                  className="text-gray-700 cursor-pointer text-sm md:text-base"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </FormQuestion>
      </div>
    </div>
  );
}
