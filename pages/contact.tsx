import React from "react"
import {NextPage} from "next"
import Footer from "../components/layout/footer"
import ContactUsContent from "../components/contact-us"
import Sidebar from "../components/uis/sidebar"

const ContactUs: NextPage = function ContactUs() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <ContactUsContent />
      </div>
      <Footer />
    </div>
  )
}

export default ContactUs
