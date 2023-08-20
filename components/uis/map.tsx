import {GoogleMap, Marker} from "@react-google-maps/api"
import React, {Dispatch, SetStateAction} from "react"

interface IPostion {
  lat: number
  lng: number
}

const MyGoogleMap = function MyGoogleMap({
  pos,
  setPos,
  handleClick,
  hotels
}: {
  pos: IPostion
  setPos: Dispatch<SetStateAction<IPostion | undefined>>
  handleClick: () => void
  hotels: Array<IPostion>
}) {
  console.log(hotels)

  return (
    <GoogleMap
      zoom={10}
      center={pos}
      mapContainerClassName="w-full h-full"
      onClick={(e) => {
        handleClick()
        setPos({
          lat: e.latLng?.lat() ?? pos.lat,
          lng: e.latLng?.lng() ?? pos.lng
        })
      }}>
      {hotels.map((hotelPos) => (
        <Marker position={hotelPos} />
      ))}
    </GoogleMap>
  )
}

export default React.memo(MyGoogleMap)
