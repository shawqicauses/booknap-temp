import React, {useState} from "react"
import Button from "./button"

interface IModelProps {
  children: React.ReactElement
  location: {top?: string; left?: string; bottom?: string; right?: string}
}

const Modal = function Modal({
  children,
  location = {top: "top-2", left: "left-3"}
}: IModelProps) {
  const [isOpened, setIsOpened] = useState(true)
  return (
    <div
      className={`${
        isOpened ? "" : "hidden"
      } fixed z-40 card-white ${Object.values(location).join(" ")}
          w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg`}>
      {children}
      <div className=" justify-end hidden">
        <Button
          text="Close"
          buttonStyle={{type: "button-primary"}}
          handleClick={() => setIsOpened(false)}
        />
      </div>
    </div>
  )
}

export default Modal
