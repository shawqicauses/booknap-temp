import React from "react"
import {MdLocalOffer} from "react-icons/md"
import {HiClipboardDocumentList} from "react-icons/hi2"
import Link from "next/link"
import {useRouter} from "next/router"
import MyButton from "../uis/button"

const IconSidebar = function IconSidebar({
  setShowBookingSidebar,
  isBookingNow
}: {
  setShowBookingSidebar: React.Dispatch<React.SetStateAction<boolean>>
  isBookingNow: boolean
}) {
  const {pathname} = useRouter()
  return (
    <div className="relative">
      <div className="fixed main-hight p-2 flex flex-col z-10 bg-white/20 dark:bg-black/20 gap-3">
        {isBookingNow ? (
          <div>
            <MyButton
              size="navIcon"
              color="navIcon"
              radius="sm"
              isIconOnly
              onClick={() => setShowBookingSidebar(true)}>
              <MdLocalOffer className="h-5 w-5 text-[#B9B9B9]" />
            </MyButton>
          </div>
        ) : null}
        <div>
          <MyButton
            as={Link}
            href="/booking"
            size="navIcon"
            isIconOnly
            radius="sm"
            color={pathname === "/booking" ? "primary" : "navIcon"}>
            <HiClipboardDocumentList className="h-5 w-5 text-[#B9B9B9]" />
          </MyButton>
        </div>
      </div>
    </div>
  )
}

export default IconSidebar
