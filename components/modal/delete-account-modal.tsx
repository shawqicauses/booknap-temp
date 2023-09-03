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
      className="bg-[#F5F5F5]"
      classNames={type3}>
      <ModalContent>
        <div className="p-10">
          <h2 className="heading-2 mb-2">Delete Account</h2>
          <p className="mb-20">Are You Sure You Want To Delete Your Account</p>

          <div className="my-flex gap-3">
            <MyButton onClick={onClose} radius="sm" fullWidth>
              Cancel
            </MyButton>
            <MyButton
              size="lg"
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
