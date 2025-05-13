import { createFileRoute, Link } from '@tanstack/react-router'
import TypeContent from '../../components/pages/select/type'

export const Route = createFileRoute('/events/select')({
  component: SelectContent,
})

function SelectContent() {
  return (
    <>
      <div className="py-2 flex flex-col px-4 sm:px-6 lg:px-8 w-full h-full overflow-y-hidden">
        <div className="relative flex flex-row justify-center items-center border-b my-2 pb-2">
          <Link to='/events' className='absolute left-0'>
            <button className="btn btn-ghost">
              取消
            </button>
          </Link>
          <h1 className="text-xl text-center ">新增</h1>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col justify-center grow">
          <TypeContent />
          {/* Render Content Based on Step */}
          {/* {(() => {
            switch (step) {
              // ScaleContent is originally for step 0, for small hangouts and big events
              // case 0:
              //   return <ScaleContent onNext={handleNextStep} />;
              case 0:
                return <TypeContent />;
              default:
                return null;
            }
          })()} */}
        </div>
      </div>
    </>
  )
}
