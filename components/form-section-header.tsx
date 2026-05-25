interface FormSectionHeaderProps {
  sectionTitle: string;
  sectionSubtitle?: string;
}

export function FormSectionHeader({
  sectionTitle,
  sectionSubtitle,
}: FormSectionHeaderProps) {
  return (
    <div className="bg-purple-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-t-lg">
      <h2 className="text-xl md:text-2xl font-semibold">{sectionTitle}</h2>
    </div>
  );
}

interface FormQuestionProps {
  questionNumber: string;
  questionText: string;
  isRequired?: boolean;
  points?: number;
  hasError?: boolean;
  children: React.ReactNode;
}

export function FormQuestion({
  questionNumber,
  questionText,
  isRequired = false,
  points,
  hasError = false,
  children,
}: FormQuestionProps) {
  return (
    <div
      className={`px-4 md:px-6 py-3 md:py-5 mb-3 md:mb-4 rounded-lg border ${
        hasError ? "border-red-300 bg-red-50/60" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 md:mb-4 gap-2">
        <label
          className={`text-base md:text-lg font-medium ${
            hasError ? "text-red-700" : "text-gray-800"
          }`}
        >
          <span>{questionNumber}</span>
          <span className="ml-1 md:ml-2">{questionText}</span>
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
        {points !== undefined && (
          <span className="text-xs md:text-sm text-gray-600 font-medium bg-gray-100 px-2 md:px-3 py-1 rounded whitespace-nowrap">
            {points} points
          </span>
        )}
      </div>
      <div className="space-y-2 md:space-y-3">{children}</div>
    </div>
  );
}

interface SubtitleProps {
  text: string;
  className?: string;
}

export function FormSubtitle({ text, className = "" }: SubtitleProps) {
  return (
    <p
      className={`text-gray-700 text-sm md:text-base mb-4 md:mb-6 ${className}`}
    >
      {text}
    </p>
  );
}
