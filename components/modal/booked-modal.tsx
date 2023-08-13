import Image from "next/image"
import React from "react"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"
import MyButton from "../button"
import {type3} from "../modal-styles"

const BookedModal = function BookedModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      className="bg-[#F5F5F5]"
      classNames={type3}>
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
          <MyButton color="primary" onClick={onClose} radius="sm" fullWidth>
            Done
          </MyButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default BookedModal
