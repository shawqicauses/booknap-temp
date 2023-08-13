import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  extendVariants,
  useDisclosure
} from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import React, {ReactElement, useContext, useEffect, useState} from "react"
import {BiMoon, BiTrash, BiUser} from "react-icons/bi"
import {GoChecklist} from "react-icons/go"
import {HiOutlineLogout} from "react-icons/hi"
import {BsFillSunFill} from "react-icons/bs"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {GiHamburgerMenu} from "react-icons/gi"
import {IoMdClose, IoMdNotificationsOutline} from "react-icons/io"
import {Auth} from "../../stores/auth"
import SignInModal from "../modal/sign-in-modal"
import DeleteAccountModal from "../modal/delete-account-modal"
import Lang from "./lang"
import {useContent} from "../../stores/cart"

const navLinks = [
  {id: 1, text: "Home", href: "/"},
  {id: 2, text: "About us", href: "/about-us"},
  {id: 3, text: "Contact", href: "/contact"}
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
export const MyButton = extendVariants(Button, {
  variants: {
    size: {
      md: "px-unit-2 min-w-unit-10 min-h-unit-10 h-full text-small gap-unit-2 rounded-small inline-flex"
    },
    color: {
      default:
        "bg-[#F7F7F7] text-[#B9B9B9] dark:bg-[#12213B] dark:text-[#5B6C89]",
      primary: "text-white bg-[#2F5597]"
    }
  },
  defaultVariants: {
    color: "default",
    size: "md"
  }
})

const items = [
  {
    id: 1,
    logo: "/user-profile.jpg",
    title: "Lorem Ipsum Dolor Sit Amet",
    date: "6 June 2023",
    time: "02:26 PM"
  },
  {
    id: 2,
    logo: "/user-profile.jpg",
    title: "Lorem Ipsum Dolor Sit Amet",
    date: "6 June 2023",
    time: "02:26 PM"
  },
  {
    id: 3,
    logo: "/user-profile.jpg",
    title: "Lorem Ipsum Dolor Sit Amet",
    date: "6 June 2023",
    time: "02:26 PM"
  },
  {
    id: 4,
    logo: "/user-profile.jpg",
    title: "Lorem Ipsum Dolor Sit Amet",
    date: "6 June 2023",
    time: "02:26 PM"
  },
  {
    id: 5,
    logo: "/user-profile.jpg",
    title: "Lorem Ipsum Dolor Sit Amet",
    date: "6 June 2023",
    time: "02:26 PM"
  }
]

const Notifications = function Notifications() {
  return (
    <Dropdown classNames={{base: "p-0"}}>
      <DropdownTrigger>
        <MyButton isIconOnly>
          <Badge color="danger" content={5} shape="circle" disableOutline>
            <IoMdNotificationsOutline className="w-6 h-6" />
          </Badge>
        </MyButton>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        items={items}
        className="divide-y-1"
        itemClasses={{
          base: "rounded-none",
          wrapper: "p-0"
        }}>
        {items.map(({id, logo, title, date, time}) => (
          <DropdownItem key={id}>
            <div className="flex gap-2 p-2">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                <Image src={logo} alt="logo" className="relative" fill />
              </div>
              <div>
                <h3 className="">{title}</h3>
                <span className="body-sm">
                  {date} - {time}
                </span>
              </div>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

const Navbar = function Navbar() {
  const [theme, setTheme] = useState("light")
  const [isOpened, setIsOpened] = useState(false)
  const {token, signOut} = useContext(Auth)
  const signIn = useDisclosure()
  const deleteAccount = useDisclosure()
  const {cart} = useContent()
  useEffect(() => {
    document.body.classList.remove(theme === "light" ? "dark" : "light")
    document.body.classList.add(theme)
  }, [theme])

  return (
    <>
      <nav className="sticky z-20 top-0 bg-white dark:bg-[#000818] w-full shadow-base">
        <div className="my-container my-flex md:my-flex-between pb-5 !items-end">
          <div className="flex gap-3 w-full items-center lg:items-end justify-between md:justify-start">
            <Link href="/" className="relative w-36 mt-3 lg:mt-0  dark:hidden">
              <Image
                src="/logo/blue-logo.png"
                alt="Logo"
                fill
                className="!relative !inset-auto !w-max object-contain"
              />
            </Link>
            <Link
              href="/"
              className="relative w-36 mt-3 lg:mt-0 hidden dark:block">
              <Image
                src="/logo/white-logo.png"
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
                    {navLinks.map(({id, href, text}) => (
                      <li key={id}>
                        <Link
                          href={href}
                          className="navbar-link inline-block w-full lg:pt-8 p-3 rounded-b-lg  text-[#B9B9B9]  dark:text-[#5B6C89] hover:bg-gray-300 dark:hover:bg-[#12213B]"
                          onClick={() => {
                            setIsOpened(false)
                            document.body.style.overflowY = "scroll"
                          }}>
                          {text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <ul className="flex flex-col lg:flex-row gap-3">
                    <li>
                      <MyButton
                        isIconOnly
                        onClick={() => {
                          setTheme((pre) =>
                            pre === "light" ? "dark" : "light"
                          )
                        }}>
                        {theme === "light" ? (
                          <BiMoon className="w-6 h-6 " />
                        ) : (
                          <BsFillSunFill className="w-6 h-6" />
                        )}
                      </MyButton>
                    </li>
                    <li>
                      <Lang />
                    </li>
                    {!token ? (
                      <li>
                        <MyButton
                          as={Link}
                          href="/"
                          isIconOnly
                          onClick={signIn.onOpen}>
                          <BiUser className="w-6 h-6 text-[#B9B9B9] dark:text-[#5B6C89] m-auto" />
                        </MyButton>
                      </li>
                    ) : null}
                    {token ? (
                      <>
                        <li>
                          <MyButton as={Link} href="/cart" isIconOnly>
                            {cart.length > 0 ? (
                              <Badge
                                color="danger"
                                content={cart.length}
                                shape="circle"
                                disableOutline>
                                <AiOutlineShoppingCart className="w-6 h-6" />
                              </Badge>
                            ) : (
                              <AiOutlineShoppingCart className="w-6 h-6" />
                            )}
                          </MyButton>
                        </li>
                        <li>
                          <Notifications />
                        </li>
                        <li>
                          <Dropdown
                            showArrow
                            classNames={{
                              base: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
                              arrow: "bg-default-200"
                            }}>
                            <DropdownTrigger>
                              <div className="my-flex gap-2 cursor-pointer bg-gray-100 dark:bg-[#12213B] py-1 px-2 rounded-lg">
                                <Image
                                  src="/user.png"
                                  alt="user profile"
                                  className="!relative !w-9"
                                  fill
                                />
                                <span className="inline-block dark:text-white">
                                  Adam Joe
                                </span>
                              </div>
                            </DropdownTrigger>
                            <DropdownMenu
                              variant="faded"
                              aria-label="Dropdown menu">
                              <DropdownItem
                                startContent={
                                  <BiUser className="w-6 h-6 text-[#B9B9B9] dark:text-[#5B6C89] m-auto" />
                                }>
                                <Link
                                  href="/profile"
                                  className="inline-block w-full h-full dark:text-white">
                                  Profile
                                </Link>
                              </DropdownItem>
                              <DropdownItem
                                startContent={
                                  <GoChecklist className="w-6 h-6 text-[#B9B9B9] dark:text-[#5B6C89] m-auto" />
                                }>
                                <Link
                                  href="/bookings"
                                  className="inline-block w-full h-full dark:text-white">
                                  Bookings
                                </Link>
                              </DropdownItem>
                              <DropdownItem
                                startContent={
                                  <BiTrash className="w-6 h-6 text-[#B9B9B9] dark:text-[#5B6C89] m-auto" />
                                }
                                onClick={deleteAccount.onOpen}>
                                <span className="dark:text-white">
                                  Delete Account
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                startContent={
                                  <HiOutlineLogout className="w-6 h-6 text-[#B9B9B9] dark:text-[#5B6C89] m-auto" />
                                }
                                onClick={signOut}>
                                <span className="dark:text-white">Logout</span>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </li>
                      </>
                    ) : null}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <SignInModal isOpen={signIn.isOpen} onClose={signIn.onClose} />
      <DeleteAccountModal
        isOpen={deleteAccount.isOpen}
        onClose={deleteAccount.onClose}
      />
    </>
  )
}

export default Navbar
