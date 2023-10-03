import React from "react"
import {Input, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react"
import {toast} from "react-toastify"
import {SubmitHandler, useForm} from "react-hook-form"
import MyButton from "../uis/button"
import {type3} from "../uis/modal-styles"
import client from "../../helpers/client"

interface IRenewForm {
  to_date: string
  to_time: string
}

const RenewBookingModal = function RenewBookingModal({
  isOpen,
  onClose,
  bookingId,
  fromDate,
  toDate,
  toTime
}: {
  isOpen: boolean
  onClose: () => void
  bookingId: number
  fromDate: string
  toDate: string
  toTime: string
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {isSubmitting}
  } = useForm<IRenewForm>({
    defaultValues: {
      to_date: "",
      to_time: "02:00"
    },
    criteriaMode: "all"
  })
  const onSubmit: SubmitHandler<IRenewForm> = async (formData: IRenewForm) => {
    const res: any = await client("hotels/bookings/renew", {
      method: "POST",
      body: JSON.stringify({
        to_date: `${formData.to_date} ${formData.to_time}`,
        booking_id: bookingId
      })
    })
    if (res.success) {
      toast.success("Done Successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
    } else {
      toast.success("Something go wrong", {
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
    onClose()
    reset()
  }

  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose} classNames={type3}>
      <ModalContent>
        <ModalHeader>
          <h2 className="heading-main-3 dark:text-white">Renew Your Booking</h2>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between flex-col !gap-2 pb-5  w-full">
              <label htmlFor="date" className="w-[60px] dark:text-white">
                Date
              </label>
              <div className="my-flex gap-2">
                <label htmlFor="date" className="w-[60px] label dark:text-white">
                  From
                </label>
                <Input
                  type="date"
                  value={fromDate}
                  isDisabled
                  variant="flat"
                  classNames={{
                    inputWrapper: "shadow-none",
                    input: "dark:text-white"
                  }}
                />
              </div>
              <div className="my-flex gap-2">
                <label htmlFor="date" className="w-[60px] label dark:text-white">
                  To
                </label>
                <Input
                  type="date"
                  value={watch().to_date}
                  {...register("to_date", {
                    required: true,
                    min: toDate
                  })}
                  variant="flat"
                  classNames={{
                    inputWrapper: "shadow-none",
                    input: "dark:text-white"
                  }}
                />
              </div>
              <label htmlFor="date" className="w-[60px] dark:text-white">
                Time
              </label>
              <div className="my-flex gap-2">
                <label htmlFor="date" className="w-[60px] label dark:text-white">
                  To:
                </label>
                <Input
                  type="time"
                  value={watch().to_time}
                  {...register("to_time", {
                    required: true,
                    min: toTime
                  })}
                  variant="flat"
                  classNames={{
                    inputWrapper: "shadow-none",
                    input: "dark:text-white"
                  }}
                />
              </div>
            </div>
            <div className="w-[50%] mx-auto">
              <MyButton
                type="submit"
                color="primary"
                radius="sm"
                fullWidth
                isLoading={isSubmitting}>
                Renew
              </MyButton>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default RenewBookingModal
