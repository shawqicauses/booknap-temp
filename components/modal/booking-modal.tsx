/* eslint-disable camelcase */
import React, {useState, Dispatch, SetStateAction} from "react"
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
import {toast} from "react-toastify"

import SignInModal from "./sign-in-modal"
import MyButton from "../uis/button"
import {type5} from "../uis/modal-styles"
import client from "../../helpers/client"
import {IBookingReq} from "../../types"
import {useCurrentBookingOrder} from "../../stores/current-booking-order"
import {useAuth} from "../../stores/auth"

export interface IAction {
  type: string
  filed: string
  value: number
}

interface BasicFormData {
  lat: number
  lng: number
  FromDate: string
  FromTime: string
  ToDate: string
  ToTime: string
  note: string
  noAdults: number
  noChildren: number
  noSingleRoom: number
  noDoubleRoom: number
  noSuiteRooms: number
  noPresidentialSuite: number
}
interface IPosition {
  lat: number
  lng: number
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
    <div className=" w-fit p-1 flex items-center rounded-xl bg-gray-100 dark:bg-mirage">
      <button
        type="button"
        className="button-gray inline-block p-1 rounded-xl dark:bg-ebony-clay"
        onClick={(e) => {
          if (value > 1) {
            handleClickMinus(e)
          }
        }}>
        <FiMinus className="h-5 w-5 text-gray-400" />
      </button>
      <span className="text-lg inline-block  w-10 text-center">{value}</span>
      <button
        type="button"
        className="button-gray inline-block p-1 rounded-xl dark:bg-ebony-clay"
        onClick={handleClickPlus}>
        <FiPlus className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  )
}

const CounterStyled = function CounterStyled({
  label,
  value,
  handleClickPlus,
  handleClickMinus,
  isOpen,
  setIsOpen
}: {
  label: string
  value: number
  handleClickPlus: React.MouseEventHandler<Element>
  handleClickMinus: React.MouseEventHandler<Element>
  isOpen: boolean
  setIsOpen: Function
}) {
  return (
    <div
      className={`dark:bg-mirage ${
        isOpen ? "rounded-xl pb-3" : "rounded-full "
      }  bg-gray-50 px-4 py-1.5`}>
      <div className="flex justify-between items-center">
        <h3>{label}</h3>
        <MyButton
          isIconOnly
          onClick={(e) => {
            if (isOpen) {
              handleClickMinus(e)
            } else {
              handleClickPlus(e)
            }
            setIsOpen((pre: boolean) => !pre)
          }}>
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
  setPage
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>
  handleClick: Function
  data: BasicFormData
}) {
  const [isSingleOpen, setIsSingleOpen] = useState<boolean>(false)
  const [isDoubleOpen, setIsDoubleOpen] = useState<boolean>(false)
  const [isSuiteOpen, setIsSuiteOpen] = useState<boolean>(false)
  const [isPresidentialOpen, setIsPresidentialOpen] = useState<boolean>(false)

  return (
    <div className="mt-10 w-[360px]">
      <div className=" flex flex-col gap-3 h-full overflow-y-scroll hide-scrollbar">
        <CounterStyled
          label="Single Room"
          value={data.noSingleRoom}
          handleClickPlus={() =>
            handleClick(1, "noSingleRoom", data.noSingleRoom)
          }
          handleClickMinus={() =>
            handleClick(-1, "noSingleRoom", data.noSingleRoom)
          }
          isOpen={isSingleOpen}
          setIsOpen={setIsSingleOpen}
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
          isOpen={isDoubleOpen}
          setIsOpen={setIsDoubleOpen}
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
          isOpen={isSuiteOpen}
          setIsOpen={setIsSuiteOpen}
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
          isOpen={isPresidentialOpen}
          setIsOpen={setIsPresidentialOpen}
        />
        <div className="flex-1 justify-end flex flex-col items-center">
          <MyButton
            className=""
            color="primary"
            fullWidth
            onClick={() => {
              if (
                data.noSingleRoom ||
                data.noDoubleRoom ||
                data.noSuiteRooms ||
                data.noPresidentialSuite
              ) {
                setPage(1)
              }
            }}>
            Next
          </MyButton>
        </div>
      </div>
    </div>
  )
}

