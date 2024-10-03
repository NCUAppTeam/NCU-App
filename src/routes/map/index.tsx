import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../../components'
import { AuthGuard } from '../../utils/auth'

export const Route = createFileRoute('/map/')({
    beforeLoad: AuthGuard,
    component: MapIndex,
})

function MapIndex() {
    return (
        <>
            <Header />
            <div>Hello /map/!</div>
        </>
    )
}
