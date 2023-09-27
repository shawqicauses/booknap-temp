import React from "react"
import {NextPage} from "next"
import Footer from "../components/layout/footer"
import ContactUsContent from "../components/contact-us"

const ContactUs: NextPage = function ContactUs() {
  return (
    <div>
      <ContactUsContent />
      <Footer />
    </div>
  )
}

export default ContactUs
