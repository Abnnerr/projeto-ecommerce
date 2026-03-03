const steps = ["Carrinho", "Endereço", "Pagamento", "Confirmação"];

export default function OrderSteps({ currentStep }) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={step} className="flex-1 flex items-center">
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full font-semibold
                  ${isCompleted ? "bg-[var(--bgButton)] text-white" : ""}
                  ${isActive ? "border-2 border-[var(--bgButton)] text-[var(--bgButton)] bg-transparent" : ""}
                  ${!isCompleted && !isActive ? "bg-[var(--bgCard)] text-[var(--textColor)]" : ""}
                `}
              >
                {stepNumber}
              </div>

              <div className="ml-3">
                <p
                  className={`
                    text-sm font-medium
                    ${isCompleted || isActive ? "text-white" : "text-[var(--textColor)]"}
                  `}
                >
                  {step}
                </p>
              </div>

              {stepNumber !== steps.length && (
                <div
                  className={`
                    flex-1 h-1 mx-2
                    ${isCompleted ? "bg-[var(--bgButton)]" : "bg-[var(--bgCard)]"}
                  `}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}