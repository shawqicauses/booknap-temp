/* eslint-disable import/no-unresolved */
import {Modal, ModalBody, ModalContent} from "@nextui-org/react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Autoplay} from "swiper/modules"
import {Rating} from "@mui/material"
import {AiFillStar} from "react-icons/ai"
import Image from "next/image"
import "swiper/css"
import "swiper/css/pagination"
import {FaUsers} from "react-icons/fa"
import {LuMail} from "react-icons/lu"
import {noPadding} from "../uis/modal-styles"
import {Hotel} from "../../types"

const HotelPageModal = function HotelPageModal({
  isOpen,
  onClose,
  hotel
}: {
  isOpen: boolean
  onClose: () => void
  hotel: Hotel
}) {
  return (
    <Modal
      backdrop="transparent"
      isOpen={isOpen}
      onClose={onClose}
      radius="lg"
      classNames={noPadding}>
      <ModalContent>
        <ModalBody>
          <div>
            <div className="relative w-auto min-h-[200px]">
              <div className="flex gap-3  absolute bottom-3 left-4 z-10">
                <Image
                  src={hotel.logo}
                  alt={hotel.name}
                  className="!relative !w-20 !h-20 object-contain"
                  fill
                />
                <div>
                  <h2 className="heading-2 mb-3 text-white">{hotel.name}</h2>
                  <Rating
                    name="read-only"
                    value={hotel?.stars}
                    className="text-blue-700"
                    readOnly
                    style={{color: "#2F5597"}}
                    size="small"
                    icon={<AiFillStar className="text-inherit" />}
                    emptyIcon={<AiFillStar className="text-inherit" />}
                  />
                </div>
              </div>
              <Swiper
                slidesPerView={1}
                autoplay={{
                  delay: 3000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false
                }}
                modules={[Autoplay]}>
                {hotel?.banner ? (
                  <SwiperSlide>
                    <div className="relative w-full h-[200px]">
                      <Image
                        src={`https://booknap-api.wpgooal.com/${hotel?.banner}`}
                        alt="Web Application"
                        fill
                        className="!relative !inset-auto !rounded-lg w-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 z-10 bg-gradient-to-t from-black w-full h-full" />
                    </div>
                  </SwiperSlide>
                ) : null}
              </Swiper>
            </div>
            <div className="bg-white p-4">
              <div className="flex gap-4">
                <FaUsers className="w-5 h-5 text-my-primary" />
                <span className="heading-3 text-xl-2">About Us</span>
              </div>
              <p className="body-sm text-black">{hotel?.about}</p>
            </div>
            <div className="bg-white p-4 body-sm text-black">
              <div className="flex gap-4 items-center mb-2">
                <LuMail className="w-5 h-5 text-my-primary" />
                <span className="heading-3 text-xl-2">Contact</span>
              </div>
              <div className="mb-4">{hotel?.address}</div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between gap-3">
                  <span>Phone:</span>
                  <a
                    href={`https://wa.me/${hotel.phone.replaceAll(" ", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500">
                    {hotel?.phone}
                  </a>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Website:</span>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`http://${hotel?.website}`}
                    className="text-blue-500">
                    View Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default HotelPageModal
