import React from "react"
import {BiDoorOpen} from "react-icons/bi"
import {TbAirConditioningDisabled, TbSmoking, TbWifi} from "react-icons/tb"

interface IIcons {
  [key: string]: React.ReactNode
}

const icons: IIcons = {
  FreeWifi: <TbWifi className="h-6 w-6" />,
  Conditioning: <TbAirConditioningDisabled className="h-6 w-6" />,
  SmokingPlace: <TbSmoking className="h-6 w-6" />
}

const roomTypeIcon: IIcons = {
  single: <BiDoorOpen className="h-7 w-7" />,
  double: <BiDoorOpen className="h-7 w-7" />,
  suite: <BiDoorOpen className="h-7 w-7" />,
  twin: <BiDoorOpen className="h-7 w-7" />,
  family: <BiDoorOpen className="h-7 w-7" />
}

interface IRoom {
  type: string
  id: number
  details: string
  roomNumber: number
  features: string[]
}
const rooms: IRoom[] = [
  {
    type: "Single",
    id: 101,
    details:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
    roomNumber: 100,
    features: ["Free Wifi", "Conditioning"]
  },
  {
    type: "Double",
    id: 201,
    details:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
    roomNumber: 100,
    features: ["Free Wifi", "Conditioning", "Smoking Place"]
  },
  {
    type: "Suite",
    id: 301,
    details:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
    roomNumber: 100,
    features: ["Free Wifi", "Conditioning"]
  },
  {
    type: "Twin",
    id: 401,
    details:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
    roomNumber: 100,
    features: ["Free Wifi"]
  },
  {
    type: "Family",
    id: 501,
    details:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
    roomNumber: 100,
    features: ["Free Wifi", "Conditioning"]
  }
]

const RoomsDetails = function RoomsDetails() {
  return (
    <div className=" flex gap-5  flex-col">
      {rooms.map(({id, type, roomNumber, details, features}) => (
        <div className="rounded-lg p-4 bg-[#F5F5F5] dark:bg-mirage" key={id}>
          <div className="flex gap-5 mb-4">
            <div className="bg-gray-200 dark:bg-[#242E3F] p-3 rounded-lg text-[#2F5597]">
              {roomTypeIcon[type.toLowerCase()]}
            </div>
            <div>
              <h2 className="heading-3 dark:text-white">{type}</h2>
              <span className="text-gray-300 ">{roomNumber}</span>
            </div>
          </div>
          <div className="mb-3">
            <h3 className="heading-3 mb-4 dark:text-white">Details</h3>
            <p className="body-sm text-black dark:text-white">{details}</p>
          </div>
          <div>
            <h3 className="heading-3 mb-4 dark:text-white">Features</h3>
            <ul className="flex gap-10">
              {features.map((feature) => (
                <li className="flex gap-3 items-center" key={feature}>
                  <div className="p-2 bg-[#DCE2ED] rounded-lg text-[#2F5597]">
                    {icons[feature.replace(" ", "")]}
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RoomsDetails
