"use client";

import { Input } from "@/components/ui/input";
import { FormQuestion, FormSectionHeader } from "./form-section-header";

interface SectionDProps {
  data: {
    eye_conditions: string[];
    eye_conditions_answers: Record<string, "" | "Yes" | "No">;
    corrective_lenses: string;
    device_use_before_sleep: string;
    sleep_hours: string;
    eye_drops_usage: string;
    eye_drops_frequency: string;
  };
  onChange: (
    field: string,
    value: string | string[] | Record<string, string>,
  ) => void;
  showValidationErrors?: boolean;
}

const EYE_CONDITIONS = [
  "Dry eye disease",
  "History of any Past eye surgeries",
  "Migraine",
  "Chronic headache disorders",
  "None",
];

export function CVSSectionD({
  data,
  onChange,
  showValidationErrors = false,
}: SectionDProps) {
  const toggleEyeCondition = (condition: string) => {
    const currentConditions = Array.isArray(data.eye_conditions)
      ? data.eye_conditions
      : [];

    if (currentConditions.includes(condition)) {
      onChange(
        "eye_conditions",
        currentConditions.filter((c) => c !== condition),
      );
    } else {
      onChange("eye_conditions", [...currentConditions, condition]);
    }
  };

  const setEyeConditionAnswer = (condition: string, answer: "Yes" | "No") => {
    const nextAnswers = { ...data.eye_conditions_answers, [condition]: answer };
    onChange("eye_conditions_answers", nextAnswers);

    if (answer === "Yes") {
      const currentConditions = Array.isArray(data.eye_conditions)
        ? data.eye_conditions
        : [];

      if (!currentConditions.includes(condition)) {
        onChange("eye_conditions", [...currentConditions, condition]);
      }
      return;
    }

    const currentConditions = Array.isArray(data.eye_conditions)
      ? data.eye_conditions
      : [];
    onChange(
      "eye_conditions",
      currentConditions.filter((c) => c !== condition),
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <FormSectionHeader
        sectionTitle="Section D"
        sectionSubtitle="Lifestyle & Health"
      />

      <div className="bg-gray-50 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
        <h3 className="text-gray-700 md:text-gray-800 font-semibold text-sm md:text-base">
          Lifestyle & Health
        </h3>
      </div>

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <FormQuestion
          questionNumber="17."
          questionText="Do you have any of the following eye conditions or factors? (Pre-diagnosed)"
          isRequired
          hasError={
            showValidationErrors &&
            !Object.values(data.eye_conditions_answers).every(
              (value) => value === "Yes" || value === "No",
            )
          }
        >
          <div className="space-y-4">
            {EYE_CONDITIONS.map((condition) => (
              <div
                key={condition}
                className="rounded-lg border border-gray-200 p-3 md:p-4"
              >
                <div className="text-gray-800 font-medium text-sm md:text-base mb-3">
                  {condition}
                </div>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center gap-2 text-gray-700 text-sm md:text-base cursor-pointer">
                    <input
                      type="radio"
                      name={`condition-${condition}`}
                      checked={data.eye_conditions_answers[condition] === "Yes"}
                      onChange={() => setEyeConditionAnswer(condition, "Yes")}
                      className="w-5 h-5 cursor-pointer accent-purple-600"
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center gap-2 text-gray-700 text-sm md:text-base cursor-pointer">
                    <input
                      type="radio"
                      name={`condition-${condition}`}
                      checked={data.eye_conditions_answers[condition] === "No"}
                      onChange={() => setEyeConditionAnswer(condition, "No")}
                      className="w-5 h-5 cursor-pointer accent-purple-600"
                    />
                    No
                  </label>
                </div>
              </div>
            ))}
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="18."
          questionText="Do you wear corrective lenses? (or spectacles)"
          isRequired
          hasError={showValidationErrors && !data.corrective_lenses}
        >
          <div className="space-y-3">
            {["Yes", "Sometimes", "No"].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`lenses-${option}`}
                  name="corrective_lenses"
                  value={option}
                  checked={data.corrective_lenses === option}
                  onChange={(e) =>
                    onChange("corrective_lenses", e.target.value)
                  }
                  className="w-5 h-5 cursor-pointer accent-purple-600"
                />

                <label
                  htmlFor={`lenses-${option}`}
                  className="text-gray-700 cursor-pointer text-sm md:text-base"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="19."
          questionText="How many hours of sleep do you get on average per night?"
          isRequired
          hasError={showValidationErrors && !data.sleep_hours}
        >
          <div className="space-y-3">
            {["<5", "5-6", "6-7", "7-8", ">8"].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`sleep-${option}`}
                  name="sleep_hours"
                  value={option}
                  checked={data.sleep_hours === option}
                  onChange={(e) => onChange("sleep_hours", e.target.value)}
                  className="w-5 h-5 cursor-pointer accent-purple-600"
                />

                <label
                  htmlFor={`sleep-${option}`}
                  className="text-gray-700 cursor-pointer text-sm md:text-base"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="20."
          questionText="Do you use your devices for a long time just before sleeping at night?"
          isRequired
          hasError={showValidationErrors && !data.device_use_before_sleep}
        >
          <div className="space-y-3">
            {["Always", "Sometimes", "Never"].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`sleep-use-${option}`}
                  name="device_use_before_sleep"
                  value={option}
                  checked={data.device_use_before_sleep === option}
                  onChange={(e) =>
                    onChange("device_use_before_sleep", e.target.value)
                  }
                  className="w-5 h-5 cursor-pointer accent-purple-600"
                />

                <label
                  htmlFor={`sleep-use-${option}`}
                  className="text-gray-700 cursor-pointer text-sm md:text-base"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="21."
          questionText="Do you use any eye drops such as: artificial tears regularly?"
          isRequired
          hasError={showValidationErrors && !data.eye_drops_usage}
        >
          <div className="space-y-3">
            {["Yes", "No"].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`drops-${option}`}
                  name="eye_drops_usage"
                  value={option}
                  checked={data.eye_drops_usage === option}
                  onChange={(e) => onChange("eye_drops_usage", e.target.value)}
                  className="w-5 h-5 cursor-pointer accent-purple-600"
                />

                <label
                  htmlFor={`drops-${option}`}
                  className="text-gray-700 cursor-pointer text-sm md:text-base"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </FormQuestion>

        {data.eye_drops_usage === "Yes" && (
          <FormQuestion
            questionNumber="21.1"
            questionText="If yes frequency"
            isRequired
            hasError={showValidationErrors && !data.eye_drops_frequency}
          >
            <Input
              type="text"
              placeholder="Your answer"
              value={data.eye_drops_frequency}
              onChange={(e) => onChange("eye_drops_frequency", e.target.value)}
              className={`w-full border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 p-2 md:p-3 text-sm md:text-base ${
                showValidationErrors && !data.eye_drops_frequency
                  ? "border-red-400 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
          </FormQuestion>
        )}
      </div>
    </div>
  );
}
