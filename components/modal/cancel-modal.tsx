import React, {useState} from "react"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"
import MyButton from "../uis/button"
import {type3} from "../uis/modal-styles"

const reasons = [
  {id: 1, reason: "I Changed My Mind"},
  {id: 2, reason: "I No Longer Need Offers"},
  {id: 3, reason: "I Did Not Find Suitable Offers"}
]

const CancelModal = function CancelModal({
  isOpen,
  onClose,
  openBannedModal
}: {
  isOpen: boolean
  onClose: () => void
  openBannedModal: () => void
}) {
  const [cancelReason, setCancelReason] = useState<string | null>(null)
  const [otherReason, setOtherReason] = useState<string>("")
  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      className="bg-[#F5F5F5]"
      classNames={type3}>
      <ModalContent>
        <ModalHeader>
          <h1 className="heading-2 mb-2">Cancel Reason</h1>
        </ModalHeader>
        <ModalBody>
          {reasons.map(({id, reason}) => (
            <MyButton
              key={id}
              color="white"
              onClick={() => setCancelReason(reason)}
              className={`${
                reason === cancelReason ? "border-2 border-blue-500" : ""
              }`}
              disableAnimation
              radius="full">
              {reason}
            </MyButton>
          ))}
          <MyButton
            onClick={() => setCancelReason("other")}
            color="white"
            fullWidth
            className={`${
              cancelReason === "other" ? "border-2 border-blue-500" : ""
            }`}
            disableAnimation
            radius="full">
            Other
          </MyButton>
          {cancelReason === "other" ? (
            <div>
              <input
                value={otherReason}
                type="text"
                placeholder="Please Write The Reason To Help Us Improve"
                className="input p-3 leading-5 bg-white rounded-lg"
                onChange={(e) => setOtherReason(e.target.value)}
              />
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <MyButton
            color="primary"
            fullWidth
            onClick={() => {
              if (
                (cancelReason !== null && cancelReason !== "other") ||
                (cancelReason === "other" && otherReason !== "")
              ) {
                onClose()
                openBannedModal()
              }
            }}>
            Send
          </MyButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CancelModal
