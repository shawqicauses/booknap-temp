import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import {HotelRating, IProfileRes, IUser} from "../types"
import client from "../helpers/client"
import {useAuth} from "./auth"
import {useCurrentBookingOrder} from "./current-booking-order"

interface IUserContext {
  user: IUser | null
  ready: boolean
  handleUser: Function
  getData: () => void
  hotelRating: HotelRating | null
  setHotelRating: Function
}

const User = createContext({
  user: null,
  ready: false,
  handleUser: () => {},
  getData: () => {},
  hotelRating: null,
  setHotelRating: () => {}
} as IUserContext)

interface IAuthProvider {
  children: ReactElement
}

const UserProvider = function UserProvider({children}: IAuthProvider): ReactElement {
  const [user, setUser] = useState<IUser | null>(null)
  const [hotelRating, setHotelRating] = useState<any>()

  const [ready, setReady] = useState<boolean>(false)
  const {token, signOut} = useAuth()
  const {handleCurrentBookingOrder} = useCurrentBookingOrder()

  const getData = useCallback(async () => {
    if (token) {
      await client("profile", {method: "GET"})
        ?.then((res: IProfileRes) => {
          if (res.success) {
            setUser(res.user)
            if (res.has_booking && res.booking.status === 0) {
              handleCurrentBookingOrder(res.booking)
            }
            setHotelRating(res.hotel_rating)
          }
          setReady(true)
        })
        .catch(() => {
          signOut()
        })
    }
  }, [handleCurrentBookingOrder, signOut, token])

  useEffect(() => {
    if (!token) {
      setUser(null)
    }
    if (user) {
      setReady(true)
    } else if (!user && token) {
      setReady(false)
      getData()
    }
  }, [user, token, getData])

  const handleUser = useCallback(
    (u: IUser) => {
      setReady(false)
      setUser(u)
      setReady(true)
    },
    [setUser]
  )

  const value = useMemo(
    () =>
      ({
        user,
        ready,
        handleUser,
        getData,
        hotelRating,
        setHotelRating
      } as IUserContext),
    [user, ready, handleUser, getData, hotelRating, setHotelRating]
  )
  return <User.Provider value={value}>{children}</User.Provider>
}
const useUser = function useUser() {
  const context = useContext(User)
  if (!context) {
    throw new Error("useUser must be used within an UserProvider")
  }
  return context
}
export {useUser, UserProvider}
