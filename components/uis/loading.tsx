import React from "react"
import MySpinner from "./my-spinner"

const LoadingDiv = function LoadingDiv() {
  return (
    <div className="w-full h-full my-flex min-h-screen">
      <MySpinner />
    </div>
  )
}

export default LoadingDiv
