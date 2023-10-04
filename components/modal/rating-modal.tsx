import React, {useState} from "react"
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react"
import {toast} from "react-toastify"
import {AiFillStar} from "react-icons/ai"
import {Rating} from "@mui/material"
import MyButton from "../uis/button"
import client from "../../helpers/client"
import {useUser} from "../../stores/user"
import {type3} from "../uis/modal-styles"

const RatingModal = function RatingModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [rating, setRating] = useState<number>(5)
  const [massage, setMassage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {setHotelRating} = useUser()
  const {hotelRating} = useUser()

  const handleClick = async () => {
    setIsLoading(true)
    const respond: any = await client("front/reviews/create", {
      method: "POST",
      body: JSON.stringify({
        type: "hotel",
        ref_id: hotelRating?.hotel_id,
        stars: rating,
        comment: massage
      })
    })

    if (respond.success) {
      toast.success("Review Done successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
      setHotelRating(null)
      onClose()
    } else {
      toast.error("Try Again", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored"
      })
    }
    setIsLoading(false)
  }

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={false}
      classNames={{...type3, closeButton: "hidden"}}>
      <ModalContent>
        <ModalHeader className="px-5 pb-2 pt-5">
          <h1 className="heading-2 mx-auto dark:text-white">Thank You</h1>
        </ModalHeader>
        <ModalBody className="px-5 py-0 pb-2">
          <div className="flex flex-col gap-2 items-center">
            <p className="text-center">
              The <span className="font-semi-bold">{hotelRating?.hotel.name}</span> Reservation
              Period has Expired
            </p>
            <Rating
              value={rating}
              size="large"
              onChange={(_, newValue) => {
                setRating(newValue || rating)
              }}
              icon={<AiFillStar className="text-inherit" />}
              emptyIcon={<AiFillStar className="text-inherit" />}
            />
            <textarea
              id="massage"
              placeholder="Write Your Massage"
              value={massage || ""}
              onChange={(e) => {
                setMassage(e.target.value)
              }}
              className="input p-3 leading-5 bg-gray-100 rounded-xl resize-none dark:bg-mirage dark:text-white"
            />
          </div>
        </ModalBody>
        <ModalFooter className="px-5 py-0 pb-5">
          <div className="flex justify-center items-center m-auto">
            <MyButton
              color="primary"
              size="xl"
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={handleClick}
              radius="sm"
              className="flex-1 px-10 text-lg">
              Send
            </MyButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RatingModal
