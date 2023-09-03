/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  useDisclosure
} from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import React, {ReactElement, useEffect, useState} from "react"
import {BiMoon, BiTrash, BiUser} from "react-icons/bi"
import {GoChecklist} from "react-icons/go"
import {HiOutlineLogout} from "react-icons/hi"
import {BsFillSunFill} from "react-icons/bs"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {GiHamburgerMenu} from "react-icons/gi"
import {IoMdClose, IoMdNotificationsOutline} from "react-icons/io"
import {useAuth} from "../../../stores/auth"
import SignInModal from "../../modal/sign-in-modal"
import DeleteAccountModal from "../../modal/delete-account-modal"
import Lang from "./lang"
import {useCart} from "../../../stores/cart"
import MyButton from "../../uis/button"
import client from "../../../helpers/client"
import {useUser} from "../../../stores/user"
import {useNotifications} from "../../../stores/notifications"
import {useTheme} from "../../../stores/theme"

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
      <GiHamburgerMenu strokeWidth={1.5} className="h-6 w-6 stroke-current" />
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

const NotificationsDropDown2 = function NotificationsDropDown2() {
  const {notifications, ready} = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen((pre) => !pre)
    if (ready) {
      notifications.forEach((noti: any) => {
        if (!noti.read_at) {
          client(`notifications/read/${noti.id}`, {method: "GET"})
        }
      })
    }
  }

  useEffect(() => {
    document.addEventListener("click", () => {
      setIsOpen(false)
    })
  }, [])
  return (
    <div className="relative h-full">
      <MyButton isIconOnly size="navIcon" color="navIcon" onClick={handleClick}>
        <Badge
          color="danger"
          content={notifications ? notifications.length : 0}
          shape="circle"
          disableOutline>
          <IoMdNotificationsOutline className="w-6 h-6" />
        </Badge>
      </MyButton>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute lg:top-14 bottom-14 right-0 w-60  shadow-md z-50`}>
        <ul className="bg-white dark:bg-blue-charcoal rounded-md divide-y-1 border border-gray-300 dark:border-gray-600 overflow-y-scroll max-h-64 hide-scrollbar">
          {ready ? (
            notifications.length > 0 ? (
              notifications.map((notfi: any) => (
                <li
                  className="flex gap-2 justify-center items-center p-3"
                  key={notfi.id}>
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                    <Image
                      src="/user-profile.jpg"
                      alt="logo"
                      className="relative"
                      fill
                    />
                  </div>
                  <div>
                    <h3 className="">{notfi.data.title}</h3>
                    <span className="body-sm">{notfi.data.details}</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="h-[100px] w-full flex justify-center items-center">
                <h3>No Notifications</h3>
              </li>
            )
          ) : (
            <li className="max-h-[150px] flex justify-center items-center">
              <Spinner size="md" />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

const Navbar = function Navbar() {
  const {theme, changeTheme} = useTheme()
  const [isOpened, setIsOpened] = useState(false)
  const {token, signOut} = useAuth()
  const signInModel = useDisclosure()
  const deleteAccount = useDisclosure()
  const {cart} = useCart()
  const {user, ready} = useUser()

  const handleSignOut = async () => {
    await client("logout", {method: "POST"})
    signOut()
  }

  return (
    <>
      <nav className="sticky z-40 top-0 bg-white h-[78px] dark:bg-[rgb(0,8,24)] w-full shadow-base">
        <div className="my-container my-flex md:my-flex-between py-4 !items-end h-full">
          <div className="flex gap-3 w-full items-center  justify-between md:justify-start">
            <Link href="/" className="relative md:w-36 w-40 lg:mt-0">
              <Image
                src={`/logo/${
                  theme === "light" ? "blue-logo" : "white-logo"
                }.png `}
                alt="Logo"
                fill
                className="!relative !inset-auto !w-max object-contain"
              />
            </Link>
            <div className="relative w-full text-right h-full">
              <NavbarOpenToggle setIsOpened={setIsOpened} />
              <ul
                className={[
                  isOpened
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0",
                  "my-flex my-transition  !items-center lg:!justify-between fixed inset-0 z-50 transform flex-col gap-3 bg-white lg:static lg:z-10 lg:!flex lg:translate-x-0 lg:flex-row lg:bg-transparent lg:opacity-100"
                ].join(" ")}>
                <NavbarCloseToggle setIsOpened={setIsOpened} />
                <li>
                  <ul className="flex flex-col lg:flex-row items-center gap-3">
                    {navLinks.map(({id, href, text}) => (
                      <li key={id}>
                        <Link
                          href={href}
                          className="navbar-link inline-block w-full  p-3 rounded-b-lg text-[#B9B9B9] dark:text-[#5B6C89]"
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
                  <ul className="flex flex-col lg:flex-row gap-3 ">
                    <li>
                      <MyButton
                        isIconOnly
                        size="navIcon"
                        color="navIcon"
                        onClick={changeTheme}>
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
                          size="navIcon"
                          color="navIcon"
                          isIconOnly
                          onClick={signInModel.onOpen}>
                          <BiUser className="w-6 h-6 text-[#B9B9B9] dark:text-[#5B6C89] m-auto" />
                        </MyButton>
                      </li>
                    ) : null}
                    {token ? (
                      <>
                        <li>
                          <MyButton
                            size="navIcon"
                            color="navIcon"
                            as={Link}
                            href="/cart"
                            isIconOnly>
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
                          <NotificationsDropDown2 />
                        </li>
                        <li>
                          <Dropdown
                            showArrow
                            classNames={{
                              base: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
                              arrow: "bg-default-200"
                            }}>
                            <DropdownTrigger>
                              {ready ? (
                                <div className="my-flex gap-2 cursor-pointer bg-gray-100 dark:bg-[#12213B] py-1 px-1.5 rounded-lg">
                                  <div className="relative !w-10 !h-10  rounded-full overflow-hidden">
                                    {user?.avatar ? (
                                      <Image
                                        src={user?.avatar}
                                        alt="user profile"
                                        className="!relative"
                                        fill
                                      />
                                    ) : null}
                                  </div>
                                  <span className="inline-block dark:text-white">
                                    {user?.name}
                                  </span>
                                </div>
                              ) : (
                                <div className="min-w-[100px] h-full flex justify-center items-center bg-gray-100 dark:bg-[#12213B] rounded-lg">
                                  <Spinner />
                                </div>
                              )}
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
                                onClick={handleSignOut}>
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
      <SignInModal isOpen={signInModel.isOpen} onClose={signInModel.onClose} />
      <DeleteAccountModal
        isOpen={deleteAccount.isOpen}
        onClose={deleteAccount.onClose}
      />
    </>
  )
}

export default Navbar
