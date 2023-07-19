import React, {useReducer, useState, Fragment} from "react"
import {Field, Form, Formik} from "formik"
import {FaPlus} from "react-icons/fa"
import {FiMinus} from "react-icons/fi"
import {AiOutlineDoubleLeft} from "react-icons/ai"
import {IoMdClose} from "react-icons/io"
import {HiOutlinePlus} from "react-icons/hi"
import * as Yup from "yup"
import Modal from "../modal"
import Button from "../button"

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
const Counter = function Counter({
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
        <FaPlus className="h-5 w-5 text-gray-400" />
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
  openTab: number
  tabNumber: number
  setOpenTab: React.Dispatch<React.SetStateAction<number>>
}) {
  const isOpen = openTab === tabNumber
  return (
    <div
      className={`${
        isOpen ? "rounded-xl pb-3" : "rounded-full "
      }  bg-gray-50 px-4 pt-1.5`}>
      <div className="flex justify-between items-center">
        <h3>
          {label} <span className="ml-3">{value > 0 ? value : ""}</span>
        </h3>
        <Button
          icon={
            isOpen ? (
              <IoMdClose className="w-5 h-5 text-gray-400" />
            ) : (
              <HiOutlinePlus className="h-5 w-5 text-gray-400" />
            )
          }
          buttonStyle={{type: "button", other: ["rounded-full", "p-3"]}}
          handleClick={() => setOpenTab(tabNumber)}
        />
      </div>
      {isOpen && (
        <>
          <h4 className="label mb-2 text-gray-300">Quantity</h4>
          <div className="input w-fit p-0.5 flex items-center rounded-xl bg-gray-100">
            <button
              type="button"
              className="button-gray inline-block p-1 rounded-xl"
              onClick={handleClickPlus}>
              <FaPlus className="h-5 w-5 text-gray-400" />
            </button>
            <span className="text-lg inline-block  w-10 text-center">
              {value}
            </span>
            <button
              type="button"
              className="button-gray inline-block p-1 rounded-xl"
              onClick={handleClickMinus}>
              <FiMinus className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

const FormPageOne = function FormPageOne({
  handleChange,
  handleClick,
  data,
  setPage,
  values
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>
  handleChange: any
  handleClick: any
  data: IInitObject
  values: BasicFormData
}) {
  const toDayDate = new Date().toISOString().split("T")[0]

  return (
    <div>
      <div>
        <label htmlFor="destination" className="label">
          Destination:
        </label>
        <Field
          component="select"
          id="destination"
          name="destination"
          onChange={handleChange}
          className="input p-3 leading-5 bg-gray-100 rounded-xl">
          <option value="">Where are you going?</option>
        </Field>
      </div>

      <div>
        <label htmlFor="date" className="label">
          Date:
        </label>
        <div className="flex justify-between !gap-0 items-center mb-2">
          <label htmlFor="date" className="w-[60px]">
            From:
          </label>
          <div className="my-flex gap-2">
            <Field
              type="date"
              name="FromDate"
              id="date"
              onChange={handleChange}
              className="input p-3 leading-5 bg-gray-100 rounded-xl fle-1"
              min={toDayDate}
            />
            <Field
              type="time"
              name="FromTime"
              onChange={handleChange}
              className="input p-3 leading-5 bg-gray-100 rounded-xl max-w-max"
            />
          </div>
        </div>
        <div className="flex justify-between !gap-0 items-center">
          <label htmlFor="date" className="w-[60px]">
            To:
          </label>
          <div className="my-flex gap-2">
            <Field
              type="date"
              name="ToDate"
              id="date"
              onChange={handleChange}
              className="input p-3 leading-5 bg-gray-100 rounded-xl flex-1"
              min={toDayDate}
            />
            <Field
              type="time"
              name="ToTime"
              onChange={handleChange}
              className="input p-3 leading-5 bg-gray-100 rounded-xl max-w-min"
            />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="numPeople" className="label">
          Number Of People:
        </label>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="noAdults">Adults</label>
          <Counter
            value={data.noAdults}
            handleClickPlus={() => handleClick(1, "noAdults", data.noAdults)}
            handleClickMinus={() => handleClick(-1, "noAdults", data.noAdults)}
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="noAdults">Children</label>
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

      <div>
        <label htmlFor="note" className="label">
          Note:
        </label>
        <Field
          component="textarea"
          id="note"
          name="note"
          onChange={handleChange}
          className="input p-3 leading-5 bg-gray-100 rounded-xl resize-none"
        />
      </div>
      <Button
        text="Order"
        buttonStyle={{type: "button-primary", other: ["w-full"]}}
        handleClick={() => {
          if (
            values.FromDate &&
            values.FromTime &&
            values.ToDate &&
            values.ToTime &&
            values.destination &&
            (data.noAdults > 0 || data.noChildren > 0)
          ) {
            setPage(1)
          }
        }}
      />
    </div>
  )
}
const FormPageTow = function FormPageTow({
  isSubmitting,
  handleClick,
  data,
  setPage
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>
  isSubmitting: boolean
  handleClick: Function
  data: IInitObject
}) {
  const [openTab, setOpenTab] = useState<number>(1)
  return (
    <div>
      <Button
        isSubmit
        icon={<AiOutlineDoubleLeft className="h-5 w-5" color="#B9B9B9" />}
        buttonStyle={{type: "button-white", other: ["rounded-full", "p-1"]}}
        handleClick={() => setPage(0)}
      />
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
        <Button
          isSubmit
          text="Order"
          buttonStyle={{type: "button-primary", other: ["w-full"]}}
          disabled={isSubmitting}
        />
      </div>
    </div>
  )
}

const BookingModal = function BookingModal() {
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

  return (
    <Modal location={{top: "top-20", right: "sm:right-10 right-1"}}>
      <Formik
        initialValues={{
          destination: "Where are you going?",
          FromDate: "",
          FromTime: "",
          ToDate: "",
          ToTime: "",
          note: ""
        }}
        validationSchema={Yup.object({
          destination: Yup.string().required("Required"),
          FromDate: Yup.string().required("Required"),
          FromTime: Yup.string().required("Required"),
          ToDate: Yup.string().required("Required"),
          ToTime: Yup.string().required("Required"),
          note: Yup.string()
        })}
        onSubmit={async (values) => {
          alert(JSON.stringify({...values, ...data}, null, 2))
        }}>
        {({isSubmitting, handleChange, values}) => (
          <Form className="flex flex-col gap-2 relative">
            {page === 0 ? (
              <FormPageOne
                data={data}
                handleChange={handleChange}
                handleClick={handleClick}
                setPage={setPage}
                values={values}
              />
            ) : (
              <FormPageTow
                data={data}
                handleClick={handleClick}
                isSubmitting={isSubmitting}
                setPage={setPage}
              />
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default BookingModal
