import Image from "next/image"
import Link from "next/link"
import {ImFacebook} from "react-icons/im"
import {GrInstagram} from "react-icons/gr"
import {TfiYoutube} from "react-icons/tfi"
import {BsTwitter} from "react-icons/bs"
import React from "react"

const companyLinks = [
  {id: 1, label: "LOREM IPSUM", link: "/"},
  {id: 2, label: "LOREM IPSUM", link: "/"},
  {id: 3, label: "LOREM IPSUM", link: "/"},
  {id: 4, label: "LOREM IPSUM", link: "/"},
  {id: 5, label: "LOREM IPSUM", link: "/"},
  {id: 6, label: "LOREM IPSUM", link: "/"}
]
const services = [
  {id: 1, label: "LOREM IPSUM"},
  {id: 2, label: "LOREM IPSUM"},
  {id: 3, label: "LOREM IPSUM"},
  {id: 4, label: "LOREM IPSUM"},
  {id: 5, label: "LOREM IPSUM"},
  {id: 6, label: "LOREM IPSUM"}
]
const socialMedia = [
  {
    id: 1,
    icon: <ImFacebook className="h-5 w-5" />,
    link: "https://www.facebook.com"
  },
  {
    id: 2,
    icon: <GrInstagram className="h-5 w-5" />,
    link: "https://www.instagram.com"
  },
  {
    id: 3,
    icon: <TfiYoutube className="h-5 w-5" />,
    link: "https://www.youtube.com"
  },
  {
    id: 4,
    icon: <BsTwitter className="h-5 w-5" />,
    link: "https://www.twitter.com"
  }
]

const Footer = function Footer() {
  return (
    <footer>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 my-container py-5 gap-4">
        <div className="pt-2">
          <Link href="/" className="relative w-44 h-fit mb-4 inline-block">
            <Image
              src="/logo/blue-logo.png"
              alt="Logo"
              fill
              className="!relative  object-contain !w-52 !h-fit"
            />
          </Link>
          <p className="body text-sm">
            lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. at vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>
        </div>
        <div>
          <h2 className="heading-2 text-blue-700">COMPANY LINKS</h2>
          <ul className="flex flex-col gap-2">
            {companyLinks.map((companyLink) => (
              <li key={companyLink.id} className="hover:text-blue-500">
                <Link href={companyLink.link}>{companyLink.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="heading-2 text-blue-700">SERVICES</h2>
          <ul className="flex flex-col gap-2">
            {services.map((service) => (
              <li key={service.id}>
                <h3>{service.label}</h3>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="heading-2 text-blue-700">SOCIAL MEDIA</h2>
          <ul className="flex  gap-2">
            {socialMedia.map((SMLink) => (
              <li key={SMLink.id}>
                <a
                  href={SMLink.link}
                  className="inline-block p-3 bg-white hover:bg-blue-900 hover:text-white rounded-lg">
                  {SMLink.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-white py-5">
        <div className="my-flex-between  my-container flex-wrap gap-2">
          <p className="whitespace-nowrap flex-1">
            © COPYRIGHTED & DESIGNED BY{" "}
            <Link href="/" className="text-blue-500 hover:text-blue-900">
              BOOKNAP
            </Link>
          </p>
          <div className="my-flex-between flex-1 gap-1 flex-wrap">
            <Link href="/" className="whitespace-nowrap">
              PRIVACY POLICY
            </Link>
            <Link href="/" className="whitespace-nowrap">
              TERMS AND CONDITIONS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
