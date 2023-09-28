import Image from "next/image"
import Link from "next/link"
import {ImFacebook} from "react-icons/im"
import {GrInstagram} from "react-icons/gr"
import {TfiYoutube} from "react-icons/tfi"
import {BsTwitter} from "react-icons/bs"
import React from "react"
import {useTheme} from "../../stores/theme"

const companyLinks = [
  {id: 1, label: "Home", link: "/"},
  {id: 2, label: "About US", link: "/about-us"},
  {id: 3, label: "Contact Us", link: "/contact"}
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
  const {theme} = useTheme()
  return (
    <footer>
      <div className="bg-[#F5F5F5] dark:bg-mirage pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-container py-5 gap-6">
          <div className="pt-2">
            <Link href="/" className="relative w-44 h-fit mb-4 inline-block">
              <Image
                src={`/logo/${
                  theme === "light" ? "blue-logo" : "white-logo"
                }.png `}
                alt="Logo"
                fill
                className="!relative  object-contain !w-52 !h-fit"
              />
            </Link>
            <p className="body text-sm font-light">
              lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. at vero eos et accusam et justo duo
              dolores et ea rebum.
            </p>
          </div>
          <div>
            <h2 className="text-xl ppb-3 mb-4">Pages</h2>
            <div className="grid grid-cols-2">
              <div>
                <ul className="flex flex-col gap-2 text-sm">
                  {companyLinks.map(({id, label, link}) => (
                    <li key={id} className="hover:text-my-primary">
                      <Link href={link} className="font-light uppercase">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="flex flex-col gap-2 h-full text-sm">
                  <Link href="/" className="whitespace-nowrap">
                    TERMS AND CONDITIONS
                  </Link>
                  <Link href="/" className="whitespace-nowrap">
                    PRIVACY POLICY
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl mb-4">SOCIAL MEDIA</h2>
            <ul className="flex  gap-2 ">
              {socialMedia.map(({id, link, icon}) => (
                <li key={id}>
                  <a
                    href={link}
                    className="inline-block p-2 bg-white dark:bg-blue-charcoal hover:bg-my-primary hover:text-white rounded-lg">
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-blue-charcoal py-5">
        <p className="sm:whitespace-nowrap flex-1 text-center font-light uppercase body text-[#909090]">
          © COPYRIGHTED & DESIGNED BY{" "}
          <Link href="/" className="text-blue-500 hover:text-my-primary">
            BOOKNAP
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
