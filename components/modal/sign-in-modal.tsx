import React, {useState, useEffect, useContext} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {BsApple, BsGoogle} from "react-icons/bs"
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader
} from "@nextui-org/react"
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
import {Auth} from "../../stores/auth"
import {User} from "../../stores/user"
import {CurrentBookingOrder} from "../../stores/current-booking-order"

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

const SignIn = function SignIn({
  register,
  errors,
  watch,
  signInByProviders
}: {
  register: any
  errors: any
  watch: any
  signInByProviders: Function
}) {
  const google = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((res) => {
        GoogleAuthProvider.credentialFromResult(res)
        const {displayName, email} = res.user
        if (email && displayName) {
          signInByProviders({name: displayName, email: email, type: "1"})
        }
      })
      .catch(() => {})
  }
  const apple = async () => {
    const provider = new OAuthProvider("apple.com")
    signInWithPopup(auth, provider)
      .then((res) => {
        OAuthProvider.credentialFromResult(res)
        const {displayName, email} = res.user
        if (email && displayName) {
          signInByProviders({name: displayName, email: email, type: "1"})
        }
      })
      .catch(() => {})
  }

  return (
    <>
      <div className="flex gap-3 flex-col md:flex-row">
        <div>
          <label htmlFor="name" className="label">
            Username
          </label>
          <Input
            type="text"
            variant="flat"
            value={watch().userName}
            {...register("name", {required: true, min: 10})}
            placeholder="userName"
            classNames={{
              inputWrapper:
                "input p-3 leading-5 bg-white rounded-lg resize-none h-full"
            }}
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
            classNames={{
              inputWrapper:
                "input p-3 leading-5 bg-white rounded-lg resize-none h-full"
            }}
          />
          {errors.name?.types?.required ? (
            <p className="text-red-500">This Filed is Required</p>
          ) : null}
        </div>
      </div>
      <MyButton fullWidth onClick={google}>
        <BsGoogle className="h-5 w-5 text-gray-400" />
        Google
      </MyButton>
      <MyButton fullWidth onClick={apple}>
        <BsApple className="h-5 w-5 text-gray-400" />
        Apple
      </MyButton>
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
  handleResend
}: {
  watch: any
  register: any
  errors: any
  handleResend: Function
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
        ;(checks[nextIndex] as HTMLInputElement).dispatchEvent(
          new Event("input")
        )
      }
    }

    checks.forEach((element, index) => {
      element.addEventListener("keydown", (e) =>
        handleKeyDown(index, e as KeyboardEvent)
      )
      element.addEventListener("input", (e) =>
        handleInput(index, e as InputEvent)
      )
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
      <div className="flex gap-3 flex-col md:flex-row justify-evenly mb-4">
        {Object.keys(init).map((check: any) => {
          const check2:
            | "check1"
            | "check2"
            | "check3"
            | "check4"
            | "check5"
            | "check6" = check
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

  const onSignUp = (mobile: string) => {
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
    const appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(auth, mobile, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult
      })
      .catch(() => {
        window.recaptchaVerifier = null
      })
  }
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: {errors}
  } = useForm<IConfigCode & ISignIn>({
    criteriaMode: "all"
  })
  const [loading, setLoading] = useState<boolean>(false)
  const {signIn} = useContext(Auth)
  const {handleUser} = useContext(User)
  const {handleCurrentBookingOrder} = useContext(CurrentBookingOrder)

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
      window.confirmationResult.confirm(code).then(() => {
        client("login-mobile", {
          method: "POST",
          body: JSON.stringify({
            name: formData.name,
            mobile: formData.mobile,
            type: "1",
            code: code
          })
        })?.then((resSign: ISginIn) => {
          localStorage.setItem("TOKEN", resSign.token)
          handleUser(resSign.user)
          if (resSign.has_booking) {
            handleCurrentBookingOrder(resSign.booking)
          }
          signIn()
          onClose()
          setPage(0)
        })
        setLoading(false)
      })
    }
  }

  const signInByProviders = (data: {
    name: string
    email: string
    type: "1"
  }) => {
    client("https://booknap-api.wpgooal.com/api/login-email", {
      body: JSON.stringify(data),
      method: "POST"
    })?.then((resSign: ISginIn) => {
      localStorage.setItem("TOKEN", resSign.token)
      handleUser(resSign.user)
      if (resSign.has_booking) {
        handleCurrentBookingOrder(resSign.booking)
      }
      signIn()
      onClose()
      setPage(0)
    })
  }

  const handleResend = () => {
    window.confirmationResult = undefined
    window.recaptchaVerifier = undefined
    onSignUp(watch().mobile)
  }

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      className="bg-[#F5F5F5]"
      classNames={type3}>
      <ModalContent>
        <div className="p-5">
          <div id="recaptcha-container" />
          <ModalHeader>
            <h1 className="heading-2 mb-10">Sign In Account</h1>
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 relative justify-center">
              {page === 0 ? (
                <SignIn
                  errors={errors}
                  watch={watch}
                  register={register}
                  signInByProviders={signInByProviders}
                />
              ) : (
                <ConfigCode
                  watch={watch}
                  register={register}
                  errors={errors}
                  handleResend={handleResend}
                />
              )}
              <MyButton
                color="primary"
                type={page === 1 ? "submit" : "button"}
                fullWidth
                isLoading={loading}
                onClick={() => {
                  if (getValues().name && getValues().mobile) {
                    onSignUp(getValues().mobile)
                    setPage(1)
                  }
                }}>
                Sign in
              </MyButton>
            </form>
          </ModalBody>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default SignInModal
