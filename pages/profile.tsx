import React from "react"
import Footer from "../components/footer"
import ProfileContent from "../components/profile"
import Sidebar from "../components/sidebar"

const profile = function profile() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <ProfileContent />
      </div>
      <Footer />
    </div>
  )
}

export default profile
