import React, {useState} from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"

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
  const [reason, setReason] = useState<string | null>(null)

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h1 className="heading-2 mb-2">Cancel Reason</h1>
        </ModalHeader>
        <ModalBody>
          {reasons.map((r) => (
            <Button
              key={r.id}
              onClick={() => setReason(r.reason)}
              className={`${
                reason === r.reason ? "border-2 border-blue-500" : ""
              }`}
              disableAnimation>
              {r.reason}
            </Button>
          ))}
          <Button
            onClick={() => setReason("other")}
            fullWidth
            className={`${
              reason === "other" ? "border-2 border-blue-500" : ""
            }`}
            disableAnimation>
            Other
          </Button>
          {reason === "other" ? (
            <div>
              <input
                type="text"
                placeholder="Please Write The Reason To Help Us Improve"
                className="input p-3 leading-5 bg-white rounded-lg"
              />
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button
            fullWidth
            onClick={() => {
              onClose()
              openBannedModal()
            }}>
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CancelModal
