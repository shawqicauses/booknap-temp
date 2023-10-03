import React from "react"
import {NextPage} from "next"
import ProfileContent from "../components/profile"
import Protected from "../components/uis/protected"

const Profile: NextPage = function Profile() {
  return (
    <Protected>
      <ProfileContent />
    </Protected>
  )
}

export default Profile
