import {Rating} from "@mui/material"
import {Button, Input, extendVariants} from "@nextui-org/react"
import Image from "next/image"
import React, {useState} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {AiTwotoneStar} from "react-icons/ai"

interface IProfile {
  firstName: string
  lastName: string
  phone: number
  email: string
  gender: string
  dateOfBirth: string
}
const inputStyle = {
  label: "text-black dark:text-white/90 text-lg",
  inputWrapper: ["bg-white"]
}
export const MyButton = extendVariants(Button, {
  variants: {
    size: {
      md: "px-6 py-3 min-w-unit-20  h-full text-lg gap-unit-2 rounded-lg inline-flex"
    }
  },
  defaultVariants: {
    color: "default",
    size: "md"
  }
})

const ProfileContent = function ProfileContent() {
  const {register, handleSubmit} = useForm<IProfile>()
  const [gender, setGender] = useState("male")
  const onSubmit: SubmitHandler<IProfile> = (formData: IProfile) => formData
  return (
    <div className="m-32 mt-28  pt-20 bg-gray-100 relative rounded-lg">
      <div className="absolute top-[0] left-[50%] -translate-x-[50%] -translate-y-[50%]  w-40 h-40 overflow-hidden rounded-full">
        <Image src="/user-profile.jpg" alt="user" className="!relative" fill />
      </div>
      <div className="flex justify-center mt-2">
        <Rating
          name="read-only"
          value={4}
          readOnly
          size="large"
          icon={<AiTwotoneStar />}
          emptyIcon={<AiTwotoneStar className="text-gray-300" />}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 gap-3 pb-5 sm:px-10 md:px-20 lg:px-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <Input
            size="lg"
            label="First Name"
            labelPlacement="outside"
            type="text"
            {...register("firstName")}
            id="firstName"
            placeholder="First Name"
            variant="bordered"
            classNames={inputStyle}
          />
          <Input
            size="lg"
            label="Last Name"
            labelPlacement="outside"
            type="text"
            {...register("lastName")}
            id="lastName"
            placeholder="Last Name"
            variant="bordered"
            classNames={inputStyle}
          />
          <Input
            size="lg"
            label="Phone"
            labelPlacement="outside"
            type="number"
            {...register("phone")}
            id="phone"
            placeholder="0000000000"
            variant="bordered"
            startContent={
              <select className="py-1 rounded-lg">
                <option value="+970">+970</option>
              </select>
            }
            classNames={inputStyle}
          />
          <Input
            size="lg"
            label="Eamil"
            labelPlacement="outside"
            type="email"
            {...register("email")}
            id="email"
            placeholder="Email"
            variant="bordered"
            className="flex-1"
            classNames={inputStyle}
          />
          <div>
            <span className="block font-medium pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none text-black dark:text-white/90 text-lg">
              Gender
            </span>
            <div className="my-flex gap-2">
              <MyButton
                onClick={() => setGender("male")}
                className={`${
                  gender === "male" ? "border-2 border-blue-500" : ""
                }`}>
                Male
              </MyButton>
              <MyButton
                onClick={() => setGender("female")}
                className={`${
                  gender === "female" ? "border-2 border-blue-500" : ""
                }`}>
                Female
              </MyButton>
            </div>
          </div>
          <Input
            size="lg"
            label="Date Of Birth"
            labelPlacement="outside"
            {...register("dateOfBirth")}
            placeholder="YYYY/MM/DD"
            variant="bordered"
            type="date"
            classNames={inputStyle}
          />
        </div>
        <div className="my-flex">
          <Button size="lg" color="primary">
            <input
              type="submit"
              value="Save"
              className="inline-block w-full h-full cursor-pointer"
            />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileContent
