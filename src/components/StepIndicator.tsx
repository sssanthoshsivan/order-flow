"use client";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Cart" },
  { number: 2, label: "Shipping" },
  { number: 3, label: "Payment" },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center py-6 px-4">
      <div className="flex items-center gap-0 sm:gap-2 w-full max-w-md">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${
                    step.number < currentStep
                      ? "bg-[var(--accent)] text-white shadow-md"
                      : step.number === currentStep
                      ? "bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] text-white shadow-lg scale-110"
                      : "bg-[var(--accent-bg)] text-[var(--text-muted)]"
                  }
                `}
              >
                {step.number < currentStep ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-xs font-medium transition-colors ${
                  step.number <= currentStep
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 sm:mx-3 mb-5">
                <div className="h-0.5 rounded-full bg-[var(--accent-bg)] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: step.number < currentStep ? "100%" : "0%",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
