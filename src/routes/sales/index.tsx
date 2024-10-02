import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../../components'
import { AuthGuard } from '../../utils/auth'

export const Route = createFileRoute('/sales/')({
    beforeLoad: AuthGuard,
    component: SalesIndex,
})

function SalesIndex() {
    return (
        <>
            <Header />
            <div>Hello /sales/!</div>
        </>
    )
}
