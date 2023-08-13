import React, {useReducer, useState} from "react"
import {FiMinus, FiPlus} from "react-icons/fi"
import {AiOutlineDoubleLeft} from "react-icons/ai"
import {IoMdClose} from "react-icons/io"
import {HiOutlinePlus} from "react-icons/hi"
import {SubmitHandler, useForm} from "react-hook-form"
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure
} from "@nextui-org/react"

import SignInModal from "./sign-in-modal"
import MyButton from "../button"
import {type4} from "../modal-styles"

interface IInitObject {
  noAdults: number
  noChildren: number
  noSingleRoom: number
  noDoubleRoom: number
  noSuiteRooms: number
  noPresidentialSuite: number
}

const initObject: IInitObject = {
  noAdults: 0,
  noChildren: 0,
  noSingleRoom: 0,
  noDoubleRoom: 0,
  noSuiteRooms: 0,
  noPresidentialSuite: 0
}

export interface IAction {
  type: string
  filed: string
  value: number
}

interface BasicFormData {
  destination: string
  FromDate: string
  FromTime: string
  ToDate: string
  ToTime: string
  note: string
}

const reducer = (state: IInitObject, action: IAction) => {
  switch (action.type) {
    case "update":
      return {...state, [action.filed]: action.value}
    default:
      return state
  }
}

export const Counter = function Counter({
  value,
  handleClickPlus,
  handleClickMinus
}: {
  value: number
  handleClickPlus: React.MouseEventHandler<Element>
  handleClickMinus: React.MouseEventHandler<Element>
}) {
  return (
    <div className="input w-fit p-0.5 flex items-center rounded-xl bg-gray-100">
      <button
        type="button"
        className="button-gray inline-block p-1 rounded-xl"
        onClick={handleClickPlus}>
        <FiPlus className="h-5 w-5 text-gray-400" />
      </button>
      <span className="text-lg inline-block  w-10 text-center">{value}</span>
      <button
        type="button"
        className="button-gray inline-block p-1 rounded-xl"
        onClick={handleClickMinus}>
        <FiMinus className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  )
}

const CounterStyled = function CounterStyled({
  label,
  value,
  handleClickPlus,
  handleClickMinus,
  openTab,
  tabNumber,
  setOpenTab
}: {
  label: string
  value: number
  handleClickPlus: React.MouseEventHandler<Element>
  handleClickMinus: React.MouseEventHandler<Element>
  openTab: number | null
  tabNumber: number
  setOpenTab: React.Dispatch<React.SetStateAction<number | null>>
}) {
  const isOpen = openTab === tabNumber
  return (
    <div
      className={`${
        isOpen ? "rounded-xl pb-3" : "rounded-full "
      }  bg-gray-50 px-4 pt-1.5`}>
      <div className="flex justify-between items-center">
        <h3>
          {label}{" "}
          <span className="ml-3">{value > 0 && !isOpen ? value : ""}</span>
        </h3>
        <MyButton
          isIconOnly
          onClick={() => (isOpen ? setOpenTab(null) : setOpenTab(tabNumber))}>
          {isOpen ? (
            <IoMdClose className="w-5 h-5 text-gray-400" />
          ) : (
            <HiOutlinePlus className="h-5 w-5 text-gray-400" />
          )}
        </MyButton>
      </div>
      {isOpen ? (
        <>
          <h4 className="label-gray mb-2">Quantity</h4>
          <Counter
            handleClickMinus={handleClickMinus}
            handleClickPlus={handleClickPlus}
            value={value}
          />
        </>
      ) : null}
    </div>
  )
}

const FormPageTow = function FormPageTow({
  handleClick,
  data,
  setPage,
  openSignIn
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>
  handleClick: Function
  data: IInitObject
  openSignIn: () => void
}) {
  const [openTab, setOpenTab] = useState<number | null>(1)
  return (
    <div>
      <MyButton
        size="sm"
        radius="full"
        color="white"
        isIconOnly
        onClick={() => setPage(0)}>
        <AiOutlineDoubleLeft className="h-4 w-4" />
      </MyButton>
      <div className="mt-4 flex flex-col gap-3">
        <CounterStyled
          label="Single Room"
          value={data.noSingleRoom}
          handleClickPlus={() =>
            handleClick(1, "noSingleRoom", data.noSingleRoom)
          }
          handleClickMinus={() =>
            handleClick(-1, "noSingleRoom", data.noSingleRoom)
          }
          openTab={openTab}
          tabNumber={1}
          setOpenTab={setOpenTab}
        />
        <CounterStyled
          label="Double Room"
          value={data.noDoubleRoom}
          handleClickPlus={() =>
            handleClick(1, "noDoubleRoom", data.noDoubleRoom)
          }
          handleClickMinus={() =>
            handleClick(-1, "noDoubleRoom", data.noDoubleRoom)
          }
          openTab={openTab}
          tabNumber={2}
          setOpenTab={setOpenTab}
        />
        <CounterStyled
          label="Suite Rooms"
          value={data.noSuiteRooms}
          handleClickPlus={() =>
            handleClick(1, "noSuiteRooms", data.noSuiteRooms)
          }
          handleClickMinus={() =>
            handleClick(-1, "noSuiteRooms", data.noSuiteRooms)
          }
          openTab={openTab}
          tabNumber={3}
          setOpenTab={setOpenTab}
        />
        <CounterStyled
          label="Presidential Suite"
          value={data.noPresidentialSuite}
          handleClickPlus={() =>
            handleClick(1, "noPresidentialSuite", data.noPresidentialSuite)
          }
          handleClickMinus={() =>
            handleClick(-1, "noPresidentialSuite", data.noPresidentialSuite)
          }
          openTab={openTab}
          tabNumber={4}
          setOpenTab={setOpenTab}
        />

        <MyButton type="submit" color="primary" onClick={openSignIn} fullWidth>
          Order
        </MyButton>
      </div>
    </div>
  )
}

