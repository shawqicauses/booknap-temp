import React from "react"
import {MdLocalOffer} from "react-icons/md"
import {HiClipboardDocumentList} from "react-icons/hi2"
import {Badge} from "@nextui-org/react"
import MyButton from "../uis/button"
import {useCurrentBookingOrder} from "../../stores/current-booking-order"

const IconSidebar = function IconSidebar({
  setShowOffersSidebar,
  setShowBookingsSidebar,
  isBookingNow,
  offersNum
}: {
  setShowOffersSidebar: React.Dispatch<React.SetStateAction<boolean>>
  setShowBookingsSidebar: React.Dispatch<React.SetStateAction<boolean>>
  isBookingNow: boolean
  offersNum: number
}) {
  const {userBookings} = useCurrentBookingOrder()
  return (
    <div className="relative">
      <div className="fixed main-hight p-2 flex flex-col z-10 sm:bg-white/20 sm:dark:bg-black/20 gap-3">
        <div>
          <MyButton
            size="navIcon"
            color="white"
            radius="sm"
            isIconOnly
            className="shadow-sm"
            onClick={() => setShowOffersSidebar(true)}>
            <Badge
              color={isBookingNow ? "danger" : "default"}
              content={offersNum}
              shape="circle"
              disableOutline>
              <MdLocalOffer className="h-5 w-5 text-[#B9B9B9]" />
            </Badge>
          </MyButton>
        </div>
        {userBookings && userBookings?.length > 0 ? (
          <div>
            <MyButton
              size="navIcon"
              color="white"
              radius="sm"
              isIconOnly
              className="shadow-sm"
              onClick={() => setShowBookingsSidebar(true)}>
              <Badge
                color="danger"
                content={userBookings?.length}
                shape="circle"
                disableOutline>
                <HiClipboardDocumentList className="h-5 w-5 text-[#B9B9B9]" />
              </Badge>
            </MyButton>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default IconSidebar
