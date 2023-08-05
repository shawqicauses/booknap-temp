import {Button} from "@nextui-org/react"
import React from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {BsTelephone} from "react-icons/bs"
import {HiOutlineMap} from "react-icons/hi"
import {TfiHeadphoneAlt} from "react-icons/tfi"

interface ICountactUsForm {
  firstName: string
  email: string
  massage: string
}

const CountactUsForm = function CountactUsForm() {
  const {register, handleSubmit} = useForm<ICountactUsForm>()
  const onSubmit: SubmitHandler<ICountactUsForm> = (
    formData: ICountactUsForm
  ) => formData

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-3 flex flex-col  gap-3">
      <div className="flex flex-col md:flex-row gap-3">
        <div>
          <label htmlFor="firtsName" className="inline-block mb-2">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName")}
            id="firstName"
            placeholder="First Name"
            className="border-0 outline-0 rounded-lg block w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="inline-block mb-2">
            Eamil
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            placeholder="Email"
            className="border-0 outline-0 rounded-lg block w-full"
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="massage" className="inline-block mb-2">
          Your Massage
        </label>
        <textarea
          {...register("massage")}
          id="massage"
          cols={30}
          rows={10}
          placeholder="Message"
          className="resize-none block w-full border-0 outline-0 rounded-lg"
        />
      </div>
      <div className="my-flex">
        <Button size="lg" color="primary">
          <input
            type="submit"
            value="Submit"
            className="inline-block w-full h-full"
          />
        </Button>
      </div>
    </form>
  )
}

const CountactUsContent = function CountactUsContent() {
  return (
    <div className="py-4 bg-white">
      <div className="my-container">
        <div className="text-center bg-gray-100 p-4 pt-8 bg-[url('/mask.png')] mb-6 ">
          <h1 className="heading-1 text-blue-600 mb-4">CONTACT US</h1>
          <p className="body max-w-xl mx-auto">
            please feel free to contact with us for any kinds of inquiries and
            information. our support team always available to help the clients.
          </p>
        </div>
        <div className="flex items-start gap-5 flex-col-reverse lg:flex-row">
          <div className="bg-gray-100 p-10 rounded-lg w-full lg:w-auto">
            <h2 className="heading-2 mb-4">HEAD OFFICE</h2>
            <ul className="flex flex-col gap-3">
              <li className="whitespace-nowrap flex gap-2">
                <HiOutlineMap className="h-7 w-7" />
                <span>684 West College St. Sun City, United States.</span>
              </li>
              <li className="whitespace-nowrap flex gap-2">
                <BsTelephone className="h-7 w-7" />
                <span>(+55) 654 - 545 - 5418</span>
              </li>
              <li className="whitespace-nowrap flex gap-2">
                <TfiHeadphoneAlt className="h-7 w-7" />
                <span>Support</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 p-10 rounded-lg flex-1 w-full lg:w-auto">
            <h2 className="heading-2 mb-4">SEND US A MESSAGE</h2>
            <CountactUsForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountactUsContent
