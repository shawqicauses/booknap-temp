import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import {Auth} from "./auth"

export interface Result {
  date_from: string
  date_to: string
  lat: number
  lng: number
  distance: number
  children: number
  adults: number
  notes: null | string
  country_id: number
  city_id: number
  user_id: number
  rooms: string
  updated_at: string
  created_at: string
  id: number
}

interface ICurrentBookingOrderProvider {
  children: ReactElement
}

interface ICurrentBookingOrderContext {
  result: Result | null
  ready: boolean
  handleCurrentBookingOrder: Function
  clearCurrentBookingOrder: Function
  setReady: Dispatch<SetStateAction<boolean>>
}

const CurrentBookingOrder = createContext({
  result: null,
  ready: false,
  handleCurrentBookingOrder: () => {},
  clearCurrentBookingOrder: () => {},
  setReady: () => {}
} as ICurrentBookingOrderContext)

const CurrentBookingOrderProvider = function CurrentBookingOrderProvider({
  children
}: ICurrentBookingOrderProvider): ReactElement {
  const [result, setResult] = useState<Result | null>(null)
  const [ready, setReady] = useState<boolean>(false)
  const {token} = useContext(Auth)

  useEffect(() => {
    if (!token) {
      setReady(false)
      setResult(null)
    }
  }, [token])

  const handleCurrentBookingOrder = useCallback((data: Result) => {
    setResult(data)
    setReady(true)
  }, [])

  const clearCurrentBookingOrder = useCallback(() => {
    setResult(null)
    setReady(false)
  }, [])

  const value = useMemo(
    () =>
      ({
        result,
        ready,
        handleCurrentBookingOrder,
        clearCurrentBookingOrder,
        setReady
      } as ICurrentBookingOrderContext),
    [
      result,
      ready,
      handleCurrentBookingOrder,
      clearCurrentBookingOrder,
      setReady
    ]
  )

  return (
    <CurrentBookingOrder.Provider value={value}>
      {children}
    </CurrentBookingOrder.Provider>
  )
}

export {CurrentBookingOrder, CurrentBookingOrderProvider}
