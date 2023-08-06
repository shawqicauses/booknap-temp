import Image from "next/image"
import React from "react"
import {IoLogoWhatsapp} from "react-icons/io"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"

const BannedModal = function BannedModal({
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
          <h1 className="heading-2 mb-6">Banned</h1>
        </ModalHeader>
        <ModalBody>
          <div className="flex justify-between mb-5">
            <div className="w-[50%]">
              <p>You Have Been Banned For Your Repeated Attempts To Book</p>
            </div>
            <Image
              src="/bad-idea.png"
              alt="img"
              fill
              className="!relative !inset-auto !w-max object-contain"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-2 justify-center w-[80%] m-auto">
            <Button isIconOnly onClick={() => {}} color="success">
              <IoLogoWhatsapp className="h-6 w-6" />
            </Button>
            <Button color="primary" onClick={onClose}>
              Ok
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BannedModal
