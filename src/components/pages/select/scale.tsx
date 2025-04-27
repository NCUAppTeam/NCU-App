interface ScaleContentProps {
  onNext: (scale: 'small' | 'formal') => void;
}

export default function ScaleContent({onNext}: ScaleContentProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex w-full flex-col"> 
        <button 
          className="card bg-neutral-content rounded-box grid h-20 place-items-center text-gray-800 font-bold text-2xl mb-4 hover:scale-105 transition-transform"
          onClick={() => onNext('small')}
          aria-label="Create small event"
          role="button"
        >
          我要揪人!
        </button>
        <p className="text-xl mx-auto">快速建立小型活動</p> 
      </div>
    </div>
  )
}