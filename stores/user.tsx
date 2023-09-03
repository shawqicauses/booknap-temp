import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import {IProfileRes, IUser} from "../types"
import client from "../helpers/client"
import {useAuth} from "./auth"
import {useCurrentBookingOrder} from "./current-booking-order"

interface IUserContext {
  user: IUser | null
  ready: boolean
  handleUser: Function
  getData: () => void
}

const User = createContext({
  user: null,
  ready: false,
  handleUser: () => {},
  getData: () => {}
} as IUserContext)

interface IAuthProvider {
  children: ReactElement
}

const UserProvider = function UserProvider({
  children
}: IAuthProvider): ReactElement {
  const [user, setUser] = useState<IUser | null>(null)
  const [ready, setReady] = useState<boolean>(false)
  const {token} = useAuth()
  const {handleCurrentBookingOrder} = useCurrentBookingOrder()
  const getData = useCallback(async () => {
    client("profile", {method: "GET"})?.then((res: IProfileRes) => {
      if (res.success) {
        setUser(res.user)
        if (res.has_booking && res.booking.status === 0) {
          handleCurrentBookingOrder(res.booking)
        }
      }
      setReady(true)
    })
  }, [handleCurrentBookingOrder])

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
    () => ({user, ready, handleUser, getData} as IUserContext),
    [user, ready, handleUser, getData]
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
