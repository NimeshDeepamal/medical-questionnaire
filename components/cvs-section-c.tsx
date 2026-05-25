"use client";

import { FormQuestion, FormSectionHeader } from "./form-section-header";

interface SectionCProps {
  data: {
    eye_strain_reduction: string[];
    eye_strain_reduction_answers: Record<string, "" | "Yes" | "No">;
    lighting_conditions: string;
    screen_position: string;
    sitting_posture: string;
    chair_support: string;
    neck_bending_frequency: string;
    device_holding_position: string;
  };
  onChange: (
    field: string,
    value: string | string[] | Record<string, string>,
  ) => void;
  showValidationErrors?: boolean;
}

export function CVSSectionC({
  data,
  onChange,
  showValidationErrors = false,
}: SectionCProps) {
  const strainReduction = [
    "Anti-glare screen",
    "Blue light filter glasses",
    "Screen brightness adjusted",
    "Adjusted workstation setup",
    "None",
  ];

  const setStrainReductionAnswer = (item: string, answer: "Yes" | "No") => {
    const nextAnswers = {
      ...data.eye_strain_reduction_answers,
      [item]: answer,
    };
    onChange("eye_strain_reduction_answers", nextAnswers);
    const currentValues = Array.isArray(data.eye_strain_reduction)
      ? data.eye_strain_reduction
      : [];
    const updated =
      answer === "Yes"
        ? currentValues.includes(item)
          ? currentValues
          : [...currentValues, item]
        : currentValues.filter((value) => value !== item);
    onChange("eye_strain_reduction", updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <FormSectionHeader
        sectionTitle="Section C"
        sectionSubtitle="Ergonomics & Environment"
      />

      <div className="bg-gray-50 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
        <h3 className="text-gray-700 md:text-gray-800 font-semibold text-sm md:text-base">
          Ergonomics & Environment
        </h3>
      </div>

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <FormQuestion
          questionNumber="10."
          questionText="Do you use any of the following to reduce eye strain?"
          isRequired
          hasError={
            showValidationErrors &&
            !Object.values(data.eye_strain_reduction_answers).every(
              (value) => value === "Yes" || value === "No",
            )
          }
        >
          <div className="space-y-4">
            {strainReduction.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-gray-200 p-3 md:p-4"
              >
                <div className="text-gray-800 font-medium text-sm md:text-base mb-3">
                  {item}
                </div>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center gap-2 text-gray-700 text-sm md:text-base cursor-pointer">
                    <input
                      type="radio"
                      name={`strain-${item}`}
                      checked={
                        data.eye_strain_reduction_answers[item] === "Yes"
                      }
                      onChange={() => setStrainReductionAnswer(item, "Yes")}
                      className="w-5 h-5 cursor-pointer accent-purple-600"
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center gap-2 text-gray-700 text-sm md:text-base cursor-pointer">
                    <input
                      type="radio"
                      name={`strain-${item}`}
                      checked={data.eye_strain_reduction_answers[item] === "No"}
                      onChange={() => setStrainReductionAnswer(item, "No")}
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
          questionNumber="11."
          questionText="How would you describe your lighting conditions during screen use?"
          isRequired
          hasError={showValidationErrors && !data.lighting_conditions}
        >
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="bright"
                name="lighting"
                value="Too bright"
                checked={data.lighting_conditions === "Too bright"}
                onChange={(e) =>
                  onChange("lighting_conditions", e.target.value)
                }
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="bright"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Too bright
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="appropriate"
                name="lighting"
                value="Appropriate"
                checked={data.lighting_conditions === "Appropriate"}
                onChange={(e) =>
                  onChange("lighting_conditions", e.target.value)
                }
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="appropriate"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Appropriate
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="dim"
                name="lighting"
                value="Too dim"
                checked={data.lighting_conditions === "Too dim"}
                onChange={(e) =>
                  onChange("lighting_conditions", e.target.value)
                }
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="dim"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Too dim
              </label>
            </div>
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="12."
          questionText="Is your screen positioned?"
          isRequired
          hasError={showValidationErrors && !data.screen_position}
        >
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="eye-level"
                name="screen_position"
                value="At eye level"
                checked={data.screen_position === "At eye level"}
                onChange={(e) => onChange("screen_position", e.target.value)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="eye-level"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                At eye level
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="above-level"
                name="screen_position"
                value="Above eye level"
                checked={data.screen_position === "Above eye level"}
                onChange={(e) => onChange("screen_position", e.target.value)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="above-level"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Above eye level
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="below-level"
                name="screen_position"
                value="Below eye level"
                checked={data.screen_position === "Below eye level"}
                onChange={(e) => onChange("screen_position", e.target.value)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="below-level"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Below eye level
              </label>
            </div>
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="13."
          questionText="How would you describe your usual sitting posture while using digital devices?"
          isRequired
          hasError={showValidationErrors && !data.sitting_posture}
        >
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="upright"
                name="sitting_posture"
                value="Upright with back support"
                checked={data.sitting_posture === "Upright with back support"}
                onChange={(e) => onChange("sitting_posture", e.target.value)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="upright"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Upright with back support
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="bent-forward"
                name="sitting_posture"
                value="Slightly bent forward"
                checked={data.sitting_posture === "Slightly bent forward"}
                onChange={(e) => onChange("sitting_posture", e.target.value)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="bent-forward"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Slightly bent forward
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="slouching"
                name="sitting_posture"
                value="Frequently slouching"
                checked={data.sitting_posture === "Frequently slouching"}
                onChange={(e) => onChange("sitting_posture", e.target.value)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="slouching"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Frequently slouching
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="lying"
                name="sitting_posture"
                value="Lying down / reclining"
                checked={data.sitting_posture === "Lying down / reclining"}
                onChange={(e) => onChange("sitting_posture", e.target.value)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="lying"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Lying down / reclining
              </label>
            </div>
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="14."
          questionText="Do you use a chair with adequate back support while using a digital device?"
          isRequired
          hasError={showValidationErrors && !data.chair_support}
        >
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="always"
                name="chair_support"
                value="Always"
                checked={data.chair_support === "Always"}
                onChange={(e) => onChange("chair_support", e.target.value)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="always"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Always
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="sometimes"
                name="chair_support"
                value="Sometimes"
                checked={data.chair_support === "Sometimes"}
                onChange={(e) => onChange("chair_support", e.target.value)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="sometimes"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Sometimes
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="never"
                name="chair_support"
                value="Never"
                checked={data.chair_support === "Never"}
                onChange={(e) => onChange("chair_support", e.target.value)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="never"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Never
              </label>
            </div>
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="15."
          questionText="Do you bend your neck downward while using digital devices?"
          isRequired
          hasError={showValidationErrors && !data.neck_bending_frequency}
        >
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="neck-never"
                name="neck_bending"
                value="Never"
                checked={data.neck_bending_frequency === "Never"}
                onChange={(e) =>
                  onChange("neck_bending_frequency", e.target.value)
                }
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="neck-never"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Never
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="neck-occasionally"
                name="neck_bending"
                value="Occasionally"
                checked={data.neck_bending_frequency === "Occasionally"}
                onChange={(e) =>
                  onChange("neck_bending_frequency", e.target.value)
                }
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="neck-occasionally"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Occasionally
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="neck-frequently"
                name="neck_bending"
                value="Frequently"
                checked={data.neck_bending_frequency === "Frequently"}
                onChange={(e) =>
                  onChange("neck_bending_frequency", e.target.value)
                }
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="neck-frequently"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Frequently
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="neck-always"
                name="neck_bending"
                value="Always"
                checked={data.neck_bending_frequency === "Always"}
                onChange={(e) =>
                  onChange("neck_bending_frequency", e.target.value)
                }
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="neck-always"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Always
              </label>
            </div>
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="16."
          questionText="How do you usually hold or place your digital device during use?"
          isRequired
          hasError={showValidationErrors && !data.device_holding_position}
        >
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="device-hand"
                name="device_position"
                value="Held in hand"
                checked={data.device_holding_position === "Held in hand"}
                onChange={(e) =>
                  onChange("device_holding_position", e.target.value)
                }
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="device-hand"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Held in hand
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="device-table"
                name="device_position"
                value="Placed on table"
                checked={data.device_holding_position === "Placed on table"}
                onChange={(e) =>
                  onChange("device_holding_position", e.target.value)
                }
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="device-table"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Placed on table
              </label>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="device-both"
                name="device_position"
                value="Both equally"
                checked={data.device_holding_position === "Both equally"}
                onChange={(e) =>
                  onChange("device_holding_position", e.target.value)
                }
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label
                htmlFor="device-both"
                className="text-gray-700 cursor-pointer text-sm md:text-base"
              >
                Both equally
              </label>
            </div>
          </div>
        </FormQuestion>
      </div>
    </div>
  );
}
