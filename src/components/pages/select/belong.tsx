interface BelongContentProps {
  onNext: () => void; // 定义 onNext 是一个无参数、无返回值的函数
}

export default function BelongContent({onNext}: BelongContentProps) {
  return (
    <>
      <div></div>
      <div className="flex items-center justify-center">
        <div className="flex w-full flex-col">
          <button className="card bg-neutral-content rounded-box grid h-20 place-items-center text-gray-800 font-bold text-2xl mb-8 hover:scale-105 transition-transform"
            onClick={onNext}
          >
            校園活動
          </button>
          <button className="card bg-neutral-content rounded-box grid h-20 place-items-center text-gray-800 font-bold text-2xl mb-8 hover:scale-105 transition-transform"
            onClick={onNext}
          >
            社團活動
          </button>
          <button className="card bg-neutral-content rounded-box grid h-20 place-items-center text-gray-800 font-bold text-2xl mb-8 hover:scale-105 transition-transform"
            onClick={onNext}
          >
            系上活動
          </button>
          <button className="card bg-neutral-content rounded-box grid h-20 place-items-center text-gray-800 font-bold text-2xl mb-8 hover:scale-105 transition-transform"
            onClick={onNext}
          >
            其他
          </button>
        </div>
      </div>
    </>
  )
}