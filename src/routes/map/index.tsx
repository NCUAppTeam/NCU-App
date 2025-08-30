import { createFileRoute } from '@tanstack/react-router'
import { PiNavigationArrowFill } from 'react-icons/pi'
import MapComponent from '../../components/pages/map/MapComponent'

export const Route = createFileRoute('/map/')({
    // beforeLoad: AuthGuard,
    component: MapIndex,
})

function MapIndex() {
    return (
        <div className="w-full h-screen text-center">
            <div className='flex items-center justify-center my-4'>
                <span className='text-2xl font-bold text-[#28527A] '>中央大學校園導航</span>
                <PiNavigationArrowFill size={24} color='#28527A' />
            </div>
            <MapComponent />
        </div>
    )
}
