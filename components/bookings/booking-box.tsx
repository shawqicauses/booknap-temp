/* eslint-disable camelcase */
import Image from "next/image"
import {useRouter} from "next/router"
import {useMemo} from "react"
import {AiFillStar} from "react-icons/ai"
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
  hideDetails,
  closeSideBar
}: IBooking & {
  onOpen: () => void
  hideDetails?: boolean
  closeSideBar?: () => void
}) {
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
      className="flex bg-gray-100 p-3 gap-3 rounded-lg items-center dark:bg-mirage sm:min-w-[400px] cursor-pointer"
      onClick={() => {
        if (status !== "inProgress") {
          onOpen()
        } else {
          rout.push(`/${id}`)
          if (closeSideBar) closeSideBar()
        }
      }}
      aria-hidden="true">
      <div className="relative !h-20 !w-20 border-2 border-gray-200 dark:border-waikawa-gray rounded-lg overflow-hidden">
        <Image src={hotel?.logo || ""} alt={hotel?.name || "Hotel"} className="!relative" fill />
      </div>
      <div>
        <h3 className="heading-3 dark:text-white mb-2">{hotel?.name}</h3>
        <Rating
          name="read-only"
          value={hotel?.stars}
          className="text-blue-700"
          readOnly
          style={{color: "#2F5597"}}
          size="small"
          icon={<AiFillStar className="text-inherit" />}
          emptyIcon={<AiFillStar className="text-inherit" />}
        />
        {!hideDetails ? (
          <>
            <p className="body-sm">{`${date_from} To ${date_to}`}</p>
            <p className="body-sm">{`${adults} Adults - ${children} Children - ${rooms_no} Room`}</p>
          </>
        ) : null}
      </div>
      <div className="flex-1 flex justify-end">
        <MyButton color={states[status]}>#{id}</MyButton>
      </div>
    </div>
  )
}
BookingBox.defaultProps = {
  hideDetails: false,
  closeSideBar: () => {}
}

export default BookingBox
