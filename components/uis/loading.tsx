import {Spinner} from "@nextui-org/react"
import React from "react"

const LoadingDiv = function LoadingDiv() {
  return (
    <div className="w-full h-full my-flex min-h-screen">
      <Spinner
        size="lg"
        // classNames={{
        //   circle1: "border-my-primary border-0 border-t-3 border-l-3",
        //   circle2: "border-my-primary border-0 border-b-3 border-l-3"
        // }}
      />
    </div>
  )
}

export default LoadingDiv
