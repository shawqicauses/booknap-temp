import Image from "next/image"
import Link from "next/link"
import React, {ReactElement, useState} from "react"
import {BiMoon, BiUser} from "react-icons/bi"
import {BsFillSunFill} from "react-icons/bs"
import {GiHamburgerMenu} from "react-icons/gi"
import {IoMdClose} from "react-icons/io"

import Button from "../button"

const navLinks = [
  {id: 1, text: "Home", href: "/"},
  {id: 2, text: "About us", href: "/about-us"},
  {id: 3, text: "Contact", href: "/contact"}
]
const languages = [
  {id: 1, shortname: "EN", name: "English"},
  {id: 2, shortname: "AR", name: "Arabic"}
]
interface INavbarProps {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarOpenToggle = function NavbarOpenToggle({
  setIsOpened
}: INavbarProps): ReactElement {
  return (
    <button
      type="button"
      className="label-uppercase my-flex ml-auto !w-max gap-3 lg:hidden"
      onClick={() => {
        setIsOpened(true)
        document.body.style.overflowY = "hidden"
      }}>
      <GiHamburgerMenu strokeWidth={1.5} className="h-5 w-5 stroke-current" />
    </button>
  )
}

// DONE REVIEWING
const NavbarCloseToggle = function NavbarCloseToggle({
  setIsOpened
}: INavbarProps): ReactElement {
  return (
    <button
      type="button"
      aria-label="Close Menu"
      className="label-uppercase my-transition absolute top-5 right-5 block !w-max hover:text-blue-700 lg:hidden"
      onClick={() => {
        setIsOpened(false)
        document.body.style.overflowY = "scroll"
      }}>
      <IoMdClose strokeWidth={1.5} className="h-5 w-5 stroke-current" />
    </button>
  )
}

const Navbar = function Navbar() {
  const [mode, setMode] = useState("light")
  const [isOpened, setIsOpened] = useState(false)
  return (
    <nav className="bg-white fixed w-full z-40">
      <div className="my-container my-flex md:my-flex-between pb-5 !items-end">
        <div className="flex gap-3 w-full items-center lg:items-end justify-between md:justify-start">
          <Link href="/" className="relative w-36 mt-3 lg:mt-0">
            <Image
              src="/logo/blue-logo.png"
              alt="Logo"
              fill
              className="!relative !inset-auto !w-max object-contain"
            />
          </Link>
          <div className="relative w-full text-right">
            <NavbarOpenToggle setIsOpened={setIsOpened} />
            <ul
              className={[
                isOpened
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0",
                "my-flex my-transition lg:!items-end lg:!justify-between fixed inset-0 z-50 transform flex-col gap-3 bg-white lg:static lg:z-10 lg:!flex lg:translate-x-0 lg:flex-row lg:bg-transparent lg:opacity-100"
              ].join(" ")}>
              <NavbarCloseToggle setIsOpened={setIsOpened} />
              <li>
                <ul className="flex flex-col lg:flex-row items-center gap-3">
                  {navLinks.map((navLink) => (
                    <li key={navLink.id}>
                      <Link
                        href={navLink.href}
                        className="navbar-link inline-block w-full lg:pt-8 p-3 rounded-b-lg lg:hover:bg-gray-300"
                        onClick={() => {
                          setIsOpened(false)
                          document.body.style.overflowY = "scroll"
                        }}>
                        {navLink.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <ul className="flex flex-col lg:flex-row gap-3">
                  <li>
                    <Button
                      icon={
                        mode === "light" ? (
                          <BiMoon className="w-6 h-6" color="#B9B9B9" />
                        ) : (
                          <BsFillSunFill className="w-6 h-6" color="#B9B9B9" />
                        )
                      }
                      buttonStyle={{
                        type: "button-gray",
                        other: [
                          "rounded-b-lg",
                          "h-full",
                          "w-full",
                          "flex",
                          "justify-center"
                        ]
                      }}
                      handleClick={() => {
                        setMode((pre) => (pre === "light" ? "dark" : "light"))
                      }}
                    />
                  </li>
                  <li>
                    <select
                      name="language"
                      id="lang"
                      className="h-full bg-gray-200 rounded-lg border-none text-gray-600">
                      {languages.map((language) => (
                        <option key={language.id} value={language.shortname}>
                          {language.name}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <Button
                      isLink
                      icon={<BiUser className="w-6 h-6" color="#B9B9B9" />}
                      buttonStyle={{
                        type: "button-gray",
                        other: [
                          "rounded-b-lg",
                          "h-full",
                          "w-full",
                          "flex",
                          "justify-center"
                        ]
                      }}
                      href="/"
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
