/* eslint-disable camelcase */
import React, {useEffect, useState} from "react"
import {BiDoorOpen} from "react-icons/bi"
import {useRouter} from "next/router"
import {TbAirConditioningDisabled, TbSmoking, TbWifi} from "react-icons/tb"
import client from "../../../helpers/client"
import {RoomDetails, res} from "./index"
import LoadingDiv from "../../uis/loading"

const RoomsDetails = function RoomsDetails() {
  const router = useRouter()
  const id = Number(router.query.id)
  const [rooms, setRooms] = useState<RoomDetails[]>()
  useEffect(() => {
    if (id > -1) {
      client(`hotels/bookings/show/${id}`)?.then((response: res) => {
        setRooms(response.result.rooms_details)
      })
    }
  }, [id])

  if (rooms) {
    return (
      <div className=" flex gap-5  flex-col">
        {rooms.map(({id: roomId, name_en, number, details_en, features}) => (
          <div
            className="rounded-lg p-4 bg-[#F5F5F5] dark:bg-mirage"
            key={roomId}>
            <div className="flex gap-5 mb-4">
              <div className="bg-gray-200 dark:bg-[#242E3F] p-3 rounded-lg text-[#2F5597]">
                <BiDoorOpen className="h-7 w-7" />
              </div>
              <div>
                <h2 className="heading-3 dark:text-white">{name_en}</h2>
                <span className="text-gray-300 ">{number}</span>
              </div>
            </div>
            <div className="mb-3">
              <h3 className="heading-3 mb-4 dark:text-white">Details</h3>
              <p className="body-sm text-black dark:text-white">{details_en}</p>
            </div>
            <div>
              <h3 className="heading-3 mb-4 dark:text-white">Features</h3>
              <ul className="flex gap-10">
                {features.f1 ? (
                  <li className="flex gap-3 items-center">
                    <div className="p-2 bg-[#DCE2ED] rounded-lg text-[#2F5597]">
                      <TbWifi className="h-6 w-6" />
                    </div>
                    <span>Free Wifi</span>
                  </li>
                ) : null}
                {features.f2 ? (
                  <li className="flex gap-3 items-center">
                    <div className="p-2 bg-[#DCE2ED] rounded-lg text-[#2F5597]">
                      <TbAirConditioningDisabled className="h-6 w-6" />
                    </div>
                    <span>Conditioning</span>
                  </li>
                ) : null}
                {features.f3 ? (
                  <li className="flex gap-3 items-center">
                    <div className="p-2 bg-[#DCE2ED] rounded-lg text-[#2F5597]">
                      <TbSmoking className="h-6 w-6" />
                    </div>
                    <span>Free Wifi</span>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return <LoadingDiv />
}

export default RoomsDetails
