/* eslint-disable camelcase */
import Image from "next/image"
import {useRouter} from "next/router"
import {useMemo} from "react"
import {Rating} from "@mui/material"
import MyButton from "../uis/button"
import {IBooking} from "../../types"

interface IStatus {
  done: "default"
  inProgress: "success"
  coming: "primary"
}
const states: IStatus = {
  done: "default",
  inProgress: "success",
  coming: "primary"
}
const BookingBox = function BookingBox({
  id,
  hotel,
  date_from,
  date_to,
  adults,
  children,
  rooms_no,
  onOpen,
  hideDetails
}: IBooking & {onOpen: () => void; hideDetails?: boolean}) {
  const rout = useRouter()
  const status: "inProgress" | "coming" | "done" = useMemo(() => {
    const today = new Date()
    const dateFrom = new Date(date_from)
    const dateTo = new Date(date_to)
    if (today > dateFrom && today < dateTo) {
      return "inProgress"
    }
    if (today < dateFrom) {
      return "coming"
    }
    return "done"
  }, [date_from, date_to])

  return (
    <div
      key={id}
      className="flex bg-gray-100 p-3 gap-3 rounded-lg items-center">
      <div className="relative !h-20 !w-20 rounded-lg overflow-hidden">
        <Image
          src={hotel?.logo || ""}
          alt={hotel?.name || "Hotel"}
          className="!relative"
          fill
        />
      </div>
      <div>
        <h3 className="heading-3">{hotel?.name}</h3>
        <Rating value={hotel?.stars} readOnly />
        {!hideDetails ? (
          <>
            <p className="body-sm">{`${date_from} To ${date_to}`}</p>
            <p className="body-sm">{`${adults} Adults - ${children} Children - ${rooms_no} Room`}</p>
          </>
        ) : null}
      </div>
      <div className="flex-1 flex justify-end">
        <MyButton
          color={states[status]}
          onClick={() => {
            if (status !== "inProgress") {
              onOpen()
            } else {
              rout.push(`/${id}`)
            }
          }}>
          #{id}
        </MyButton>
      </div>
    </div>
  )
}
BookingBox.defaultProps = {
  hideDetails: false
}

export default BookingBox
