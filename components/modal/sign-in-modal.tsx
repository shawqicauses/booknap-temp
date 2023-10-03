import Link from "next/link"
import React, {useState, useEffect} from "react"
import {SubmitHandler, UseFormGetValues, useForm} from "react-hook-form"
import {BsApple, BsGoogle} from "react-icons/bs"
import {Input, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react"
import {toast} from "react-toastify"
import {
  GoogleAuthProvider,
  OAuthProvider,
  RecaptchaParameters,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup
} from "firebase/auth"
import MyButton from "../uis/button"
import {type3} from "../uis/modal-styles"
import auth from "../../firebase/firebase.config"
import {ISginIn} from "../../types"
import client from "../../helpers/client"
import {useAuth} from "../../stores/auth"
import {useUser} from "../../stores/user"
import {useCurrentBookingOrder} from "../../stores/current-booking-order"

interface ISignIn {
  name: string
  mobile: string
}
interface IConfigCode {
  check1: number | null
  check2: number | null
  check3: number | null
  check4: number | null
  check5: number | null
  check6: number | null
}
const inputStyle = {
  inputWrapper:
    "input p-3 leading-5 bg-gray-100 rounded-lg resize-none h-full shadow-none dark:bg-mirage dark:border-mirage",
  input: "dark:text-white"
}
const SignIn = function SignIn({
  register,
  errors,
  watch,
  signInByProviders,
  getValues,
  onSignUp,
  setPage
}: {
  register: any
  errors: any
  watch: any
  // eslint-disable-next-line no-unused-vars
  signInByProviders: (name: string, email: string) => Promise<void>
  getValues: UseFormGetValues<IConfigCode & ISignIn>
  onSignUp: Function
  setPage: Function
}) {
  const google = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
      .then(async (res) => {
        GoogleAuthProvider.credentialFromResult(res)
        const {displayName, email} = res.user
        if (email && displayName) {
          await signInByProviders(displayName, email)
        }
      })
      .catch(() => {})
  }
  const apple = async () => {
    const provider = new OAuthProvider("apple.com")
    await signInWithPopup(auth, provider)
      .then(async (res) => {
        OAuthProvider.credentialFromResult(res)
        const {displayName, email} = res.user
        if (email && displayName) {
          await signInByProviders(displayName, email)
        }
      })
      .catch(() => {})
  }

  return (
    <>
      <div className="flex gap-3 flex-col">
        <div>
          <label htmlFor="name" className="label">
            Username
          </label>
          <Input
            type="text"
            variant="flat"
            value={watch().userName}
            {...register("name", {required: true, min: 10})}
            placeholder="Username"
            classNames={inputStyle}
          />
          {errors.mobile?.types?.required ? (
            <p className="text-red-500">This Filed is Required</p>
          ) : null}
          {!errors.mobile?.types?.required && errors.mobile?.types?.min ? (
            <p className="text-red-500">This Filed is Required</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="mobile" className="label">
            Phone
          </label>
          <Input
            type="tel"
            id="mobile"
            variant="flat"
            value={watch().mobile}
            {...register("mobile", {required: true})}
            placeholder="+000000000000"
            classNames={inputStyle}
          />
          {errors.name?.types?.required ? (
            <p className="text-red-500">This Filed is Required</p>
          ) : null}
        </div>
      </div>
      <div className="w-[50%] mx-auto">
        <MyButton
          color="primary"
          type="button"
          fullWidth
          onClick={() => {
            if (getValues().name && getValues().mobile) {
              onSignUp(getValues().mobile)
              setPage(1)
            }
          }}>
          Sign in
        </MyButton>
      </div>
      <div className="flex items-center w-[50%] mx-auto">
        <span className="inline-block h-0.5 w-full bg-gray-100" />
        <span className="px-2 label text-gray-100">or</span>
        <span className="inline-block h-0.5 w-full bg-gray-100" />
      </div>
      <div className="flex gap-4">
        <MyButton color="transparent" variant="bordered" radius="full" fullWidth onClick={google}>
          <BsGoogle className="h-5 w-5 text-gray-400" />
          Google
        </MyButton>
        <MyButton variant="bordered" color="transparent" radius="full" fullWidth onClick={apple}>
          <BsApple className="h-5 w-5 text-gray-400" />
          Apple
        </MyButton>
      </div>
      <Link href="https://booknap-api.wpgooal.com/hotels/login" className="body text-center">
        Sign in as Hotel
      </Link>
    </>
  )
}

const init: IConfigCode = {
  check1: null,
  check2: null,
  check3: null,
  check4: null,
  check5: null,
  check6: null
}

const ConfigCode = function ConfigCode({
  watch,
  register,
  handleResend,
  loading,
  isSubmitting
}: {
  watch: any
  register: any
  errors: any
  handleResend: Function
  loading: boolean
  isSubmitting: boolean
}) {
  useEffect(() => {
    const checks = document.querySelectorAll("input.check")

    const handleKeyDown = (index: number, event: KeyboardEvent) => {
      const inputElement = event.target as HTMLInputElement

      if (event.code === "Backspace" && inputElement.value === "") {
        const previousIndex = Math.max(0, index - 1)
        ;(checks[previousIndex] as HTMLInputElement).focus()
      }
    }

    const handleInput = (index: number, event: InputEvent) => {
      const inputElement = event.target as HTMLInputElement
      const [first, ...rest] = inputElement.value
      inputElement.value = first || ""

      const isLastInputElement = index === checks.length - 1
      const didInsertContent = !!first

      if (!isLastInputElement && didInsertContent) {
        const nextIndex = index + 1
        ;(checks[nextIndex] as HTMLInputElement).focus()
        ;(checks[nextIndex] as HTMLInputElement).value = rest.join("")
        ;(checks[nextIndex] as HTMLInputElement).dispatchEvent(new Event("input"))
      }
    }

    checks.forEach((element, index) => {
      element.addEventListener("keydown", (e) => handleKeyDown(index, e as KeyboardEvent))
      element.addEventListener("input", (e) => handleInput(index, e as InputEvent))
    })
  }, [])

  return (
    <>
      <p>An Email With Verification Code Was Just Sent To {watch().mobile}</p>
      <div className="flex justify-center">
        <MyButton
          onClick={() => {
            handleResend()
          }}>
          Resend
        </MyButton>
      </div>
      <div className="flex gap-0.5 md:gap-3 flex-row justify-evenly mb-4">
        {Object.keys(init).map((check: any) => {
          const check2: "check1" | "check2" | "check3" | "check4" | "check5" | "check6" = check
          return (
            <input
              lang="en"
              key={check2}
              type="number"
              value={watch()?.[check2]}
              {...register(check2, {required: true, max: 9, min: 0})}
              className="check input p-3 leading-5 bg-white rounded-lg resize-none w-15 h-15 text-center text-xl"
              placeholder="0"
            />
          )
        })}
      </div>
      <MyButton color="primary" type="submit" fullWidth isLoading={loading || isSubmitting}>
        Sign in
      </MyButton>
    </>
  )
}

const SignInModal = function SignInModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [page, setPage] = useState<number>(0)
  const {setHotelRating} = useUser()
  const onSignUp = async (mobile: string) => {
    if (!window.recaptchaVerifier) {
      const recaptchaParameters: RecaptchaParameters = {
        "size": "invisible",
        "callback": () => {
          onSignUp(mobile)
        },
        "expired-callback": () => {
          window.recaptchaVerifier = undefined
        }
      }
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        recaptchaParameters
      )
    }
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible"
    })

    signInWithPhoneNumber(auth, mobile, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult
      })
      .catch(() => {})
  }

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: {errors, isSubmitting},
    reset
  } = useForm<IConfigCode & ISignIn>({
    defaultValues: {
      mobile: "+966"
    },
    criteriaMode: "all"
  })
  const [loading, setLoading] = useState<boolean>(false)
  const {signIn} = useAuth()
  const {handleUser} = useUser()
  const {handleCurrentBookingOrder} = useCurrentBookingOrder()

  const onSubmit: SubmitHandler<IConfigCode & ISignIn> = (formData) => {
    setLoading(true)
    if (window.confirmationResult) {
      const code = [
        formData.check1,
        formData.check2,
        formData.check3,
        formData.check4,
        formData.check5,
        formData.check6
      ].join("")
      window.confirmationResult
        .confirm(code)
        .then(async () => {
          const resSign: ISginIn = await client("login-mobile", {
            method: "POST",
            body: JSON.stringify({
              name: formData.name,
              mobile: formData.mobile,
              type: "1",
              code: code
            })
          })?.catch(() => {})
          localStorage.setItem("TOKEN", resSign.token)
          handleUser(resSign.user)
          if (resSign.has_booking) {
            handleCurrentBookingOrder(resSign.booking)
          }
          setHotelRating(resSign.hotel_rating)
          reset()
          signIn()
          setLoading(false)
          onClose()
          setPage(0)
        })
        .catch(() => {
          toast.error("Code is not Correct", {
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
  }

  const signInByProviders = async (name: string, email: string) => {
    const resSign: ISginIn = await client("https://booknap-api.wpgooal.com/api/login-email", {
      body: JSON.stringify({
        name: name,
        email: email,
        type: "1"
      }),
      method: "POST"
    })?.catch(() => {})
    localStorage.setItem("TOKEN", resSign.token)
    handleUser(resSign.user)
    if (resSign.has_booking) {
      handleCurrentBookingOrder(resSign.booking)
    }
    reset()
    setHotelRating(resSign.hotel_rating)
    onClose()
    signIn()
    setPage(0)
  }

  const handleResend = () => {
    // onSignUp(watch().mobile)
  }

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose} classNames={type3}>
      <ModalContent>
        <div className="px-5 pt-5 pb-4">
          <div id="recaptcha-container" />
          <ModalHeader>
            <h1 className="heading-main-3 ml-3">Sign In</h1>
          </ModalHeader>
          <ModalBody className="">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 relative">
              {page === 0 ? (
                <SignIn
                  errors={errors}
                  watch={watch}
                  register={register}
                  signInByProviders={signInByProviders}
                  getValues={getValues}
                  onSignUp={onSignUp}
                  setPage={setPage}
                />
              ) : (
                <ConfigCode
                  watch={watch}
                  register={register}
                  errors={errors}
                  handleResend={handleResend}
                  loading={loading}
                  isSubmitting={isSubmitting}
                />
              )}
            </form>
            <button id="sign-in-button" type="button" aria-label=" " />
          </ModalBody>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default SignInModal
