import { Link } from "@tanstack/react-router";

const belongOptions = [
  { value: 'campus', label: '校園活動', ariaLabel: 'Select campus event' },
  { value: 'club', label: '社團活動', ariaLabel: 'Select club event' },
  // ... other options
];

interface BelongContentProps {
interface BelongContentProps {
  onNext: () => void; // 定义 onNext 是一个接收字符串参数、无返回值的函数
}

interface SelectionOption {
  value: string;
  label: string;
  ariaLabel: string;
}

interface SelectionContentProps {
  options: SelectionOption[];
  onSelect: (value: string) => void;
}

const SelectionContent: React.FC<SelectionContentProps> = ({options, onSelect}) => (
  <>
    <div></div>
    <div className="flex items-center justify-center">
      <div className="flex w-full flex-col">
        {options.map(({ value, label }) => (
          <button
            className="card bg-neutral-content rounded-box h-20 text-gray-800 font-bold text-2xl mb-8 hover:scale-105 transition-transform"
            key={value}
            onClick={() => onSelect(value)}
            >
            <Link className="w-full h-full flex justify-center items-center" key={value} to={`/events/create`}>
              { label }
            </Link>
          </button>
        ))}
      </div>
    </div>
  </>
);


export default function BelongContent({onNext}: BelongContentProps) {
  return <SelectionContent options={belongOptions} onSelect={onNext} />;
}