const BookingModal = function BookingModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [data, dispatch] = useReducer(reducer, initObject)
  const [page, setPage] = useState<number>(0)
  const handleClick = (
    num: number,
    filedName: string,
    currantValue: number
  ) => {
    if (currantValue + num >= 0) {
      dispatch({
        type: "update",
        filed: filedName,
        value: currantValue + num
      })
    }
  }

  const {register, handleSubmit, getValues} = useForm<BasicFormData>()
  const onSubmit: SubmitHandler<BasicFormData> = (formData: BasicFormData) => {
    const finalData = {
      ...formData,
      ...data
    }
    if (
      new Date(`${finalData.FromDate} ${finalData.FromTime}`) >=
      new Date(`${finalData.ToDate} ${finalData.ToTime}`)
    ) {
      // return
    }
    // console.log(finalData)
  }
  const toDayDate = new Date().toISOString().split("T")[0]
  const signIn = useDisclosure()

  return (
    <>
      <Modal
        size="sm"
        isDismissable={false}
        isOpen={isOpen}
        onClose={onClose}
        classNames={type4}
        placement="center">
        <ModalContent>
          <ModalBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1 relative justify-start">
              {page === 0 ? (
                <div className="pt-10 px-5">
                  <div>
                    <label htmlFor="destination" className="label-gray">
                      Destination:
                    </label>
                    <select
                      id="destination"
                      {...register("destination", {required: true})}
                      className="input p-3 leading-5 bg-gray-100 rounded-xl">
                      <option value="1">Where are you going?</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="label-gray">
                      Date:
                    </label>
                    <div className="flex justify-between !gap-0 items-center mb-2">
                      <label
                        htmlFor="date"
                        className="w-[60px] dark:text-white">
                        From:
                      </label>
                      <div className="my-flex gap-2">
                        <Input
                          type="date"
                          {...register("FromDate", {required: true})}
                          min={toDayDate}
                          variant="flat"
                          classNames={{
                            inputWrapper: "shadow-none",
                            input: "dark:text-white"
                          }}
                        />
                        <Input
                          type="time"
                          {...register("FromTime", {required: true})}
                          variant="flat"
                          classNames={{
                            inputWrapper: "shadow-none",
                            input: "dark:text-white"
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between !gap-0 items-center">
                      <label
                        htmlFor="date"
                        className="w-[60px] dark:text-white">
                        To:
                      </label>
                      <div className="my-flex gap-2">
                        <Input
                          type="date"
                          {...register("ToDate", {required: true})}
                          min={toDayDate}
                          variant="flat"
                          classNames={{
                            inputWrapper: "shadow-none",
                            input: "dark:text-white"
                          }}
                        />
                        <Input
                          type="time"
                          {...register("ToTime", {required: true})}
                          variant="flat"
                          classNames={{
                            inputWrapper: "shadow-none",
                            input: "dark:text-white"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="numPeople" className="label-gray">
                      Number Of People:
                    </label>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="noAdults" className="dark:text-white">
                        Adults
                      </label>
                      <Counter
                        value={data.noAdults}
                        handleClickPlus={() =>
                          handleClick(1, "noAdults", data.noAdults)
                        }
                        handleClickMinus={() =>
                          handleClick(-1, "noAdults", data.noAdults)
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="noAdults" className="dark:text-white">
                        Children
                      </label>
                      <Counter
                        value={data.noChildren}
                        handleClickPlus={() =>
                          handleClick(1, "noChildren", data.noChildren)
                        }
                        handleClickMinus={() =>
                          handleClick(-1, "noChildren", data.noChildren)
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="note" className="label-gray">
                      Note:
                    </label>
                    <textarea
                      id="note"
                      {...register("note")}
                      className="input p-3 leading-5 bg-gray-100 rounded-xl resize-none"
                    />
                  </div>
                  <MyButton
                    type="submit"
                    color="primary"
                    onClick={() => {
                      if (
                        getValues().FromDate &&
                        getValues().FromTime &&
                        getValues().ToDate &&
                        getValues().ToTime &&
                        getValues().destination &&
                        (data.noAdults > 0 || data.noChildren > 0)
                      ) {
                        setPage(1)
                      }
                    }}
                    fullWidth>
                    Order
                  </MyButton>
                </div>
              ) : (
                <FormPageTow
                  data={data}
                  handleClick={handleClick}
                  setPage={setPage}
                  openSignIn={signIn.onOpen}
                />
              )}
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SignInModal isOpen={signIn.isOpen} onClose={signIn.onClose} />
    </>
  )
}

export default BookingModal
