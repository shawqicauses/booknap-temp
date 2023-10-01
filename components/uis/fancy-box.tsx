import {ReactNode, useEffect, useRef} from "react"
import {Fancybox as NativeFancyBox} from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"

const FancyBox = function FancyBox({
  delegate,
  options,
  children
}: {
  delegate?: string
  options?: any
  children: ReactNode
}) {
  const ref = useRef(null)
  useEffect(() => {
    const container = ref.current
    if (delegate) NativeFancyBox.bind(container, delegate, options)

    return () => {
      NativeFancyBox.unbind(container)
      NativeFancyBox.close()
    }
  })

  return <div ref={ref}>{children}</div>
}

FancyBox.defaultProps = {
  delegate: "[data-fancybox]",
  options: {}
}

export default FancyBox
