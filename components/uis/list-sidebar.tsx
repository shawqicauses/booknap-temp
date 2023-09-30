import React, {useEffect, useState} from "react"
import {BiArrowBack} from "react-icons/bi"
import MyButton from "./button"

const ListSidebar = function ListSidebar({
  show,
  setShow,
  children
}: {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}) {
  const [windowWidth, setWindowWidth] = useState<number>(300)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.screen.availWidth)
    }
  }, [])

  return (
    <div
      className={`fixed my-transition z-30 left-0 bottom-0  shadow-md ${
        show ? "" : "-translate-x-full"
      } main-hight  h-full`}
      style={{width: `min(454px, calc(${windowWidth} - 40px))`}}>
      <div className="relative">
        {show ? (
          <MyButton
            className="absolute top-1 -right-9 z-10 shadow-sm"
            size="smSquare"
            radius="none"
            color="white"
            onClick={() => {
              setShow(false)
            }}>
            <BiArrowBack className="h-5 w-5" />
          </MyButton>
        ) : null}
      </div>
      {children}
    </div>
  )
}

export default ListSidebar
