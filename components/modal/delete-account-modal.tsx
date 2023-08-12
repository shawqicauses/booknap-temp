import {Modal, ModalContent} from "@nextui-org/react"
import MyButton from "../button"

const DeleteAccountModal = function DeleteAccountModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <div className="p-10">
          <h2 className="heading-2 mb-2">Delete Account</h2>
          <p className="mb-20">Are You Sure You Want To Delete Your Account</p>

          <div className="my-flex gap-3">
            <MyButton fullWidth onClick={onClose}>
              Cancel
            </MyButton>
            <MyButton size="lg" color="danger" fullWidth>
              Delete
            </MyButton>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
export default DeleteAccountModal
