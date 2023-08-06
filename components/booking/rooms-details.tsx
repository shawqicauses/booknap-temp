import React from "react"
import {TbAirConditioningDisabled, TbSmoking, TbWifi} from "react-icons/tb"

const icons = {
  FreeWifi: <TbWifi />,
  Conditioning: <TbAirConditioningDisabled />,
  SmokingPlace: <TbSmoking />
}

interface IRoom {
  type: string
  id: number
  details: string
  features: string[]
}
const rooms: IRoom[] = [
  {
    type: "Single",
    id: 101,
    details: "Cozy single room with a comfortable bed.",
    features: ["Free Wifi", "Conditioning"]
  },
  {
    type: "Double",
    id: 201,
    details: "Spacious double room with a king-sized bed.",
    features: ["Free Wifi", "Conditioning", "Smoking Place"]
  },
  {
    type: "Suite",
    id: 301,
    details: "Luxurious suite with a separate living area and a jacuzzi.",
    features: ["Free Wifi", "Conditioning"]
  },
  {
    type: "Twin",
    id: 401,
    details: "Twin room with two single beds.",
    features: ["Free Wifi"]
  },
  {
    type: "Family",
    id: 501,
    details: "Family room with a queen-sized bed and a bunk bed for kids.",
    features: ["Free Wifi", "Conditioning"]
  }
]

const RoomsDetails = function RoomsDetails() {
  return (
    <div className="my-container">
      {rooms.map((room) => (
        <div className="rounded-lg bg-gray-100 p-4"></div>
      ))}
    </div>
  )
}

export default RoomsDetails
