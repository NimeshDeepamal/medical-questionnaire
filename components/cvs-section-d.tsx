
'use client';

import { FormSectionHeader, FormQuestion } from './form-section-header';
import { Input } from '@/components/ui/input';

interface SectionDProps {
  data: {
    eye_conditions: string[];
    corrective_lenses: string;
    device_use_before_sleep: string;
    sleep_hours: string;
    eye_drops_usage: string;
    eye_drops_frequency: string;
  };
  onChange: (field: string, value: string | string[]) => void;
}

const EYE_CONDITIONS = [
  'Dry eye disease',
  'History of any Past eye surgeries',
  'Migraine',
  'Chronic headache disorders',
  'None'
];

export function CVSSectionD({ data, onChange }: SectionDProps) {
  const toggleEyeCondition = (condition: string) => {
    const currentConditions = Array.isArray(data.eye_conditions)
      ? data.eye_conditions
      : [];

    if (currentConditions.includes(condition)) {
      onChange(
        'eye_conditions',
        currentConditions.filter((c) => c !== condition)
      );
    } else {
      onChange('eye_conditions', [...currentConditions, condition]);
    }
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
        >
          <div className="space-y-3">
            {EYE_CONDITIONS.map((condition) => (
              <div key={condition} className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id={`condition-${condition}`}
                  checked={
                    Array.isArray(data.eye_conditions) &&
                    data.eye_conditions.includes(condition)
                  }
                  onChange={() => toggleEyeCondition(condition)}
                  className="w-5 h-5 cursor-pointer accent-purple-600 rounded mt-0.5 flex-shrink-0"
                />

                <label
                  htmlFor={`condition-${condition}`}
                  className="text-gray-700 cursor-pointer text-sm md:text-base"
                >
                  {condition}
                </label>
              </div>
            ))}
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="18."
          questionText="Do you wear corrective lenses? (or spectacles)"
          isRequired
        >
          <div className="space-y-3">
            {['Yes', 'Sometimes', 'No'].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`lenses-${option}`}
                  name="corrective_lenses"
                  value={option}
                  checked={data.corrective_lenses === option}
                  onChange={(e) =>
                    onChange('corrective_lenses', e.target.value)
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
        >
          <div className="space-y-3">
            {['<5', '5-6', '6-7', '7-8', '>8'].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`sleep-${option}`}
                  name="sleep_hours"
                  value={option}
                  checked={data.sleep_hours === option}
                  onChange={(e) => onChange('sleep_hours', e.target.value)}
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
        >
          <div className="space-y-3">
            {['Always', 'Sometimes', 'Never'].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`sleep-use-${option}`}
                  name="device_use_before_sleep"
                  value={option}
                  checked={data.device_use_before_sleep === option}
                  onChange={(e) =>
                    onChange('device_use_before_sleep', e.target.value)
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
        >
          <div className="space-y-3">
            {['Yes', 'No'].map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`drops-${option}`}
                  name="eye_drops_usage"
                  value={option}
                  checked={data.eye_drops_usage === option}
                  onChange={(e) =>
                    onChange('eye_drops_usage', e.target.value)
                  }
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

        {data.eye_drops_usage === 'Yes' && (
          <FormQuestion
            questionNumber="21.1"
            questionText="If yes frequency"
            isRequired
          >
            <Input
              type="text"
              placeholder="Your answer"
              value={data.eye_drops_frequency}
              onChange={(e) =>
                onChange('eye_drops_frequency', e.target.value)
              }
              className="w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 p-2 md:p-3 text-sm md:text-base"
            />
          </FormQuestion>
        )}
      </div>
    </div>
  );
}
