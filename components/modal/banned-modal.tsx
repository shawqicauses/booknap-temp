import Image from "next/image"
import React from "react"
import {IoLogoWhatsapp} from "react-icons/io"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"
import MyButton from "../button"

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
          <div className="flex w-full gap-2">
            <MyButton
              isIconOnly
              onClick={() => {}}
              color="primary2"
              radius="sm">
              <IoLogoWhatsapp className="!h-6 !w-6" />
            </MyButton>
            <MyButton
              color="primary"
              onClick={onClose}
              radius="sm"
              fullWidth
              className="flex-1">
              ok
            </MyButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BannedModal
