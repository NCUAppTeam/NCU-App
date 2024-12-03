interface ScaleContentProps {
  onNext: () => void; // 定义 onNext 是一个无参数、无返回值的函数
}

export default function ScaleContent({onNext}: ScaleContentProps) {
  return (
    <>
      <div></div>
      <div className="flex items-center justify-center">
        <div className="flex w-full flex-col">
          <button className="card bg-neutral-content rounded-box grid h-20 place-items-center text-gray-800 font-bold text-2xl mb-4 hover:scale-105 transition-transform"
            onClick={onNext}
          >
            我要揪人!
          </button>
          <p className="mx-auto text-xl">快速建立小型活動</p>
          <div className="divider"></div>
          <button className="card bg-neutral-content rounded-box grid h-20 place-items-center text-gray-800 font-bold text-2xl mb-4 hover:scale-105 transition-transform"
            onClick={onNext}
          >
            我要活動!
          </button>
          <p className="mx-auto text-xl">建立正式活動</p>
        </div>
      </div>
    </>
  )
}