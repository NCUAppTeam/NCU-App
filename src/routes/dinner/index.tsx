import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../../components'
import { Filter } from '../../components/pages/dinner/filter'
import { AuthGuard } from '../../utils/auth'

export const Route = createFileRoute('/dinner/')({
    beforeLoad: AuthGuard,
    component: DinnerIndex,
})

function DinnerIndex() {
    return (
        <>
            <Header />
            <Filter />
        </>
    )
}