/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import OutsideClickHandler from "react-outside-click-handler"
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure
} from "@nextui-org/react"
import {useRouter} from "next/router"
import Image from "next/image"
import Link from "next/link"
import React, {ReactElement, useState} from "react"
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
import MyButton from "../../uis/button"
import client from "../../../helpers/client"
import {useUser} from "../../../stores/user"
import {useNotifications} from "../../../stores/notifications"
import {useTheme} from "../../../stores/theme"
import MySpinner from "../../uis/my-spinner"
import {useCart} from "../../../stores/cart"

const navLinks = [
  {id: 1, text: "Home", href: "/"},
  {id: 2, text: "About us", href: "/about-us"},
  {id: 3, text: "Contact", href: "/contact"}
]

interface INavbarProps {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarOpenToggle = function NavbarOpenToggle({setIsOpened}: INavbarProps): ReactElement {
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

const NavbarCloseToggle = function NavbarCloseToggle({setIsOpened}: INavbarProps): ReactElement {
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

const NotificationsDropDown = function NotificationsDropDown({
  setIsNotificationsOpen,
  isNotificationsOpen,
  handleOpenNotifications
}: {
  setIsNotificationsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isNotificationsOpen: boolean
  handleOpenNotifications: () => void
}) {
  const {notifications, unReadMassages, handleReadMassage, ready} = useNotifications()
  const {ready: tokenReady, signOut} = useAuth()
  const {theme} = useTheme()
  const handleClick = () => {
    handleOpenNotifications()
    if (ready && tokenReady) {
      handleReadMassage()
      notifications.forEach((notification: any) => {
        if (!notification.read_at) {
          client(`notifications/read/${notification.id}`, {method: "GET"})?.catch(() => {
            signOut()
          })
        }
      })
    }
  }

  return (
    <div className="relative h-full">
      <OutsideClickHandler onOutsideClick={() => setIsNotificationsOpen(false)}>
        <MyButton isIconOnly size="navIcon" color="navIcon" onClick={handleClick}>
          <Badge color="danger" content={unReadMassages} shape="circle" disableOutline>
            <IoMdNotificationsOutline className="w-6 h-6" />
          </Badge>
        </MyButton>
        <div
          className={`${
            isNotificationsOpen ? "block" : "hidden"
          } absolute lg:top-14 bottom-14 right-0 w-72  shadow-lg z-50`}>
          <div className="absolute h-5 w-5 rotate-45 -top-[10px] right-0 -translate-x-[50%] bg-white dark:bg-mirage " />
          <h2 className="heading-3 bg-white dark:bg-mirage dark:text-white w-full text-start rounded-t-md p-2 z-10">
            Notifications
          </h2>
          <ul className="bg-white dark:bg-mirage rounded-b-md divide-y-1 divide-gray-100 dark:divide-[#232F42] shadow-base overflow-y-scroll max-h-64 hide-scrollbar overflow-hidden z-10">
            {ready ? (
              notifications.length > 0 ? (
                notifications.map((notification: any) => (
                  <li
                    className="flex gap-2 justify-center items-center p-3 cursor-pointer"
                    key={notification.id}>
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-gray-100 dark:border-gray-500">
                      <Image
                        src={theme === "dark" ? "/notifications-dark.png" : "/notifications.png"}
                        alt="logo"
                        className="relative"
                        fill
                      />
                    </div>
                    <div className="flex-1 text-start flex flex-col gap-0">
                      <h3 className="">{notification.data.title}</h3>
                      <span className="body-sm">{notification.data.details}</span>
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
                <MySpinner />
              </li>
            )}
          </ul>
        </div>
      </OutsideClickHandler>
    </div>
  )
}

const CartDropDown = function CartDropDown() {
  const router = useRouter()
  const id = Number(router.query.id)
  const {cart} = useCart()
  return id && cart ? (
    <li className="relative h-full">
      <MyButton
        size="navIcon"
        color="navIcon"
        onClick={() => {
          router.push(`/${id}/?tab=4`)
        }}
        isIconOnly>
        <Badge color="danger" content={cart.length} shape="circle" disableOutline>
          <AiOutlineShoppingCart className="w-6 h-6" />
        </Badge>
      </MyButton>
    </li>
  ) : null
}

const Navbar = function Navbar() {
  const {theme, changeTheme} = useTheme()
  const [isOpened, setIsOpened] = useState(false)
  const {token, signOut} = useAuth()
  const signInModel = useDisclosure()
  const deleteAccount = useDisclosure()
  const {user, ready} = useUser()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await client("logout", {method: "POST"})
    signOut()
  }

  const handleOpenNotifications = () => {
    setIsNotificationsOpen((pre) => !pre)
  }

  const closeBoth = () => {
    setIsNotificationsOpen(false)
  }
  return (
    <>
      <nav className="sticky z-40 top-0 bg-white h-[78px] dark:bg-[rgb(0,8,24)] w-full shadow-base">
        <div className="my-container my-flex md:my-flex-between py-4 !items-end h-full">
          <div className="flex gap-10 w-full items-center  justify-between md:justify-start">
            <Link href="/" className="relative w-40 lg:mt-0">
              <Image
                src={`/logo/${theme === "light" ? "blue-logo" : "white-logo"}.png `}
                alt="Logo"
                fill
                className="!relative !inset-auto !w-max object-contain"
              />
            </Link>
            <div className="relative w-full text-right h-full">
              <NavbarOpenToggle setIsOpened={setIsOpened} />
              <ul
                className={[
                  isOpened ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
                  "my-flex my-transition  !items-center lg:!justify-between fixed inset-0 z-50 transform flex-col gap-3 bg-white dark:bg-[rgb(0,8,24)] lg:static lg:z-10 lg:!flex lg:translate-x-0 lg:flex-row lg:bg-transparent lg:opacity-100"
                ].join(" ")}>
                <NavbarCloseToggle setIsOpened={setIsOpened} />
                <li>
                  <ul className="flex flex-col lg:flex-row items-center gap-3">
                    {navLinks.map(({id, href, text}) => (
                      <li key={id}>
                        <Link
                          href={href}
                          className={`navbar-link inline-block w-full  p-3 rounded-b-lg text-[#B9B9B9] dark:text-[#5B6C89] ${
                            router.pathname === href ? "!text-my-primary" : ""
                          }`}
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
                  <ul className="flex flex-row gap-1 items-center">
                    <li>
                      <Lang />
                    </li>
                    <li>
                      <MyButton
                        isIconOnly
                        size="navIcon"
                        color="navIcon"
                        onClick={() => {
                          changeTheme()
                          setIsOpened(false)
                        }}>
                        {theme === "light" ? (
                          <BiMoon className="w-6 h-6" />
                        ) : (
                          <BsFillSunFill className="w-6 h-6" />
                        )}
                      </MyButton>
                    </li>
                    {!token ? (
                      <li>
                        <MyButton
                          size="navIcon"
                          color="navIcon"
                          isIconOnly
                          onClick={() => {
                            signInModel.onOpen()
                            setIsOpened(false)
                          }}>
                          <BiUser className="w-6 h-6 m-auto" />
                        </MyButton>
                      </li>
                    ) : null}
                    {token ? (
                      <>
                        <CartDropDown />
                        <li>
                          <NotificationsDropDown
                            isNotificationsOpen={isNotificationsOpen}
                            setIsNotificationsOpen={setIsNotificationsOpen}
                            handleOpenNotifications={handleOpenNotifications}
                          />
                        </li>
                        <li>
                          <Dropdown className="px-0 dark:bg-mirage" radius="sm">
                            <DropdownTrigger>
                              {ready ? (
                                <button
                                  type="button"
                                  className="my-flex gap-2 cursor-pointer !w-10 !h-10 rounded-lg ml-2"
                                  onClick={closeBoth}>
                                  <div className="relative !w-9 !h-9 rounded-full overflow-hidden">
                                    <Image
                                      src={
                                        user?.avatar ||
                                        `/user/${theme === "light" ? "light" : "dark"}.svg`
                                      }
                                      alt="user profile"
                                      className="!relative"
                                      fill
                                    />
                                  </div>
                                </button>
                              ) : (
                                <div className="w-9 h-9 flex justify-center items-center rounded-lg">
                                  <MySpinner />
                                </div>
                              )}
                            </DropdownTrigger>
                            <DropdownMenu className="p-0">
                              <DropdownItem
                                className="hover:bg-gray-100 dark:hover:bg-slate-800 !rounded-none"
                                startContent={
                                  <BiUser className="w-6 h-6 m-auto text-[#B9B9B9] dark:text-[#5B6C89]" />
                                }
                                onClick={() => {
                                  setIsOpened(false)
                                }}>
                                <Link
                                  href="/profile"
                                  className="inline-block w-full h-full dark:text-white ">
                                  Profile
                                </Link>
                              </DropdownItem>
                              <DropdownItem
                                className="hover:bg-gray-100 dark:hover:bg-slate-800  !rounded-none"
                                startContent={
                                  <GoChecklist className="w-6 h-6 m-auto text-[#B9B9B9] dark:text-[#5B6C89]" />
                                }
                                onClick={() => {
                                  setIsOpened(false)
                                }}>
                                <Link
                                  href="/bookings"
                                  className="inline-block w-full h-full dark:text-white">
                                  Bookings
                                </Link>
                              </DropdownItem>
                              <DropdownItem
                                className="hover:bg-gray-100 dark:hover:bg-slate-800  !rounded-none"
                                startContent={
                                  <BiTrash className="w-6 h-6 m-auto text-[#B9B9B9] dark:text-[#5B6C89]" />
                                }
                                onClick={() => {
                                  deleteAccount.onOpen()
                                  setIsOpened(false)
                                }}>
                                <span className="dark:text-white">Delete Account</span>
                              </DropdownItem>
                              <DropdownItem
                                className="hover:bg-gray-100 dark:hover:bg-slate-800  !rounded-none"
                                startContent={
                                  <HiOutlineLogout className="w-6 h-6 m-auto text-[#B9B9B9] dark:text-[#5B6C89]" />
                                }
                                onClick={() => {
                                  handleSignOut()
                                  setIsOpened(false)
                                }}>
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
      <DeleteAccountModal isOpen={deleteAccount.isOpen} onClose={deleteAccount.onClose} />
    </>
  )
}

export default Navbar
