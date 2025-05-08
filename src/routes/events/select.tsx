import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

import BelongContent from '../../components/pages/select/belong'
import TypeContent from '../../components/pages/select/type'

export const Route = createFileRoute('/events/select')({
  component: SelectContent,
})

function SelectContent() {
  const [step, setStep] = useState(0)

  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 3))
  }

  const handleTypeSelect = () => {
    // Just move to the next step, the type will be passed via the Link in TypeContent
    handleNextStep()
  }

  return (
    <>
      <div className="flex flex-col px-4 sm:px-6 lg:px-8 h-screen pb-4 w-full mt-2">
        <div id="first" className="relative flex flex-row justify-center items-center border-b my-2 pb-2">
          <Link to='/events' className='absolute left-0'>
            <button className="btn btn-ghost">
              取消
            </button>
          </Link>
          <h1 className="text-xl text-center ">創建頁面</h1>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center grow">
          {/* Render Content Based on Step */}
          {(() => {
            switch (step) {
              // ScaleContent is originally for step 0, for small hangouts and big events
              // case 0:
              //   return <ScaleContent onNext={handleNextStep} />;
              case 0:
                return <TypeContent onNext={handleTypeSelect} />;
              case 1:
                return <BelongContent onNext={handleNextStep} />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </>
  )
}
