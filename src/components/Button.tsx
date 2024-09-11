import { ReactNode } from "react"

type Props = {
  children: ReactNode,
  type: 'submit' | 'reset' | 'button',
}

export function Button(props: Props) {
  return (
    <button className="bg-cyan-600 text-white p-2 rounded" type={props.type} >
      {props.children}
    </button>
  )
}
