import React from "react"
import {MdLocalOffer} from "react-icons/md"
import {HiClipboardDocumentList} from "react-icons/hi2"

import MyButton from "../uis/button"

const IconSidebar = function IconSidebar({
  setShowOffersSidebar,
  setShowBookingsSidebar,
  isBookingNow
}: {
  setShowOffersSidebar: React.Dispatch<React.SetStateAction<boolean>>
  setShowBookingsSidebar: React.Dispatch<React.SetStateAction<boolean>>
  isBookingNow: boolean
}) {
  return (
    <div className="relative">
      <div className="fixed main-hight p-2 flex flex-col z-10 bg-white/20 dark:bg-black/20 gap-3">
        {isBookingNow ? (
          <div>
            <MyButton
              size="navIcon"
              color="white"
              radius="sm"
              isIconOnly
              className="shadow-sm"
              onClick={() => setShowOffersSidebar(true)}>
              <MdLocalOffer className="h-5 w-5 text-[#B9B9B9]" />
            </MyButton>
          </div>
        ) : null}
        <div>
          <MyButton
            size="navIcon"
            color="white"
            radius="sm"
            isIconOnly
            className="shadow-sm"
            onClick={() => setShowBookingsSidebar(true)}>
            <HiClipboardDocumentList className="h-5 w-5 text-[#B9B9B9]" />
          </MyButton>
        </div>
      </div>
    </div>
  )
}

export default IconSidebar
