import React from "react"
import {MdLocalOffer} from "react-icons/md"
import {HiClipboardDocumentList} from "react-icons/hi2"
import Link from "next/link"
import {useRouter} from "next/router"
import {MyButton} from "../navbar"

const IconSidebar = function IconSidebar({
  setShowBookingSidebar
}: {
  setShowBookingSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {pathname} = useRouter()
  return (
    <div className="relative">
      <div className="fixed main-hight p-2 flex  flex-col z-10 bg-white/50  gap-3 border-r-1">
        <div>
          <MyButton
            startContent={<MdLocalOffer className="h-5 w-5 text-[#B9B9B9]" />}
            size="sm"
            radius="sm"
            onClick={() => setShowBookingSidebar(true)}
          />
        </div>
        <div>
          <MyButton
            as={Link}
            href="/booking"
            size="sm"
            isIconOnly
            radius="sm"
            color={pathname === "/booking" ? "primary" : "default"}>
            <HiClipboardDocumentList className="h-5 w-5" />
          </MyButton>
        </div>
      </div>
    </div>
  )
}

export default IconSidebar
