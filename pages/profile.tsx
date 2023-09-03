import React from "react"
import {NextPage} from "next"
import Footer from "../components/layout/footer"
import ProfileContent from "../components/profile"
import Sidebar from "../components/uis/sidebar"
import Protected from "../components/uis/protected"

const Profile: NextPage = function Profile() {
  return (
    <Protected>
      <div className="flex">
        <Sidebar />
        <ProfileContent />
      </div>
      <Footer />
    </Protected>
  )
}

export default Profile
