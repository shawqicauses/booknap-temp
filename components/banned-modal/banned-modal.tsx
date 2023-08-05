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
import Button from "../button"

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
            <Button
              icon={<IoLogoWhatsapp className="h-6 w-6" />}
              style={{type: "button-secondary", other: "!w-fit p-2 "}}
              handleClick={() => {}}
            />
            <Button
              text="Ok"
              style={{type: "button-primary", other: "w-fit"}}
              handleClick={onClose}
            />
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BannedModal
