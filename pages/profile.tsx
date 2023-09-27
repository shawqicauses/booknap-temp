import React from "react"
import {NextPage} from "next"
import Footer from "../components/layout/footer"
import ProfileContent from "../components/profile"
import Protected from "../components/uis/protected"

const Profile: NextPage = function Profile() {
  return (
    <Protected>
      <ProfileContent />
      <Footer />
    </Protected>
  )
}

export default Profile
