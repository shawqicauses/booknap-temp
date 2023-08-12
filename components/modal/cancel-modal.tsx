import React, {useState} from "react"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"
import MyButton from "../button"

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

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h1 className="heading-2 mb-2">Cancel Reason</h1>
        </ModalHeader>
        <ModalBody>
          {reasons.map(({id, reason}) => (
            <MyButton
              key={id}
              onClick={() => setCancelReason(reason)}
              className={`${
                reason === cancelReason ? "border-2 border-blue-500" : ""
              }`}
              disableAnimation>
              {reason}
            </MyButton>
          ))}
          <MyButton
            onClick={() => setCancelReason("other")}
            fullWidth
            className={`${
              cancelReason === "other" ? "border-2 border-blue-500" : ""
            }`}
            disableAnimation>
            Other
          </MyButton>
          {cancelReason === "other" ? (
            <div>
              <input
                type="text"
                placeholder="Please Write The Reason To Help Us Improve"
                className="input p-3 leading-5 bg-white rounded-lg"
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <MyButton
            fullWidth
            onClick={() => {
              if (cancelReason !== null && cancelReason !== "other") {
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
