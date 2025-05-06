import { createFileRoute } from '@tanstack/react-router'
import { AuthGuard } from '../../utils/auth'

export const Route = createFileRoute('/map/')({
    beforeLoad: AuthGuard,
    component: MapIndex,
})

function MapIndex() {
    return (
        <>
            <div>Hello /map/!</div>
        </>
    )
}
