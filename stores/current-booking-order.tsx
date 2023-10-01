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
import {useAuth} from "./auth"
import {IListBookingHotelRes} from "../components/bookings"
import client from "../helpers/client"
import {IBooking} from "../types"

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
  currentBooking: Result | null
  ready: boolean
  handleCurrentBookingOrder: Function
  clearCurrentBookingOrder: Function
  setReady: Dispatch<SetStateAction<boolean>>
  userBookings: IBooking[] | null
  fetchUserBookings: () => void
}

const CurrentBookingOrder = createContext({
  currentBooking: null,
  ready: false,
  handleCurrentBookingOrder: () => {},
  clearCurrentBookingOrder: () => {},
  setReady: () => {},
  userBookings: [],
  fetchUserBookings: () => {}
} as ICurrentBookingOrderContext)

const CurrentBookingOrderProvider = function CurrentBookingOrderProvider({
  children
}: ICurrentBookingOrderProvider): ReactElement {
  const [currentBooking, setCurrentBooking] = useState<Result | null>(null)
  const [userBookings, setUserBookings] = useState<IBooking[] | null>(null)

  const [ready, setReady] = useState<boolean>(false)
  const {token, ready: tokenReady, signOut} = useAuth()

  const fetchUserBookings = useCallback(() => {
    if (tokenReady && token) {
      client("hotels/bookings?status=1&is_active=1", {method: "GET"})
        ?.then((res: IListBookingHotelRes) => {
          const data = res.result.data.filter((booking) => {
            const today = new Date()
            const dateFrom = new Date(booking.date_from)
            const dateTo = new Date(booking.date_to)
            if (booking.hotel && today > dateFrom && today < dateTo) return true
            return false
          })
          setUserBookings(data)
        })
        .catch(() => {
          signOut()
        })
    }
  }, [signOut, tokenReady, token])

  useEffect(() => {
    if (!token && tokenReady) {
      setReady(false)
      setCurrentBooking(null)
    } else if (token && tokenReady) {
      fetchUserBookings()
      setReady(true)
    }
  }, [token, fetchUserBookings, tokenReady])

  const handleCurrentBookingOrder = useCallback((data: Result) => {
    setCurrentBooking(data)
    setReady(true)
  }, [])

  const clearCurrentBookingOrder = useCallback(() => {
    setCurrentBooking(null)
    setReady(false)
  }, [])

  const value = useMemo(
    () =>
      ({
        currentBooking,
        ready,
        handleCurrentBookingOrder,
        clearCurrentBookingOrder,
        setReady,
        userBookings,
        fetchUserBookings
      } as ICurrentBookingOrderContext),
    [
      currentBooking,
      ready,
      handleCurrentBookingOrder,
      clearCurrentBookingOrder,
      setReady,
      userBookings,
      fetchUserBookings
    ]
  )

  return (
    <CurrentBookingOrder.Provider value={value}>
      {children}
    </CurrentBookingOrder.Provider>
  )
}
const useCurrentBookingOrder = function useCurrentBookingOrder() {
  const context = useContext(CurrentBookingOrder)
  if (!context) {
    throw new Error(
      "useCurrentBookingOrder must be used within an CurrentBookingOrderProvider"
    )
  }
  return context
}

export {useCurrentBookingOrder, CurrentBookingOrderProvider}
