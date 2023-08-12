import React from "react"
import Footer from "../components/footer"
import CountactUsContent from "../components/countact-us"
import Sidebar from "../components/sidebar"

const CountactUs = function CountactUs() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <CountactUsContent />
      </div>
      <Footer />
    </div>
  )
}

export default CountactUs
