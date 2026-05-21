'use client';

import { FormSectionHeader, FormQuestion } from './form-section-header';
import { Input } from '@/components/ui/input';

interface SectionAProps {
  data: {
    age: string;
    gender: string;
    faculty_of_study: string;
  };
  onChange: (field: string, value: string) => void;
}

export function CVSSectionA({ data, onChange }: SectionAProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <FormSectionHeader sectionTitle="Section A" sectionSubtitle="Demographics" />

      <div className="bg-gray-50 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
        <h3 className="text-gray-700 md:text-gray-800 font-semibold text-sm md:text-base">Demographics</h3>
      </div>

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <FormQuestion questionNumber="1." questionText="Age" isRequired>
          <Input
            type="text"
            placeholder="Your answer"
            value={data.age}
            onChange={(e) => onChange('age', e.target.value)}
            className="w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm md:text-base px-3 py-2"
          />
        </FormQuestion>

        <FormQuestion questionNumber="2." questionText="Gender" isRequired>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center space-x-2 md:space-x-3">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={data.gender === 'Male'}
                onChange={(e) => onChange('gender', e.target.value)}
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="male" className="text-gray-700 cursor-pointer text-sm md:text-base">
                Male
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={data.gender === 'Female'}
                onChange={(e) => onChange('gender', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="female" className="text-gray-700 cursor-pointer text-base">
                Female
              </label>
            </div>
          </div>
        </FormQuestion>

        <FormQuestion questionNumber="3." questionText="Faculty of study" isRequired>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="medical"
                name="faculty"
                value="Medical Sciences"
                checked={data.faculty_of_study === 'Medical Sciences'}
                onChange={(e) => onChange('faculty_of_study', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="medical" className="text-gray-700 cursor-pointer text-base">
                Faculty of Medical Sciences
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="dental"
                name="faculty"
                value="Dental Sciences"
                checked={data.faculty_of_study === 'Dental Sciences'}
                onChange={(e) => onChange('faculty_of_study', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="dental" className="text-gray-700 cursor-pointer text-base">
                Faculty of Dental Sciences
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="allied"
                name="faculty"
                value="Allied Health Sciences"
                checked={data.faculty_of_study === 'Allied Health Sciences'}
                onChange={(e) => onChange('faculty_of_study', e.target.value)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <label htmlFor="allied" className="text-gray-700 cursor-pointer text-base">
                Faculty of Allied Health Sciences
              </label>
            </div>
          </div>
        </FormQuestion>
      </div>
    </div>
  );
}
