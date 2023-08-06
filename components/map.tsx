import {GoogleMap} from "@react-google-maps/api"
import {Dispatch, SetStateAction} from "react"

interface IPostion {
  lat: number
  lng: number
}

const MyGoogleMap = function MyGoogleMap({
  pos,
  setPos,
  handleClick
}: {
  pos: IPostion
  setPos: Dispatch<SetStateAction<IPostion | undefined>>
  handleClick: () => void
}) {
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
      }}
    />
  )
}

export default MyGoogleMap
