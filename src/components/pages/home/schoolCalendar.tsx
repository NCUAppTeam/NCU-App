
export function SchoolCalendar() {

    function getSemester() {
        const today = new Date()
        const year = today.getFullYear() - 1911 // Convert to ROC year
        const month = today.getMonth() + 1 // getMonth() returns 0-11, so add 1
        const semester = month >= 8 || month <= 1 ? 1 : 2
        if (semester === 1) {
            return `${year} 學年度第 ${semester} 學期`
        }
        if (semester === 2) {
            return `${year - 1} 學年度第 ${semester} 學期`
        }
        return '中央大學'
    }

    const semester: string = getSemester()

    return (
        <div className='flex flex-col justify-center items-center w-full px-4 sm:px-6 lg:px-8'>
            <div className='mb-2'>
                <p className='text-lg font-bold'>{semester} 校曆</p>
            </div>
            <iframe
                className='w-full h-[500px] rounded-lg'
                src='https://calendar.google.com/calendar/embed?src=ncu.acad@gmail.com&ctz=Asia/Taipei'
            />
            <div>
                <button>
                    <div
                        className='flex justify-center items-center bg-[#FAFAFA] border border-[#E5EBF1] rounded-full'
                    >
                    </div>
                </button>
            </div>
        </div>
    )
}

export default { SchoolCalendar }