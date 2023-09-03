import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import client from "../helpers/client"
import {useAuth} from "./auth"

interface INotification {
  id: string
  data: {title: string; details: string}
}
interface INotifications {
  notifications: Array<INotification>
  reFetch: () => {}
  ready: boolean
  clearNotifications: () => void
}

const Notifications = createContext({
  notifications: [{}],
  reFetch: () => {},
  ready: false,
  clearNotifications: () => {}
} as INotifications)

interface INotificationsProvider {
  children: ReactElement
}

const NotificationProvider = function NotificationProvider({
  children
}: INotificationsProvider): ReactElement {
  const [notifications, setNotifications] = useState<Array<INotification>>([])
  const [ready, setReady] = useState<boolean>(false)
  const {token} = useAuth()
  const reFetch = useCallback(async () => {
    setReady(false)
    client("notifications")?.then((res) => {
      setNotifications(res.result.data)
      setReady(true)
    })
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  useEffect(() => {
    if (!token) {
      clearNotifications()
    } else {
      reFetch()
    }
  }, [token, clearNotifications, reFetch])

  const value = useMemo(
    () =>
      ({notifications, reFetch, ready, clearNotifications} as INotifications),
    [notifications, reFetch, ready, clearNotifications]
  )
  return (
    <Notifications.Provider value={value}>{children}</Notifications.Provider>
  )
}
const useNotifications = function useNotifications() {
  const context = useContext(Notifications)
  if (!context) {
    throw new Error(
      "useNotifications must be used within an NotificationProvider"
    )
  }
  return context
}

export {useNotifications, NotificationProvider}
