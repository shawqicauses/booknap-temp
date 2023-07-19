import React, {useState} from "react"
import {IoMdClose} from "react-icons/io"
import Button from "./button"

interface IModelProps {
  children: React.ReactElement
  location: {top?: string; left?: string; bottom?: string; right?: string}
  hasOverLay?: boolean
  modalStyle?: string
  closeAble?: boolean
}

const Modal = function Modal({
  children,
  location = {top: "top-2", left: "left-3"},
  hasOverLay,
  modalStyle,
  closeAble
}: IModelProps) {
  const [isOpened, setIsOpened] = useState(true)
  return (
    <>
      {hasOverLay && isOpened && (
        <div
          id="overlay"
          className="fixed z-40 w-screen h-screen inset-0 bg-gray-900 !bg-opacity-60"
        />
      )}
      <div
        className={`${
          isOpened ? "" : "hidden"
        } fixed z-40 ${modalStyle} ${Object.values(location).join(" ")}
          w-96  rounded-md px-8 py-6 space-y-5 drop-shadow-lg`}>
        {closeAble && (
          <div className=" justify-end flex flex-end">
            <Button
              icon={<IoMdClose className="w-5 h-5 text-gray-400" />}
              buttonStyle={{
                type: "button-white",
                other: ["p-2", "border-none"]
              }}
              handleClick={() => setIsOpened(false)}
            />
          </div>
        )}
        {children}
      </div>
    </>
  )
}

Modal.defaultProps = {
  hasOverLay: false,
  closeAble: true,
  modalStyle: "card-white"
}
export default Modal
