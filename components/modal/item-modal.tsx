import {Modal, ModalBody, ModalContent} from "@nextui-org/react"
import React from "react"
import ItemPage from "../bookings/currant-booking/show-item"
import {type3} from "../uis/modal-styles"

const ItemModal = function ItemModal({
  itemId,
  isOpen,
  onClose
}: {
  itemId: number
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{...type3, base: "w-[800px] max-w-2xl m-1 p-5", body: `${type3.body} !p-0`}}
      scrollBehavior="outside">
      <ModalContent>
        <ModalBody className="px-5 py-0 pb-2 ">
          <ItemPage id={itemId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ItemModal