const BookingModal = function BookingModal({
  isOpen,
  onClose,
  myZoom,
  destination,
  pos
}: {
  isOpen: boolean
  onClose: () => void
  setPos: Dispatch<SetStateAction<IPosition | undefined>>
  myZoom: number
  destination: string
  pos: {lat: number; lng: number}
}) {
  const {token} = useAuth()
  const {handleCurrentBookingOrder, currentBooking} = useCurrentBookingOrder()
  const [page, setPage] = useState<number>(0)
  const signIn = useDisclosure()
  const {register, handleSubmit, watch, setValue, reset} =
    useForm<BasicFormData>({
      defaultValues: {
        FromDate: "",
        FromTime: "12:00",
        ToDate: "",
        ToTime: "02:00",
        note: "",
        noAdults: 0,
        noChildren: 0,
        noDoubleRoom: 0,
        noPresidentialSuite: 0,
        noSingleRoom: 0,
        noSuiteRooms: 0
      },
      criteriaMode: "all"
    })
  const closeBookingModal = () => {
    setPage(0)
    onClose()
    reset()
  }

  const handleClick = (
    num: number,
    filedName:
      | "noAdults"
      | "noChildren"
      | "noSingleRoom"
      | "noDoubleRoom"
      | "noSuiteRooms"
      | "noPresidentialSuite",
    currantValue: number
  ) => {
    if (currantValue + num >= 0) {
      setValue(filedName, currantValue + num)
    }
  }

  const onSubmit: SubmitHandler<BasicFormData> = async (
    formData: BasicFormData
  ) => {
    if (currentBooking) {
      toast.error("You are Booking Now", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
      return
    }
    if (!token) {
      signIn.onOpen()
    } else if (
      new Date(`${formData.FromDate} ${formData.FromTime}`) >=
      new Date(`${formData.ToDate} ${formData.ToTime}`)
    ) {
      toast.error("Dates and Time are incorrect", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
    } else {
      client("hotels/bookings/create", {
        method: "POST",
        body: JSON.stringify({
          lat: pos.lat,
          lng: pos.lng,
          date_from: `${formData.FromDate} ${formData.FromTime}`,
          date_to: `${formData.ToDate} ${formData.ToTime}`,
          adults: formData.noAdults,
          children: formData.noChildren,
          notes: formData.note,
          country_id: 1,
          city_id: 2,
          distance: 1000 * myZoom + 1000,
          rooms: [
            {type: 1, number: formData.noSingleRoom},
            {type: 2, number: formData.noDoubleRoom},
            {type: 3, number: formData.noSuiteRooms},
            {type: 4, number: formData.noPresidentialSuite}
          ]
        } as IBookingReq)
      })
        ?.then((res) => {
          if (res.result) {
            handleCurrentBookingOrder(res.result)
            closeBookingModal()
            reset()
            setPage(0)
          }
          reset()
          setPage(0)
        })
        .catch(() => {
          toast.error("You are Banned", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored"
          })
          reset()
          setPage(0)
        })
    }
  }

  const toDayDate = new Date().toISOString().split("T")
  return (
    <>
      <Modal
        size="sm"
        backdrop="opaque"
        isDismissable={false}
        isOpen={isOpen}
        onClose={closeBookingModal}
        classNames={{...type5, base: "fixed top-2 right-8"}}>
        <ModalContent>
          <ModalBody className="overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className={`flex gap-4 w-[756px] my-transition h-[550px] ${
                  page === 1 ? "-translate-x-[50%]" : ""
                }`}>
                <FormPageTow
                  data={watch()}
                  handleClick={handleClick}
                  setPage={setPage}
                />
                <div className="flex flex-col gap-1 relative justify-start w-[360px]">
                  <MyButton
                    size="sm"
                    radius="full"
                    color="transparent"
                    isIconOnly
                    onClick={() => setPage(0)}>
                    <AiOutlineDoubleLeft className="h-4 w-4" />
                  </MyButton>
                  <div className="overflow-y-scroll hide-scrollbar mb-5">
                    <div className="pt-0 px-5 w-auto flex gap-2 flex-col">
                      <div>
                        <label htmlFor="date" className="label-gray">
                          destination:
                        </label>
                        <input
                          value={destination}
                          disabled
                          className="input p-3 leading-5 bg-gray-100 rounded-lg dark:text-white dark:bg-mirage dark:border-mirage"
                        />
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
                              value={watch().FromDate}
                              {...register("FromDate", {
                                required: true,
                                min: toDayDate[0]
                              })}
                              variant="flat"
                              classNames={{
                                inputWrapper: "shadow-none dark:bg-mirage",
                                input: "dark:text-white"
                              }}
                            />
                            <Input
                              type="time"
                              value={watch().FromTime}
                              {...register("FromTime", {
                                required: true,
                                min: toDayDate[1]
                              })}
                              variant="flat"
                              classNames={{
                                inputWrapper: "shadow-none dark:bg-mirage",
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
                              value={watch().ToDate}
                              {...register("ToDate", {
                                required: true,
                                min: toDayDate[0]
                              })}
                              variant="flat"
                              classNames={{
                                inputWrapper: "shadow-none dark:bg-mirage",
                                input: "dark:text-white"
                              }}
                            />
                            <Input
                              type="time"
                              value={watch().ToTime}
                              {...register("ToTime", {
                                required: true,
                                min: toDayDate[1]
                              })}
                              variant="flat"
                              classNames={{
                                inputWrapper: "shadow-none dark:bg-mirage",
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
                            value={watch().noAdults}
                            handleClickPlus={() =>
                              handleClick(1, "noAdults", watch().noAdults)
                            }
                            handleClickMinus={() =>
                              handleClick(-1, "noAdults", watch().noAdults)
                            }
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <label htmlFor="noAdults" className="dark:text-white">
                            Children
                          </label>
                          <Counter
                            value={watch().noChildren}
                            handleClickPlus={() =>
                              handleClick(1, "noChildren", watch().noChildren)
                            }
                            handleClickMinus={() =>
                              handleClick(-1, "noChildren", watch().noChildren)
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="date" className="w-[60px]  label-gray">
                          Number Of Room:
                        </label>
                        <div className="grid grid-cols-2 gap-2 ">
                          {watch().noSingleRoom ? (
                            <span className="body-sm text-black dark:text-white">
                              {watch().noSingleRoom} Single Room
                            </span>
                          ) : null}
                          {watch().noDoubleRoom ? (
                            <span className="body-sm text-black dark:text-white">
                              {watch().noDoubleRoom} Double Room
                            </span>
                          ) : null}
                          {watch().noSuiteRooms ? (
                            <span className="body-sm text-black dark:text-white">
                              {watch().noSuiteRooms} Suite Room
                            </span>
                          ) : null}
                          {watch().noPresidentialSuite ? (
                            <span className="body-sm text-black dark:text-white">
                              {watch().noPresidentialSuite} Presidential Suite
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="mb-1">
                        <label htmlFor="note" className="label-gray">
                          Note:
                        </label>
                        <textarea
                          id="note"
                          value={watch().note}
                          {...register("note")}
                          className="input p-3 leading-5 bg-gray-100 rounded-xl dark:text-white resize-none dark:bg-mirage dark:border-mirage"
                        />
                      </div>
                      <MyButton
                        className=""
                        color="primary"
                        fullWidth
                        type="submit">
                        Order
                      </MyButton>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SignInModal isOpen={signIn.isOpen} onClose={signIn.onClose} />
    </>
  )
}

export default BookingModal
