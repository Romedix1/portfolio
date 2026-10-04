type lineNumbersProps = {
  numbers: number;
};

export const LineNumbers = ({ numbers }: lineNumbersProps) => {
  return (
    <div className="flex flex-col text-right pr-6 select-none opacity-40 shrink-0 text-text-dimmed">
      {Array.from({ length: numbers }, (_, index) => (
        <span key={index + 1}>{index + 1}</span>
      ))}
    </div>
  );
};
