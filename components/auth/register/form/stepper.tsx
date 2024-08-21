"use client";

type Props = {
  steps: {
    id: string;
    name: string;
    fields: string[];
  }[];
  currentStep: number;
};

const StepperBar = ({ steps, currentStep }: Props) => {
  return (
    <ul className="container flex gap-4 rounded-md bg-white px-2 pt-2 shadow-md dark:bg-main-component">
      {steps.map((step, index) => (
        <li key={step.name} className="md:flex-1">
          {currentStep > index ? (
            <div className="group flex w-full flex-col border-l-4 border-main py-2 pl-4 transition-colors dark:border-main-component md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-main transition-colors dark:text-main-component">
                {step.id}
              </span>
              <span className="line-clamp-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {step.name}
              </span>
            </div>
          ) : currentStep === index ? (
            <div
              className="flex w-full flex-col border-l-4 border-main py-2 pl-4 dark:border-main-foreground md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
              aria-current="step"
            >
              <span className="text-sm font-medium text-main dark:text-main-foreground">
                {step.id}
              </span>
              <span className="line-clamp-2 text-sm font-medium text-main dark:text-main-foreground">
                {step.name}
              </span>
            </div>
          ) : (
            <div className="group flex h-full w-full flex-col border-l-4 border-main/20 py-2 pl-4 transition-colors dark:border-main-component md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-gray-500 transition-colors">
                {step.id}
              </span>
              <span className="line-clamp-2 text-sm font-medium text-neutral-700 dark:text-main-component">
                {step.name}
              </span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default StepperBar;
