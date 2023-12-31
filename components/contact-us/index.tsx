import {Input, Textarea} from "@nextui-org/react"
import React from "react"
import {toast} from "react-toastify"
import {Controller, SubmitHandler, useForm} from "react-hook-form"
import {BsTelephone} from "react-icons/bs"
import {HiOutlineMap} from "react-icons/hi"
import {TfiHeadphoneAlt} from "react-icons/tfi"
import MyButton from "../uis/button"
import client from "../../helpers/client"

interface IContactUsForm {
  name: string
  email: string
  message: string
}

const ContactUsForm = function ContactUsForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors, isSubmitting}
  } = useForm<IContactUsForm>({
    defaultValues: {name: "", email: "", message: ""},
    criteriaMode: "all"
  })
  const onSubmit: SubmitHandler<IContactUsForm> = async (formData: IContactUsForm) => {
    const response = await client("front/add-support", {
      body: JSON.stringify(formData),
      method: "POST"
    })
    if (response) {
      toast.success("Thank you for your message. It has been sent.", {
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
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3 flex flex-col gap-3">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full">
          <Controller
            render={({field}) => (
              <Input
                label="Name"
                labelPlacement="outside"
                type="text"
                {...field}
                placeholder="Name"
                variant="flat"
                size="lg"
                radius="sm"
                classNames={{
                  inputWrapper:
                    "shadow-none bg-white dark:bg-blue-charcoal dark:border-ebony-clay border"
                }}
                disabled={isSubmitting}
              />
            )}
            name="name"
            control={control}
            defaultValue=""
            rules={{required: "This Filed is Required"}}
          />
          {errors.name?.type ? <p className="text-red-500">{errors.name?.message}</p> : null}
        </div>
        <div className="w-full">
          <Controller
            render={({field}) => (
              <Input
                label="Email"
                labelPlacement="outside"
                type="email"
                {...field}
                placeholder="Email"
                variant="flat"
                size="lg"
                radius="sm"
                classNames={{
                  inputWrapper:
                    "shadow-none bg-white dark:bg-blue-charcoal dark:border-ebony-clay border"
                }}
                disabled={isSubmitting}
              />
            )}
            name="email"
            control={control}
            defaultValue=""
            rules={{required: "This Filed is Required"}}
          />
          {errors.email?.type ? <p className="text-red-500">{errors.email?.message}</p> : null}
        </div>
      </div>
      <div className="w-full">
        <Controller
          render={({field}) => (
            <Textarea
              size="lg"
              {...field}
              id="message"
              minRows={50}
              variant="flat"
              label="Your Message"
              labelPlacement="outside"
              placeholder="Message"
              radius="sm"
              classNames={{
                inputWrapper:
                  "shadow-none p-0 bg-white dark:bg-blue-charcoal dark:border-ebony-clay border",
                input: "p-4 resize-y"
              }}
              disabled={isSubmitting}
            />
          )}
          name="message"
          control={control}
          defaultValue=""
          rules={{required: "This Filed is Required"}}
        />
        {errors.message?.type ? <p className="text-red-500">{errors.message?.message}</p> : null}
      </div>
      <div className="my-flex">
        <MyButton
          type="submit"
          size="xl"
          color="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}>
          Submit
        </MyButton>
      </div>
    </form>
  )
}

const ContactUsContent = function ContactUsContent() {
  return (
    <div className="pt-4 pb-16 mx-auto">
      <div className="my-container">
        <div className="text-center rounded-lg bg-gray-100 dark:bg-mirage p-4 pt-8 bg-[url('/mask.png')] mb-6 ">
          <h1 className="heading-1 text-my-primary mb-4">CONTACT US</h1>
          <p className="body max-w-xl mx-auto">
            please feel free to contact with us for any kinds of inquiries and information. our
            support team always available to help the clients.
          </p>
        </div>
        <div className="flex items-start gap-5 flex-col-reverse lg:flex-row">
          <div className="bg-gray-100 dark:bg-mirage p-10 rounded-lg w-full lg:w-auto">
            <h2 className="heading-2 mb-4 dark:text-white">HEAD OFFICE</h2>
            <ul className="flex flex-col gap-4">
              <li className="sm:whitespace-nowrap flex gap-2">
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
          <div className="bg-gray-100 dark:bg-mirage p-10 rounded-lg flex-1 w-full lg:w-auto">
            <h2 className="heading-2 mb-4 dark:text-white">SEND US A MESSAGE</h2>
            <ContactUsForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsContent
