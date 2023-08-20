/* eslint-disable no-unused-vars */
import React, {useState} from "react"
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
import {useMutation} from "@tanstack/react-query"
import axios from "axios"
import MyButton from "../uis/button"
import {type3} from "../uis/modal-styles"
import auth from "../../firebase/firebase.config"
import {ISignInRes} from "../../types"

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
  setPage,
  onSignUp
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>
  // eslint-disable-next-line no-unused-vars
  onSignUp: (signData: ISignIn) => void
}) {
  const {register, handleSubmit, getValues} = useForm<ISignIn>()
  const onSubmit: SubmitHandler<ISignIn> = (formData: ISignIn) => formData
  const mutation = useMutation({
    mutationFn: (data: {name: string; email: string; type: "1"}) => {
      return axios.post(
        "https://booknap-api.wpgooal.com/api/login-mobile",
        data
      )
    }
  })
  const google = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then((res) => {
      const {displayName, email} = res.user
      if (email && displayName) {
        mutation.mutate({name: displayName, email: email, type: "1"})
      }
    })
  }
  const apple = async () => {
    const provider = new OAuthProvider("apple.com")
    signInWithPopup(auth, provider).then((res) => {
      const {displayName, email} = res.user
      if (email && displayName) {
        mutation.mutate({name: displayName, email: email, type: "1"})
      }
    })
  }

  return (
    <>
      <ModalHeader>
        <h1 className="heading-2 mb-10">Sign In Account</h1>
      </ModalHeader>
      <ModalBody>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 relative justify-center">
          <div className="flex gap-3 flex-col md:flex-row">
            <div>
              <label htmlFor="name" className="label">
                Username
              </label>
              <Input
                type="text"
                variant="flat"
                {...register("name", {required: true})}
                classNames={{
                  inputWrapper:
                    "input p-3 leading-5 bg-white rounded-lg resize-none h-full"
                }}
              />
            </div>
            <div>
              <label htmlFor="phone" className="label">
                Phone
              </label>
              <Input
                type="tel"
                id="phone"
                variant="flat"
                {...register("mobile", {required: true})}
                placeholder="+000000000000"
                classNames={{
                  inputWrapper:
                    "input p-3 leading-5 bg-white rounded-lg resize-none h-full"
                }}
              />
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

          <MyButton
            color="primary"
            fullWidth
            onClick={() => {
              if (getValues().name && getValues().mobile) {
                onSignUp(getValues())
                setPage(1)
              }
            }}>
            Sign in
          </MyButton>
        </form>
      </ModalBody>
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
const ConfigCode = function ConfigCode({onClose}: {onClose: () => void}) {
  const {register, handleSubmit, getValues} = useForm<IConfigCode>({
    defaultValues: init
  })
  const onSubmit: SubmitHandler<IConfigCode> = (formData: IConfigCode) => {
    if (
      getValues().check1 &&
      getValues().check2 &&
      getValues().check3 &&
      getValues().check4
    )
      return formData
  }
  const [loading, setLoading] = useState<boolean>(false)
  const mutation = useMutation({
    mutationFn: async (data: {
      name: string
      mobile: string
      type: "1"
      code: string
    }) => {
      const res = await axios.post(
        "https://booknap-api.wpgooal.com/api/login-mobile",
        data
      )
      const resData: ISignInRes = res.data
      localStorage.setItem("TOKEN", resData.token)
    }
  })

  const onOTPVerify = function onOTPVerify() {
    setLoading(true)
    const code = `${getValues().check1}${getValues().check2}${
      getValues().check3
    }${getValues().check4}${getValues().check5}${getValues().check6}`
    window.confirmationResult
      .confirm(code)
      .then(async (res: any) => {
        if (window.signInData) {
          const {name, mobile} = window.signInData
          mutation.mutate({
            name: name,
            mobile: mobile,
            type: "1",
            code: code
          })
          onClose()
        }

        setLoading(false)
      })
      .catch((err: any) => {
        setLoading(false)
      })
  }
  return (
    <>
      <ModalHeader>
        <h1 className="heading-2 mb-10">Sign In Account</h1>
      </ModalHeader>
      <ModalBody>
        <p>An Email With Verification Code Was Just Sent To +970 599933399</p>
        <div className="flex justify-center">
          <MyButton>Resend</MyButton>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 relative justify-center">
          <div className="flex gap-3 flex-col md:flex-row justify-evenly mb-4">
            {Object.keys(init).map((check) => {
              return (
                <Input
                  lang="en"
                  type="number"
                  {...register(
                    check as
                      | "check1"
                      | "check2"
                      | "check3"
                      | "check4"
                      | "check5"
                      | "check6",
                    {required: true, max: 9, min: 0}
                  )}
                  classNames={{
                    innerWrapper:
                      "input p-3 leading-5 bg-white rounded-lg resize-none w-15 h-15 text-center text-xl"
                  }}
                  placeholder="0"
                />
              )
            })}
          </div>
          <MyButton
            onClick={() => onOTPVerify()}
            type="submit"
            isLoading={loading}
            color="primary"
            fullWidth>
            Sign in
          </MyButton>
        </form>
      </ModalBody>
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
  const onSignUp = (signData: ISignIn) => {
    if (!window.recaptchaVerifier) {
      const recaptchaParameters: RecaptchaParameters = {
        "size": "invisible",
        "callback": (respons: any) => {
          onSignUp(signData)
        },
        "expired-callback": () => {
          window.recaptchaVerifier = null
        }
      }
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        recaptchaParameters
      )
    }

    const appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(auth, signData.mobile, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult
        window.signInData = signData
      })
      .catch((error: Error) => {
        window.recaptchaVerifier = null
      })
  }
  const [signInData, setSignInData] = useState({})

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
          {page === 0 ? (
            <SignIn setPage={setPage} onSignUp={onSignUp} />
          ) : (
            <ConfigCode onClose={onClose} />
          )}
        </div>
      </ModalContent>
    </Modal>
  )
}

export default SignInModal
