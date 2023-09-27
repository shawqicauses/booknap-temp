import React from "react"
import {NextPage} from "next"
import Footer from "../components/layout/footer"
import AboutUsContent from "../components/about-us"

const AboutUs: NextPage = function AboutUs() {
  return (
    <div>
      <AboutUsContent />
      <Footer />
    </div>
  )
}

export default AboutUs
