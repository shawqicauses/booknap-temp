/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, {useState, useEffect, Dispatch, SetStateAction} from "react"
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
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete"
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
    <div className=" w-fit p-2 flex items-center rounded-xl bg-gray-100 dark:bg-blue-charcoal">
      <button
        type="button"
        className="button-gray inline-block p-1 rounded-xl dark:bg-mirage"
        onClick={handleClickPlus}>
        <FiPlus className="h-5 w-5 text-gray-400" />
      </button>
      <span className="text-lg inline-block  w-10 text-center">{value}</span>
      <button
        type="button"
        className="button-gray inline-block p-1 rounded-xl dark:bg-mirage"
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
      className={`dark:bg-mirage ${
        isOpen ? "rounded-xl pb-3" : "rounded-full "
      }  bg-gray-50 px-4 py-1.5`}>
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
  setPage
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>
  handleClick: Function
  data: BasicFormData
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
        <MyButton type="submit" color="primary" fullWidth>
          Order
        </MyButton>
      </div>
    </div>
  )
}

const PlacesSuggestionInput = function PlacesSuggestionInput({
  setPosition,
  setDestination,
  startValue
}: {
  setPosition: Function
  setDestination: Function
  startValue: string
}) {
  const {
    ready,
    value,
    suggestions: {status, data},
    setValue,
    clearSuggestions,
    init
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {},
    debounce: 300
  })
  init()
  const handleInput = (e: any) => {
    setDestination(e.target.value)
  }
  useEffect(() => {
    setValue(startValue)
  }, [startValue, setValue])

  const handleSelect = (e: any) => () => {
    setValue(e.description, false)
    clearSuggestions()
    console.log(e)
    getGeocode({address: e.description}).then((results) => {
      const {lat, lng} = getLatLng(results[0])
      console.log("📍 Coordinates: ", {lat, lng})
      setPosition(lat, lng)
    })
  }
  return (
    <div>
      <label htmlFor="destination" className="label-gray">
        Destination:
      </label>
      <div className="relative">
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Where are you going?"
          className="input p-3 leading-5 bg-gray-100 rounded-xl resize-none"
        />
        {status === "OK" && (
          <ul className="absolute top-[100%] left-0 overflow-y-scroll h-[200px] bg-white z-10 flex flex-col gap-2 w-full shadow-md rounded-base divide-y-1">
            {data.map((suggestion) => {
              const {
                place_id,
                structured_formatting: {main_text, secondary_text}
              } = suggestion

              return (
                <li
                  key={place_id}
                  onClick={handleSelect(suggestion)}
                  aria-hidden="true"
                  className="p-3 w-full flex justify-between flex-wrap">
                  <span className="heading-3">{main_text}</span>
                  <span className="body">{secondary_text}</span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

const BookingModal = function BookingModal({
  isOpen,
  onClose,
  setPos,
  myZoom
}: {
  isOpen: boolean
  onClose: () => void
  setPos: Dispatch<SetStateAction<IPosition | undefined>>
  myZoom: number
}) {
  const {token} = useAuth()
  const {handleCurrentBookingOrder, currentBooking} = useCurrentBookingOrder()
  const [page, setPage] = useState<number>(0)

  const signIn = useDisclosure()
  const {register, handleSubmit, getValues, watch, setValue, reset} =
    useForm<BasicFormData>({
      defaultValues: {
        FromDate: "",
        FromTime: "",
        ToDate: "",
        ToTime: "",
        note: "",
        noAdults: 0,
        noChildren: 0,
        noDoubleRoom: 0,
        noPresidentialSuite: 0,
        noSingleRoom: 0,
        noSuiteRooms: 0
      }
    })

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
          lat: formData.lat,
          lng: formData.lng,
          date_from: `${formData.FromDate} ${formData.FromTime}`,
          date_to: `${formData.ToDate} ${formData.ToTime}`,
          adults: formData.noAdults,
          children: formData.noChildren,
          notes: formData.note,
          country_id: 1,
          city_id: 2,
          distance: 1000 * myZoom,
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
            onClose()
            reset()
            setPage(0)
          }
        })
        .catch((error) => {
          console.log(error)
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
        })
    }
  }

  const setPosition = (lat: number, lng: number) => {
    setValue("lat", lat)
    setValue("lng", lng)
    setPos({lat: lat, lng: lng})
  }

  const toDayDate = new Date().toISOString().split("T")
  const [destination, setDestination] = useState("")
  return (
    <>
      <Modal
        size="sm"
        backdrop="transparent"
        isDismissable={false}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{...type5, base: "fixed top-5 right-10"}}>
        <ModalContent>
          <ModalBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1 relative justify-start">
              {page === 0 ? (
                <div className="pt-10 px-5 w-auto flex gap-2 flex-col">
                  <PlacesSuggestionInput
                    setPosition={setPosition}
                    setDestination={setDestination}
                    startValue={destination}
                  />
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
                            inputWrapper: "shadow-none",
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
                          value={watch().ToDate}
                          {...register("ToDate", {
                            required: true,
                            min: toDayDate[0]
                          })}
                          variant="flat"
                          classNames={{
                            inputWrapper: "shadow-none",
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
                  <div className="mb-3">
                    <label htmlFor="note" className="label-gray">
                      Note:
                    </label>
                    <textarea
                      id="note"
                      value={watch().note}
                      {...register("note")}
                      className="input p-3 leading-5 bg-gray-100 rounded-xl resize-none"
                    />
                  </div>
                  <MyButton
                    color="primary"
                    onClick={() => {
                      if (
                        getValues().FromDate &&
                        getValues().FromTime &&
                        getValues().ToDate &&
                        getValues().ToTime &&
                        getValues().lat &&
                        getValues().lng &&
                        (getValues().noAdults > 0 || getValues().noChildren > 0)
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
                  data={watch()}
                  handleClick={handleClick}
                  setPage={setPage}
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
