import { JsxElement } from "typescript"

type textBoxProp = {
    children:React.ReactNode
  }

export const TextContainer = ({children}:textBoxProp) => {
    return <div>{children}</div>
}