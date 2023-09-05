import {Rating} from "@mui/material"
import {Input} from "@nextui-org/react"
import {toast} from "react-toastify"
import Image from "next/image"
import React, {useEffect, useState} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {AiTwotoneStar} from "react-icons/ai"
import MyButton from "../uis/button"
import client from "../../helpers/client"
import LoadingDiv from "../uis/loading"
import {useUser} from "../../stores/user"
import {useAuth} from "../../stores/auth"
import {useNotifications} from "../../stores/notifications"
import "react-toastify/dist/ReactToastify.css"
import {IProfileRes} from "../../types"

interface IProfile {
  first_name: string
  last_name: string
  mobile: number
  email: string
  gender: 1 | 2
  dob: string
}

const inputStyle = {
  label: "text-black dark:text-white/90 text-lg",
  inputWrapper: ["bg-white", "h-[50px]", "shadow-none"],
  input: "pl-2 text-black"
}

const ProfileContent = function ProfileContent() {
  const {token} = useAuth()
  const {user, handleUser} = useUser()
  const {
    register,
    handleSubmit,
    formState: {isLoading, errors}
  } = useForm<IProfile>({
    defaultValues: async () =>
      await client("profile", {method: "GET"})?.then((res) => res.user),
    criteriaMode: "all"
  })
  const {reFetch} = useNotifications()
  const [gender, setGender] = useState(1)
  const [profileDataUpdated, setProfileDataUpdated] = useState(false)
  const [avatarUpdated, setAvatarUpdated] = useState(false)

  const goT = (massage: string) => {
    toast.success(massage, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored"
    })
  }
  const onSubmit: SubmitHandler<IProfile> = async (formData: IProfile) => {
    await client("update-profile", {
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile: formData.mobile,
        email: formData.email,
        dob: formData.dob,
        gender: gender
      }),
      method: "POST"
    })
      ?.then((res: IProfileRes) => {
        if (res.success) {
          handleUser(res.user)
          setProfileDataUpdated(true)
          reFetch()
        } else if (res.massage) {
          toast.error("Email Used Before", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored"
          })
        }
      })
      .catch(() => {
        toast.error("This Email exist", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored"
        })
      })
  }
  const handleImage = (e: any) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader()
      reader.readAsBinaryString(e.target.files[0])
      reader.onload = () => {
        const data = new FormData()
        data.append("photo", e.target.files[0])
        fetch("https://booknap-api.wpgooal.com/api/change-avatar", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: data,
          method: "POST"
        })?.then((res: any) => {
          handleUser(res.user)
          setAvatarUpdated(true)
          reFetch()
        })
      }
    }
  }
  useEffect(() => {
    if (profileDataUpdated) {
      goT("Your Profile Updated Successfully")
      setProfileDataUpdated(false)
    }
  }, [profileDataUpdated])

  useEffect(() => {
    if (avatarUpdated) {
      goT("Your Avatar Change Successfully")
      setAvatarUpdated(false)
    }
  }, [avatarUpdated])

  if (!isLoading && user) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="my-container">
        <div className="flex flex-col lg:flex-row  gap-5 my-14">
          <div className="px-10 py-10 bg-gray-100 dark:bg-mirage  rounded-lg flex flex-col justify-center gap-3">
            <div className="relative w-fit m-auto">
              <div className="w-40 h-40 overflow-hidden rounded-full mx-auto relative">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="user"
                    className="!relative"
                    fill
                  />
                ) : null}
              </div>
            </div>
            <h2 className="text-xl-2 font-semi-bold whitespace-nowrap text-center">
              JONATHAN HOLMES
            </h2>
            <div className="flex justify-center">
              <Rating
                name="read-only"
                value={user.stars}
                readOnly
                size="medium"
                icon={<AiTwotoneStar />}
                emptyIcon={<AiTwotoneStar className="text-gray-300" />}
              />
            </div>
            <div className="flex justify-center">
              <MyButton
                color="primary"
                size="lg"
                radius="sm"
                className="relative">
                Upload New Photo
                <input
                  type="file"
                  onChange={handleImage}
                  className="absolute inline-block top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </MyButton>
            </div>
            <div className="bg-[#E9EDF4] dark:bg-blue-charcoal p-3 text-center rounded-md">
              <p className="mb-3 text-sm ">
                Upload A New Avatar.
                <br />
                Larger Image Will Be Resized Automatically
              </p>
              <p className="text-sm">
                Maximum Upload Size Is
                <span className="font-semi-bold"> 1 MB</span>
              </p>
            </div>
          </div>
          <div className="py-10 bg-gray-100 dark:bg-mirage rounded-lg ">
            <div className="sm:px-5 md:px-10 lg:px-20">
              <h1 className="heading-1 mb-5 dark:text-white">EDIT PROFILE</h1>
              <div className="p-3 gap-2 gap-x-3 pb-5">
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-3 mb-3">
                  <div>
                    <Input
                      size="lg"
                      label="First Name"
                      labelPlacement="outside"
                      type="text"
                      {...register("first_name", {required: true})}
                      id="firstName"
                      placeholder="First Name"
                      variant="flat"
                      classNames={inputStyle}
                      radius="sm"
                    />
                    {errors.first_name?.types?.required ? (
                      <p className="text-red-500">This Filed is Required</p>
                    ) : null}
                  </div>
                  <div>
                    <Input
                      size="lg"
                      label="Last Name"
                      labelPlacement="outside"
                      type="text"
                      {...register("last_name", {required: true})}
                      id="lastName"
                      placeholder="Last Name"
                      variant="flat"
                      radius="sm"
                      classNames={inputStyle}
                    />
                    {errors.last_name?.types?.required ? (
                      <p className="text-red-500">This Filed is Required</p>
                    ) : null}
                  </div>
                  <div>
                    <Input
                      size="lg"
                      label="mobile"
                      labelPlacement="outside"
                      type="string"
                      {...register("mobile", {required: true})}
                      id="mobile"
                      placeholder="+000000000000"
                      variant="flat"
                      radius="sm"
                      classNames={inputStyle}
                    />
                    {errors.mobile?.types?.required ? (
                      <p className="text-red-500">This Filed is Required</p>
                    ) : null}
                  </div>
                  <div>
                    <Input
                      size="lg"
                      label="Email"
                      labelPlacement="outside"
                      type="email"
                      {...register("email", {required: true})}
                      id="email"
                      placeholder="Email"
                      variant="flat"
                      className="flex-1"
                      radius="sm"
                      classNames={inputStyle}
                    />
                    {errors.email?.types?.required ? (
                      <p className="text-red-500">This Filed is Required</p>
                    ) : null}
                  </div>
                  <div className="h-full">
                    <span className="block font-medium pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none text-black dark:text-white/90 text-lg">
                      Gender
                    </span>
                    <div className="my-flex gap-2">
                      <MyButton
                        onClick={() => setGender(1)}
                        size="xl2"
                        color="white"
                        fullWidth
                        className={`${
                          gender === 1
                            ? "border-2 bg-[#E9EDF4] dark:bg-[#909090] border-blue-500"
                            : "dark:bg-blue-charcoal dark:text-white"
                        }`}>
                        Male
                      </MyButton>
                      <MyButton
                        onClick={() => setGender(2)}
                        size="xl2"
                        color="white"
                        fullWidth
                        className={`${
                          gender === 2
                            ? "border-2 bg-[#E9EDF4] dark:bg-[#909090] border-blue-500"
                            : "dark:bg-blue-charcoal dark:text-white"
                        }`}>
                        Female
                      </MyButton>
                    </div>
                  </div>
                  <div>
                    <Input
                      size="lg"
                      label="Date Of Birth"
                      labelPlacement="outside"
                      {...register("dob", {required: true})}
                      placeholder="YYYY/MM/DD"
                      variant="flat"
                      type="date"
                      classNames={inputStyle}
                    />
                    {errors.dob?.types?.required ? (
                      <p className="text-red-500">This Filed is Required</p>
                    ) : null}
                  </div>
                </div>
                <div className="my-flex">
                  <MyButton
                    size="xl"
                    color="primary"
                    type="submit"
                    className="px-10">
                    Save
                  </MyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
  return <LoadingDiv />
}

export default ProfileContent
