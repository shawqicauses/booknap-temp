import {Spinner} from "@nextui-org/react"
import React from "react"

const LoadingDiv = function LoadingDiv() {
  return (
    <div className="w-full h-full my-flex min-h-screen">
      <Spinner size="lg" />
    </div>
  )
}

export default LoadingDiv
