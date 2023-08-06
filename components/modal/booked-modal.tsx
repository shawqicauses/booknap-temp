import Image from "next/image"
import React from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"

const BookedModal = function BookedModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2 className="heading-1">Booked</h2>
        </ModalHeader>
        <ModalBody>
          <div className="flex justify-between mb-5">
            <div className="w-[50%]">
              <p>The Request Has Been Successfully Accepted</p>
            </div>
            <Image
              src="/booked.png"
              alt="img"
              fill
              className="!relative !inset-auto !w-max object-contain"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClose}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default BookedModal
