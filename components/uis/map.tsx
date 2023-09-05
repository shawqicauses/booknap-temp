import {GoogleMap, OverlayView, OverlayViewF} from "@react-google-maps/api"
import React from "react"
import {FaHotel} from "react-icons/fa"
import {IHotel} from "../../types"

interface IPosition {
  lat: number
  lng: number
}

const MyGoogleMap = function MyGoogleMap({
  pos,
  userPos,
  handleClick,
  hotels,
  MyZoom
}: {
  pos: IPosition
  userPos: IPosition
  handleClick: () => void
  hotels: Array<IHotel>
  MyZoom: number
}) {
  return (
    <GoogleMap
      zoom={18 - MyZoom}
      center={pos}
      mapContainerClassName="w-full h-full"
      options={{disableDefaultUI: true, maxZoom: 18, minZoom: 13}}
      onClick={() => {
        handleClick()
      }}>
      <OverlayViewF
        position={pos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
        <div className="w-[0] h-[0] flex items-center relative justify-center">
          <div className=" absolute w-[80px] h-[80px] bg-black/10 rounded-full" />
          {MyZoom > 1 ? (
            <div className=" absolute w-[120px] h-[120px] bg-black/10 rounded-full" />
          ) : null}
          {MyZoom > 2 ? (
            <div className=" absolute w-[160px] h-[160px] bg-black/5 rounded-full" />
          ) : null}
          {MyZoom > 3 ? (
            <div className=" absolute w-[200px] h-[200px] bg-black/5 rounded-full" />
          ) : null}
          {MyZoom > 4 ? (
            <div className=" absolute w-[240px] h-[240px] bg-black/5 rounded-full" />
          ) : null}
        </div>
      </OverlayViewF>
      <OverlayViewF
        position={userPos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
        <div className="relative flex justify-center items-center">
          <div className="absolute w-10 h-10 flex items-center justify-center bg-blue-900 rounded-full">
            <span className="text-white">ME</span>
          </div>
        </div>
      </OverlayViewF>
      {hotels.map((hotelPos) => (
        <OverlayViewF
          key={hotelPos.id}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          position={{lat: Number(hotelPos.lat), lng: Number(hotelPos.lng)}}>
          <div className="relative flex justify-center items-center">
            <div className="absolute w-16 h-16 rounded-full bg-white p-2">
              <FaHotel className="w-full h-full text-black" />
            </div>
          </div>
        </OverlayViewF>
      ))}
    </GoogleMap>
  )
}

export default React.memo(MyGoogleMap)
