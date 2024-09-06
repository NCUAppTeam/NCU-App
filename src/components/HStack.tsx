import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export function HStack({ children }: Props) {
  return (
    <div className="flex">
      {children}
    </div>
  )
}
