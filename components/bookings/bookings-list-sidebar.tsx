import {useEffect} from "react"
import {HiClipboardDocumentList} from "react-icons/hi2"
import BookingBox from "./booking-box"
import {useCurrentBookingOrder} from "../../stores/current-booking-order"
import ListSidebar from "../uis/list-sidebar"

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
    <ListSidebar setShow={setShow} show={show}>
      <div
        className={` bg-white dark:bg-blue-charcoal max-w-min main-hight flex flex-col overflow-y-scroll hide-scrollbar h-full w-full`}>
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
                closeSideBar={() => {
                  setShow(false)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </ListSidebar>
  ) : null
}

export default BookingSidebar
