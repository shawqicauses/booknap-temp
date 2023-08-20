import React from "react"
import {MdLocalOffer} from "react-icons/md"
import {HiClipboardDocumentList} from "react-icons/hi2"
import Link from "next/link"
import {useRouter} from "next/router"
import MyButton from "../uis/button"

const IconSidebar = function IconSidebar({
  setShowBookingSidebar
}: {
  setShowBookingSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {pathname} = useRouter()
  return (
    <div className="relative">
      <div className="fixed main-hight p-2 flex  flex-col z-10 bg-white/50 dark:bg-black/50 gap-3 border-r-1">
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
