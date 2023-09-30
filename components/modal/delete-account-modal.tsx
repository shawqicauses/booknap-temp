import {Modal, ModalContent} from "@nextui-org/react"
import MyButton from "../uis/button"
import {type3} from "../uis/modal-styles"
import client from "../../helpers/client"
import {useAuth} from "../../stores/auth"

const DeleteAccountModal = function DeleteAccountModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const {token, signOut} = useAuth()

  const handleDeleteAccount = async () => {
    if (token) {
      client("delete", {method: "POST"})?.then((res) => {
        if (res.success) {
          signOut()
          onClose()
        }
      })
    }
  }

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      classNames={type3}
      aria-labelledby="Delete Account Modal">
      <ModalContent>
        <div className="p-10">
          <h2 className="heading-2 mb-2 dark:text-white">Delete Account</h2>
          <p className="mb-20">Are You Sure You Want To Delete Your Account</p>

          <div className="my-flex gap-3">
            <MyButton onClick={onClose} size="xl" radius="sm" fullWidth>
              Cancel
            </MyButton>
            <MyButton
              size="xl"
              color="danger"
              radius="sm"
              fullWidth
              onClick={handleDeleteAccount}>
              Delete
            </MyButton>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
export default DeleteAccountModal
