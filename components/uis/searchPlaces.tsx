/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, {useEffect, useState} from "react"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete"

const PlacesSuggestionInput = function PlacesSuggestionInput({
  setPosition,
  setDestination,
  startValue,
  setMapCenter
}: {
  setPosition: Function
  setDestination: Function
  startValue: string
  setMapCenter: Function
}) {
  const [openList, setOpenList] = useState(false)
  const {
    ready,
    value,
    suggestions: {status, data},
    setValue,
    clearSuggestions,
    init
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {},
    debounce: 300
  })
  init()

  const handleInput = (e: any) => {
    setDestination(e.target.value)
    setOpenList(true)
  }
  useEffect(() => {
    setValue(startValue)
  }, [startValue, setValue])

  const handleSelect = (e: any) => () => {
    setValue(e.description, false)
    setDestination(e.description)
    setOpenList(false)
    clearSuggestions()
    getGeocode({address: e.description}).then((results) => {
      const {lat, lng} = getLatLng(results[0])
      setPosition({lat: lat, lng: lng})
      setMapCenter({lat: lat, lng: lng})
    })
  }
  return (
    <div>
      <div className="relative">
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Where are you going?"
          className="input p-3 px-4 leading-5 bg-white shadow-md rounded-md w-full sm:w-[400px] dark:bg-mirage dark:border-mirage dark:text-white"
        />
        {status === "OK" && openList ? (
          <ul className="absolute bottom-[104%] left-0 overflow-y-scroll h-[200px] bg-white dark:bg-mirage z-30 flex flex-col w-full shadow-sm rounded-base divide-y-1 dark:divide-ebony-clay">
            {data.map((suggestion) => {
              const {
                place_id,
                structured_formatting: {main_text, secondary_text}
              } = suggestion

              return (
                <li
                  key={place_id}
                  onClick={handleSelect(suggestion)}
                  aria-hidden="true"
                  className="p-3 w-full flex justify-between flex-wrap cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 dark:bg-mirage">
                  <span className="heading-3 dark:text-white">{main_text}</span>
                  <span className="body">{secondary_text}</span>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default PlacesSuggestionInput
