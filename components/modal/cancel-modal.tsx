/* eslint-disable camelcase */
import React, {useEffect, useState} from "react"
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react"
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
    if (cancelReason !== null || (cancelReason === null && otherReason !== "")) {
      const res = await client(`hotels/bookings/cancel/${currentBooking?.id}`, {
        body: JSON.stringify({reason: cancelReason, reason_other: otherReason}),
        method: "POST"
      })
      setShow(false)
      onClose()
      if (res.banned) {
        openBannedModal()
      }
      clearCurrentBookingOrder()
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
    <Modal size="md" isOpen={isOpen} onClose={onClose} classNames={type3}>
      <ModalContent>
        <ModalHeader>
          <h1 className="heading-main-3 px-5">Cancel Reason</h1>
        </ModalHeader>
        <ModalBody>
          {cancelListReason.map(({id, en_name}) => (
            <MyButton
              key={id}
              color="gray"
              onClick={() => setCancelReason(id)}
              className={`${id === cancelReason ? "border-2 border-blue-500" : ""}`}
              disableAnimation
              radius="full">
              {en_name}
            </MyButton>
          ))}
          <MyButton
            onClick={() => setCancelReason(null)}
            color="gray"
            fullWidth
            className={`${cancelReason === null ? "border-2 border-blue-500" : ""}`}
            disableAnimation
            radius="full">
            Other
          </MyButton>

          <div
            className={`my-transition ${
              cancelReason !== null ? "!h-0 overflow-hidden" : "max-h-max"
            }`}>
            <input
              value={otherReason}
              type="text"
              placeholder="Please Write The Reason To Help Us Improve"
              className="input p-3 leading-5 rounded-lg bg-gray-100 dark:bg-blue-charcoal dark:border-ebony-clay border"
              onChange={(e) => setOtherReason(e.target.value)}
            />
          </div>
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
