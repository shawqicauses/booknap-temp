/* eslint-disable camelcase */
import React, {useState, Dispatch, SetStateAction, useEffect} from "react"
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
import {IBookingReq, ICheckSitting} from "../../types"
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
  reset,
  isOpen,
  setIsOpen
}: {
  label: string
  value: number
  handleClickPlus: React.MouseEventHandler<Element>
  handleClickMinus: React.MouseEventHandler<Element>
  reset: React.MouseEventHandler<Element>
  isOpen: boolean
  setIsOpen: Function
}) {
  return (
    <div
      className={`dark:bg-mirage ${
        isOpen ? "rounded-xl-3 pb-3" : "rounded-full"
      }  bg-gray-100 px-4 py-1.5`}>
      <div className="flex justify-between items-center">
        <h3>{label}</h3>
        <MyButton
          isIconOnly
          color="transparent"
          onClick={(e) => {
            if (isOpen) {
              reset(e)
            } else {
              handleClickPlus(e)
            }
            setIsOpen((pre: boolean) => !pre)
          }}>
          {isOpen ? (
            <IoMdClose className="w-6 h-6 text-[#B9B9B9]" />
          ) : (
            <HiOutlinePlus className="h-6 w-6 text-[#B9B9B9]" />
          )}
        </MyButton>
      </div>
      {isOpen ? (
        <>
          <h4 className="label-gray mb-2 text-sm text-[#909090]">Quantity</h4>
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
    <div className="mt-10 overflow-y-scroll hide-scrollbar">
      <div className=" flex flex-col gap-3 h-full overflow-y-scroll hide-scrollbar px-5">
        <CounterStyled
          label="Single Room"
          value={data.noSingleRoom}
          handleClickPlus={() =>
            handleClick(1, "noSingleRoom", data.noSingleRoom)
          }
          handleClickMinus={() =>
            handleClick(-1, "noSingleRoom", data.noSingleRoom)
          }
          reset={() => handleClick(0, "noSingleRoom", 0)}
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
          reset={() => handleClick(0, "noDoubleRoom", 0)}
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
          reset={() => handleClick(0, "noSuiteRooms", 0)}
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
          reset={() => handleClick(0, "noPresidentialSuite", 0)}
          isOpen={isPresidentialOpen}
          setIsOpen={setIsPresidentialOpen}
        />
        <div className="flex-1 justify-end flex flex-col items-center mb-5">
          <MyButton
            className="inline-block"
            color="primary"
            radius="sm"
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
  pos,
  checkSittings
}: {
  isOpen: boolean
  onClose: () => void
  setPos: Dispatch<SetStateAction<IPosition | undefined>>
  myZoom: number
  destination: string
  pos: {lat: number; lng: number}
  checkSittings: ICheckSitting | undefined
}) {
  const {token} = useAuth()
  const {handleCurrentBookingOrder, currentBooking} = useCurrentBookingOrder()
  const [page, setPage] = useState<number>(0)
  const signIn = useDisclosure()
  const [check, setCheck] = useState({in: "", out: ""})

  useEffect(() => {
    if (checkSittings?.result.check_in && checkSittings.result.check_out) {
      setCheck({
        in: checkSittings.result.check_in,
        out: checkSittings.result.check_out
      })
    }
  }, [checkSittings])

  const {register, handleSubmit, watch, setValue, reset} =
    useForm<BasicFormData>({
      defaultValues: {
        FromDate: "",
        FromTime: check.in,
        ToDate: "",
        ToTime: check.out,
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
    setValue("FromTime", check.in)
    setValue("ToTime", check.out)
  }
  useEffect(() => {
    setValue("FromTime", check.in)
    setValue("ToTime", check.out)
  }, [check, setValue])

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
          setValue("FromTime", check.in)
          setValue("ToTime", check.out)
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
        size="md"
        backdrop="opaque"
        isDismissable={false}
        isOpen={isOpen}
        onClose={closeBookingModal}
        classNames={{...type5, base: "md:fixed md:top-2 md:right-8"}}>
        <ModalContent>
          <ModalBody className="overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className={`grid grid-cols-2 gap-4 w-[860px] my-transition  ${
                  page === 1 ? "-translate-x-[50%]" : ""
                }`}>
                <FormPageTow
                  data={watch()}
                  handleClick={handleClick}
                  setPage={setPage}
                />
                <div className="flex flex-col gap-1 relative justify-start overflow-y-scroll hide-scrollbar">
                  <MyButton
                    size="sm"
                    radius="md"
                    variant="bordered"
                    color="transparent"
                    className="border-[#B9B9B9] border-1.5 mt-1"
                    isIconOnly
                    onClick={() => setPage(0)}>
                    <AiOutlineDoubleLeft className="h-5 w-5 text-[#B9B9B9]" />
                  </MyButton>
                  <div className="overflow-y-scroll hide-scrollbar mb-5">
                    <div className="pt-0 px-5 w-auto flex gap-2 flex-col">
                      <div>
                        <label htmlFor="date" className="label-gray text-sm">
                          Destination:
                        </label>
                        <input
                          value={destination}
                          disabled
                          className="input p-3 leading-5 bg-gray-100 rounded-lg dark:text-white dark:bg-mirage dark:border-mirage"
                        />
                      </div>
                      <div>
                        <label htmlFor="date" className="label-gray text-sm">
                          Date:
                        </label>
                        <div className="flex justify-between items-center mb-2">
                          <label
                            htmlFor="date"
                            className="w-[60px] dark:text-white inline-block">
                            From:
                          </label>
                          <div className="my-flex gap-2">
                            <Input
                              type="date"
                              {...register("FromDate", {
                                required: true
                              })}
                              value={watch().FromDate}
                              variant="flat"
                              classNames={{
                                inputWrapper: "shadow-none dark:bg-mirage",
                                input: "dark:text-white"
                              }}
                            />
                            <Input
                              type="time"
                              {...register("FromTime", {
                                required: true
                              })}
                              value={watch().FromTime}
                              variant="flat"
                              classNames={{
                                inputWrapper: "shadow-none dark:bg-mirage",
                                input: "dark:text-white"
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="date"
                            className="w-[60px] dark:text-white inline-block">
                            To:
                          </label>
                          <div className="my-flex gap-2">
                            <Input
                              type="date"
                              {...register("ToDate", {
                                required: true,
                                min: toDayDate[0]
                              })}
                              value={watch().ToDate}
                              variant="flat"
                              classNames={{
                                inputWrapper: "shadow-none dark:bg-mirage",
                                input: "dark:text-white"
                              }}
                            />
                            <Input
                              type="time"
                              {...register("ToTime", {
                                required: true
                              })}
                              value={watch().ToTime}
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
                        <label
                          htmlFor="numPeople"
                          className="label-gray text-sm">
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
                        <label
                          htmlFor="date"
                          className="w-[60px]  label-gray text-sm">
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
                        <label htmlFor="note" className="label-gray text-sm">
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
                        className="inline-block"
                        radius="sm"
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
