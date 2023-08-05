import {GoogleMap} from "@react-google-maps/api"
import {useMemo} from "react"

const MyGoogleMap = function MyGoogleMap({
  lat,
  lng,
  handleClick
}: {
  lat: number
  lng: number
  handleClick: () => void
}) {
  const center = useMemo(() => ({lat: lat, lng: lng}), [lat, lng])

  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerClassName="w-full h-full"
      onClick={handleClick}
    />
  )
}

export default MyGoogleMap
