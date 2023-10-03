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
      classNames={{...type3, base: "w-[900px] max-w-2xl m-0 p-0", body: `${type3.body} !px-0`}}>
      <ModalContent>
        <ModalBody className="px-5 py-0 pb-2 ">
          <ItemPage id={itemId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ItemModal
