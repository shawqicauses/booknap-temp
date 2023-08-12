import React, {useContext, useState} from "react"
import IconSidebar from "./icon-sidebar"
import BookingSidebar from "./booking-sidebar"
import {Auth} from "../stores/auth"

const Sidebar = function Sidebar() {
  const [showBookingSidebar, setShowBookingSidebar] = useState(false)
  const {token} = useContext(Auth)
  if (token) {
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
  return null
}

export default Sidebar
