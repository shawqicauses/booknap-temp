import {useEffect} from "react"
import {HiClipboardDocumentList} from "react-icons/hi2"
import {BiArrowBack} from "react-icons/bi"
import MyButton from "../uis/button"
import BookingBox from "./booking-box"
import {useCurrentBookingOrder} from "../../stores/current-booking-order"

const BookingSidebar = function BookingSidebar({
  show,
  setShow
}: {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {userBookings, fetchUserBookings} = useCurrentBookingOrder()
  useEffect(() => {
    fetchUserBookings()
  }, [fetchUserBookings, show])

  return userBookings ? (
    <div
      className={`fixed my-transition z-20 left-0 bottom-0  shadow-md ${
        show ? "" : "-translate-x-full"
      } max-w-min main-hight  h-full`}>
      <div className="relative">
        {show ? (
          <MyButton
            className="absolute top-1 -right-9 z-10"
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
      <div
        className={` bg-white dark:bg-blue-charcoal max-w-min main-hight flex flex-col overflow-y-scroll hide-scrollbar h-full`}>
        <h2 className="heading-3 flex dark:text-white px-5 py-3 gap-2">
          <HiClipboardDocumentList className="h-5 w-5 text-[#B9B9B9]" />
          Bookings
        </h2>

        <div className="py-3 px-5 flex-1">
          <div className="flex flex-col relative gap-3">
            {userBookings.map((booking) => (
              <BookingBox
                key={booking.id}
                {...booking}
                onOpen={() => {}}
                hideDetails
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default BookingSidebar
