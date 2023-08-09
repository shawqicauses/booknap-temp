import React, {useState} from "react"
import IconSidebar from "./icon-sidebar"
import BookingSidebar from "./booking-sidebar"

const Sidebar = function Sidebar() {
  const [showBookingSidebar, setShowBookingSidebar] = useState(false)
  return (
    <>
      <IconSidebar setShowBookingSidebar={setShowBookingSidebar} />
      <BookingSidebar
        show={showBookingSidebar}
        setShow={setShowBookingSidebar}
      />
    </>
  )
}

export default Sidebar
