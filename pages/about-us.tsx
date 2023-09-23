import React from "react"
import {NextPage} from "next"
import Footer from "../components/layout/footer"
import AboutUsContent from "../components/about-us"
import Sidebar from "../components/uis/sidebar"

const AboutUs: NextPage = function AboutUs() {
  return (
    <div>
      <div className="flex ">
        <Sidebar />
        <AboutUsContent />
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs
