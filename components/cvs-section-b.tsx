'use client';

import { FormSectionHeader, FormQuestion } from './form-section-header';
import { Input } from '@/components/ui/input';

interface SectionBProps {
  data: {
    digital_devices: string[];
    digital_devices_other: string;
    consecutive_hours: string;
    screen_viewing_distance: string;
    regular_breaks: string;
    breaks_frequency: string;
  };
  onChange: (field: string, value: string | string[]) => void;
}

export function CVSSectionB({ data, onChange }: SectionBProps) {
  const devices = [
    'Desktop',
    'Laptop',
    'Tablet',
    'Smartphone',
    'Other',
  ];

  const toggleDevice = (device: string) => {
    const updated = data.digital_devices.includes(device)
      ? data.digital_devices.filter((d) => d !== device)
      : [...data.digital_devices, device];
    onChange('digital_devices', updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <FormSectionHeader sectionTitle="Section B" sectionSubtitle="Screen use patterns" />

      <div className="bg-gray-50 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
        <h3 className="text-gray-700 md:text-gray-800 font-semibold text-sm md:text-base">Screen use patterns</h3>
      </div>

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <FormQuestion
          questionNumber="5."
          questionText="What type(s) of digital devices do you use regularly? (You may select more than one option)"
          isRequired
        >
          <div className="space-y-2 md:space-y-3">
            {devices.map((device) => (
              <div key={device}>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <input
                    type="checkbox"
                    id={device}
                    checked={data.digital_devices.includes(device)}
                    onChange={() => toggleDevice(device)}
                    className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600 rounded"
                  />
                  <label htmlFor={device} className="text-gray-700 cursor-pointer text-sm md:text-base">
                    {device}
                  </label>
                </div>
                {device === 'Other' && data.digital_devices.includes('Other') && (
                  <div className="mt-2 md:mt-3 ml-6 md:ml-8">
                    <Input
                      type="text"
                      placeholder="Please specify..."
                      value={data.digital_devices_other}
                      onChange={(e) => onChange('digital_devices_other', e.target.value)}
                      className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="6."
          questionText="For work/study, how many consecutive hours do you spend looking at screens without a break?"
          isRequired
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="less1"
                name="consecutive_hours"
                value="<1 hr"
                checked={data.consecutive_hours === '<1 hr'}
                onChange={(e) => onChange('consecutive_hours', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="less1" className="text-gray-700 cursor-pointer text-base">
                &lt;1 hr
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="1-2hrs"
                name="consecutive_hours"
                value="1-2 hrs"
                checked={data.consecutive_hours === '1-2 hrs'}
                onChange={(e) => onChange('consecutive_hours', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="1-2hrs" className="text-gray-700 cursor-pointer text-base">
                1-2 hrs
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="2-3hrs"
                name="consecutive_hours"
                value="2-3 hrs"
                checked={data.consecutive_hours === '2-3 hrs'}
                onChange={(e) => onChange('consecutive_hours', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="2-3hrs" className="text-gray-700 cursor-pointer text-base">
                2-3 hrs
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="more3"
                name="consecutive_hours"
                value=">3 hrs"
                checked={data.consecutive_hours === '>3 hrs'}
                onChange={(e) => onChange('consecutive_hours', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="more3" className="text-gray-700 cursor-pointer text-base">
                &gt;3 hrs
              </label>
            </div>
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="7."
          questionText="What is your typical screen viewing distance?"
          isRequired
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="less30"
                name="screen_distance"
                value="<30cm"
                checked={data.screen_viewing_distance === '<30cm'}
                onChange={(e) => onChange('screen_viewing_distance', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="less30" className="text-gray-700 cursor-pointer text-base">
                &lt;30cm
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="30-50"
                name="screen_distance"
                value="30-50cm"
                checked={data.screen_viewing_distance === '30-50cm'}
                onChange={(e) => onChange('screen_viewing_distance', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="30-50" className="text-gray-700 cursor-pointer text-base">
                30-50cm
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="more50"
                name="screen_distance"
                value=">50cm"
                checked={data.screen_viewing_distance === '>50cm'}
                onChange={(e) => onChange('screen_viewing_distance', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="more50" className="text-gray-700 cursor-pointer text-base">
                &gt;50cm
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="notsure"
                name="screen_distance"
                value="i am not sure"
                checked={data.screen_viewing_distance === 'i am not sure'}
                onChange={(e) => onChange('screen_viewing_distance', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="notsure" className="text-gray-700 cursor-pointer text-base">
                I am not sure
              </label>
            </div>
          </div>
        </FormQuestion>

        <FormQuestion
          questionNumber="8."
          questionText="How often do you take breaks during screen use?"
          isRequired
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="breaks-frequently"
                name="regular_breaks"
                value="Yes frequently"
                checked={data.regular_breaks === 'Yes frequently'}
                onChange={(e) => onChange('regular_breaks', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="breaks-frequently" className="text-gray-700 cursor-pointer text-base">
                Frequently
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="breaks-sometimes"
                name="regular_breaks"
                value="Sometimes"
                checked={data.regular_breaks === 'Sometimes'}
                onChange={(e) => onChange('regular_breaks', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="breaks-sometimes" className="text-gray-700 cursor-pointer text-base">
                Sometimes
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="breaks-never"
                name="regular_breaks"
                value="Never"
                checked={data.regular_breaks === 'Never'}
                onChange={(e) => onChange('regular_breaks', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="breaks-never" className="text-gray-700 cursor-pointer text-base">
                Never
              </label>
            </div>
          </div>
        </FormQuestion>
      </div>
    </div>
  );
}
