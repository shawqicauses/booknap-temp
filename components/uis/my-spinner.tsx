import Image from "next/image"
import React from "react"

const MySpinner = function MySpinner() {
  return (
    <div className="w-10 h-10 ">
      <Image alt="Spinner" src="/spinner.svg" fill className="!relative spinner" />
    </div>
  )
}

export default MySpinner
