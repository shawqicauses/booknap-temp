import {useEffect} from "react"
import {HiClipboardDocumentList} from "react-icons/hi2"
import {BiArrowBack} from "react-icons/bi"
import MyButton from "../uis/button"
import LoadingDiv from "../uis/loading"
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
  if (userBookings) {
    return (
      <div className="relative h-full">
        <div
          className={`fixed my-transition z-20 left-0 bottom-0 bg-white dark:bg-blue-charcoal shadow-md ${
            show ? "" : "-translate-x-full"
          } max-w-min main-hight flex flex-col overflow-y-scroll hide-scrollbar h-full`}>
          <div className="flex justify-between  items-center p-2">
            <MyButton
              startContent={
                <HiClipboardDocumentList className="h-5 w-5 text-[#B9B9B9]" />
              }
              size="xl"
              radius="sm"
              color="offer"
              onClick={() => setShow(false)}>
              Bookings
            </MyButton>
            <MyButton
              color="transparent"
              onClick={() => {
                setShow(false)
              }}>
              <BiArrowBack className="h-5 w-5" />
              Close
            </MyButton>
          </div>
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
    )
  }
  return <LoadingDiv />
}

export default BookingSidebar
