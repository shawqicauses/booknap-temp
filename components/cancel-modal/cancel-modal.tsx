import React, {useState} from "react"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"
import Button from "../button"

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
              text={r.reason}
              style={{
                type: "button-white",
                other: "rounded-full w-full text-center text-black"
              }}
              handleClick={() => setReason(r.reason)}
            />
          ))}
          <Button
            text="Other"
            style={{
              type: "button-white",
              other: "rounded-full w-full text-center text-black"
            }}
            handleClick={() => setReason("other")}
          />
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
            text="Send"
            style={{type: "button-primary", other: "w-full"}}
            handleClick={() => {
              onClose()
              openBannedModal()
            }}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CancelModal
