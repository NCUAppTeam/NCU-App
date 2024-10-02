import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../../components'
import { AuthGuard } from '../../utils/auth'

export const Route = createFileRoute('/dinner/')({
    beforeLoad: AuthGuard,
    component: DinnerIndex,
})

function DinnerIndex() {
    return (
        <>
            <Header />
            <div>Hello /dinner/!</div>
        </>
    )
}