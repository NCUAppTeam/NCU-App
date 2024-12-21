import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

import ScaleContent from '../../components/pages/select/scale'
import TypeContent from '../../components/pages/select/type'
import BelongContent from '../../components/pages/select/belong'

export const Route = createFileRoute('/events/select')({
  component: SelectContent,
})

function SelectContent() {
  
  const [step, setStep] = useState(0)

  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 3))
  }
  
  return (
    <div className="flex flex-col items-center h-screen">
      {/* Header */}
      <div className="relative w-full py-4 flex justify-center items-center px-6 border-b-[1px]">
        <button className="absolute left-2 btn btn-ghost"><Link to='/events'>取消</Link></button>
        <h1 className="text-xl">新增</h1>
      </div>

      {/* Content */}
      <div className="h-full w-96 flex flex-col justify-between py-6">
        {/* Render Content Based on Step */}
        {(() => {
          switch (step) {
            case 0:
              return <ScaleContent onNext={handleNextStep} />;
            case 1:
              return <TypeContent onNext={handleNextStep} />;
            case 2:
              return <BelongContent onNext={handleNextStep} />;
            default:
              return null;
          }
        })()}

        {/* Steps */}
        <ul className="steps steps-vertical lg:steps-horizontal">
          <li className={`step ${step >= 0 ? 'step-primary' : ''}`}>規模</li>
          <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>類型</li>
          <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>性質</li>
        </ul>
      </div>
    </div>
  )
}
