import React, {useState} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {BsApple, BsGoogle} from "react-icons/bs"
import Modal from "../modal"
import Button from "../button"

interface ISignIn {
  username: string
  phone: string
}
interface IConfigCode {
  check1: number
  check2: number
  check3: number
  check4: number
}

const SignIn = function SignIn({
  setPage
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>
}) {
  const {register, handleSubmit, getValues} = useForm<ISignIn>()
  const onSubmit: SubmitHandler<ISignIn> = (formData: ISignIn) => formData
  return (
    <>
      <h1 className="heading-2 mb-10">Sign In Account</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 relative justify-center">
        <div className="flex gap-3 flex-col md:flex-row">
          <div>
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", {required: true})}
              className="input p-3 leading-5 bg-white rounded-lg resize-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="label">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone", {required: true})}
              className="input p-3 leading-5 bg-white rounded-lg resize-none"
            />
          </div>
        </div>
        <Button
          icon={<BsGoogle className="h-5 w-5 text-gray-400" />}
          text="Google"
          buttonStyle={{
            type: "button-white",
            other: ["rounded-full", "w-full", "text-center", "text-black"]
          }}
        />
        <Button
          icon={<BsApple className="h-5 w-5 text-gray-400" />}
          text="Apple"
          buttonStyle={{
            type: "button-white",
            other: ["rounded-full", "w-full", "text-center", "text-black"]
          }}
        />
        <Button
          isSubmit
          text="Sign in"
          buttonStyle={{type: "button-primary", other: ["w-full"]}}
          handleClick={() => {
            if (getValues().username && getValues().phone) setPage(1)
          }}
        />
      </form>
    </>
  )
}

const ConfigCode = function ConfigCode() {
  const {register, handleSubmit, getValues} = useForm<IConfigCode>()
  const onSubmit: SubmitHandler<IConfigCode> = (formData: IConfigCode) => {
    if (
      getValues().check1 &&
      getValues().check2 &&
      getValues().check3 &&
      getValues().check4
    )
      return formData
  }

  return (
    <>
      <h1 className="heading-2 mb-10">Sign In Account</h1>
      <p>An Email With Verification Code Was Just Sent To +970 599933399</p>
      <div className="flex justify-center">
        <Button
          text="Resend"
          buttonStyle={{
            type: "button",
            other: ["text-blue-700", "border-0", "hover:text-blue-700"]
          }}
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 relative justify-center">
        <div className="flex gap-3 flex-col md:flex-row justify-evenly mb-4">
          <input
            lang="en"
            type="number"
            {...register("check1", {required: true, max: 9, min: 0})}
            className="input p-3 leading-5 bg-white rounded-lg resize-none w-20 h-20 text-center text-xl"
            placeholder="0"
          />
          <input
            lang="en"
            type="number"
            {...register("check2", {required: true, max: 9, min: 0})}
            className="input p-3 leading-5 bg-white rounded-lg resize-none w-20 h-20 text-center text-xl"
            placeholder="0"
          />
          <input
            lang="en"
            type="number"
            {...register("check3", {required: true, max: 9, min: 0})}
            className="input p-3 leading-5 bg-white rounded-lg resize-none w-20 h-20 text-center text-xl"
            placeholder="0"
          />
          <input
            lang="en"
            type="number"
            {...register("check4", {required: true, max: 9, min: 0})}
            className="input p-3 leading-5 bg-white rounded-lg resize-none w-20 h-20 text-center text-xl"
            placeholder="0"
          />
        </div>
        <Button
          isSubmit
          text="Sign in"
          buttonStyle={{type: "button-primary", other: ["w-full"]}}
        />
      </form>
    </>
  )
}
const SignInModal = function SignInModal() {
  const [page, setPage] = useState<number>(0)

  return (
    <Modal
      location={{top: "top-[50%]", right: "left-[50%]"}}
      modalStyle="-translate-x-[50%] -translate-y-[50%] card-gray-50 md:w-[50%] sm:!py-10 sm:!px-10 w-full"
      hasOverLay>
      {page === 0 ? <SignIn setPage={setPage} /> : <ConfigCode />}
    </Modal>
  )
}

export default SignInModal
