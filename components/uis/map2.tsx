import {useState, useCallback} from "react"
import {GoogleMapsProvider} from "@ubilabs/google-maps-react-hooks"
import {MarkerClusterer} from "@googlemaps/markerclusterer"
import BoundingSuperClusterAlgorithm from "../../utils/superClusterAlgorithm"
import {IHotel} from "../../types"

const mapOptions = {
  zoom: 12,
  center: {
    lat: 43.68,
    lng: -79.43
  }
}
const addMarkers = (map: google.maps.Map, hotels: Array<IHotel>) => {
  const infoWindow = new google.maps.InfoWindow()

  const markers = hotels.map(({name, lat: lats, lng: lngs}) => {
    const lat = Number(lats)
    const lng = Number(lngs)

    const marker = new google.maps.Marker({position: {lat, lng}})

    marker.addListener("click", () => {
      infoWindow.setPosition({lat, lng})
      infoWindow.setContent(`
        <div class="info-window">
          <h2>${name}</h2>
        </div>
      `)
      infoWindow.open({map})
    })

    return marker
  })

  // eslint-disable-next-line no-new
  new MarkerClusterer({
    markers,
    map,
    algorithm: new BoundingSuperClusterAlgorithm({radius: 200})
  })
}

const Map2 = function Map2({hotels}: {hotels: Array<IHotel>}) {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>()
  const onLoad = useCallback(
    (map: google.maps.Map) => addMarkers(map, hotels),
    [hotels]
  )

  return (
    <GoogleMapsProvider
      googleMapsAPIKey={process.env.NEXT_PUBLIC_MAP_API_KEY!}
      mapOptions={mapOptions}
      mapContainer={mapContainer}
      onLoadMap={onLoad}>
      <div ref={(node) => setMapContainer(node)} style={{height: "100vh"}} />
    </GoogleMapsProvider>
  )
}

export default Map2
