/* eslint-disable camelcase */
import React, {useEffect, useState} from "react"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"
import MyButton from "../uis/button"
import {type3} from "../uis/modal-styles"
import client from "../../helpers/client"
import {useCurrentBookingOrder} from "../../stores/current-booking-order"

interface reason {
  id: number
  en_name: string
  ar_name: string
}

const CancelModal = function CancelModal({
  isOpen,
  onClose,
  openBannedModal,
  setShow
}: {
  isOpen: boolean
  onClose: () => void
  openBannedModal: () => void
  setShow: Function
}) {
  const [cancelListReason, setCancelListReason] = useState<Array<reason>>([])
  const [cancelReason, setCancelReason] = useState<number | null>(null)
  const [otherReason, setOtherReason] = useState<string>("")
  const {currentBooking, clearCurrentBookingOrder} = useCurrentBookingOrder()
  const handleCancel = async () => {
    if (
      cancelReason !== null ||
      (cancelReason === null && otherReason !== "")
    ) {
      const res = await client(`hotels/bookings/cancel/${currentBooking?.id}`, {
        body: JSON.stringify({reason: cancelReason, reason_other: otherReason}),
        method: "POST"
      })
      clearCurrentBookingOrder()
      setShow(false)
      onClose()
      if (res.banned) {
        openBannedModal()
      }
    }
  }
  useEffect(() => {
    const getData = async () => {
      const data = await client("front/reasons", {method: "GET"})
      setCancelListReason(data.result)
    }
    getData()
  }, [])
  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      className="bg-[#F5F5F5]"
      classNames={type3}>
      <ModalContent>
        <ModalHeader>
          <h1 className="heading-2 mb-2 dark:text-white">Cancel Reason</h1>
        </ModalHeader>
        <ModalBody>
          {cancelListReason.map(({id, en_name}) => (
            <MyButton
              key={id}
              color="white"
              onClick={() => setCancelReason(id)}
              className={`${
                id === cancelReason ? "border-2 border-blue-500" : ""
              }`}
              disableAnimation
              radius="full">
              {en_name}
            </MyButton>
          ))}
          <MyButton
            onClick={() => setCancelReason(null)}
            color="white"
            fullWidth
            className={`${
              cancelReason === null ? "border-2 border-blue-500" : ""
            }`}
            disableAnimation
            radius="full">
            Other
          </MyButton>
          {cancelReason === null ? (
            <div>
              <input
                value={otherReason}
                type="text"
                placeholder="Please Write The Reason To Help Us Improve"
                className="input p-3 leading-5 rounded-lg bg-white dark:bg-blue-charcoal dark:border-ebony-clay border"
                onChange={(e) => setOtherReason(e.target.value)}
              />
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <MyButton color="primary" fullWidth onClick={handleCancel}>
            Send
          </MyButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CancelModal
