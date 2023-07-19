import React, {useState} from "react"
import {Field, Form, Formik} from "formik"
import * as Yup from "yup"

import {BsApple, BsGoogle} from "react-icons/bs"
import Modal from "../modal"
import Button from "../button"

const SignInModal = function SignInModal() {
  const [page, setPage] = useState<number>(0)

  return (
    <Modal
      location={{top: "top-[50%]", right: "left-[50%]"}}
      modalStyle="-translate-x-[50%] -translate-y-[50%] card-gray-50 w-[50%] !py-10 !px-10"
      hasOverLay>
      {page === 0 ? (
        <>
          <h1 className="heading-2 mb-10">Sign In Account</h1>
          <Formik
            initialValues={{
              username: "",
              phone: ""
            }}
            validationSchema={Yup.object({
              username: Yup.string().required("Required"),
              phone: Yup.string().required("Required")
            })}
            onSubmit={async (values) => {
              alert(JSON.stringify({...values}, null, 2))
            }}>
            {({isSubmitting, handleChange, values}) => (
              <Form className="flex flex-col gap-4 relative justify-center">
                <div className="flex gap-3 flex-col md:flex-row">
                  <div>
                    <label htmlFor="username" className="label">
                      Username
                    </label>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      onChange={handleChange}
                      className="input p-3 leading-5 bg-white rounded-xl resize-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">
                      Phone
                    </label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      onChange={handleChange}
                      className="input p-3 leading-5 bg-white rounded-xl resize-none"
                    />
                  </div>
                </div>
                <Button
                  icon={<BsGoogle className="h-5 w-5 text-gray-400" />}
                  text="Google"
                  buttonStyle={{
                    type: "button-white",
                    other: [
                      "rounded-full",
                      "w-full",
                      "text-center",
                      "text-black"
                    ]
                  }}
                />
                <Button
                  icon={<BsApple className="h-5 w-5 text-gray-400" />}
                  text="Apple"
                  buttonStyle={{
                    type: "button-white",
                    other: [
                      "rounded-full",
                      "w-full",
                      "text-center",
                      "text-black"
                    ]
                  }}
                />
                <Button
                  isSubmit
                  text="Sign in"
                  buttonStyle={{type: "button-primary", other: ["w-full"]}}
                  disabled={isSubmitting}
                  handleClick={() => {
                    if (values.username && values.phone) setPage(1)
                  }}
                />
              </Form>
            )}
          </Formik>
        </>
      ) : (
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
          <Formik
            initialValues={{
              check1: NaN,
              check2: NaN,
              check3: NaN,
              check4: NaN
            }}
            validationSchema={Yup.object({
              check1: Yup.number().min(0).max(9).required("Required"),
              check2: Yup.number().min(0).max(9).required("Required"),
              check3: Yup.number().min(0).max(9).required("Required"),
              check4: Yup.number().min(0).max(9).required("Required")
            })}
            onSubmit={async (values) => {
              alert(JSON.stringify({...values}, null, 2))
            }}>
            {({isSubmitting, handleChange}) => (
              <Form className="flex flex-col gap-4 relative justify-center">
                <div className="flex gap-3 flex-col md:flex-row justify-evenly mb-4">
                  <Field
                    lang="en"
                    type="number"
                    id="check1"
                    name="check1"
                    onChange={handleChange}
                    className="input p-3 leading-5 bg-white rounded-xl resize-none w-20 h-20 text-center text-xl"
                    max="9"
                    min="0"
                    placeholder="0"
                  />
                  <Field
                    lang="en"
                    type="number"
                    id="check2"
                    name="check2"
                    onChange={handleChange}
                    className="input p-3 leading-5 bg-white rounded-xl resize-none w-20 h-20 text-center text-xl"
                    max="9"
                    min="0"
                    placeholder="0"
                  />
                  <Field
                    lang="en"
                    type="number"
                    id="check3"
                    name="check3"
                    onChange={handleChange}
                    className="input p-3 leading-5 bg-white rounded-xl resize-none w-20 h-20 text-center text-xl"
                    max="9"
                    min="0"
                    placeholder="0"
                  />
                  <Field
                    lang="en"
                    type="number"
                    id="check4"
                    name="check4"
                    onChange={handleChange}
                    className="input p-3 leading-5 bg-white rounded-xl resize-none w-20 h-20 text-center text-xl"
                    max="9"
                    min="0"
                    placeholder="0"
                  />
                </div>
                <Button
                  isSubmit
                  text="Sign in"
                  buttonStyle={{type: "button-primary", other: ["w-full"]}}
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </>
      )}
    </Modal>
  )
}

export default SignInModal
