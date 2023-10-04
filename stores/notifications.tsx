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
  reFetch: () => void
  ready: boolean
  clearNotifications: () => void
  unReadMassages: number
  handleReadMassage: () => void
}

const Notifications = createContext({
  notifications: [{}],
  reFetch: () => {},
  ready: false,
  clearNotifications: () => {},
  unReadMassages: 0,
  handleReadMassage: () => {}
} as INotifications)

interface INotificationsProvider {
  children: ReactElement
}

const NotificationProvider = function NotificationProvider({
  children
}: INotificationsProvider): ReactElement {
  const [notifications, setNotifications] = useState<Array<INotification>>([])
  const [unReadMassages, setUnReadMassages] = useState<number>(0)
  const [ready, setReady] = useState<boolean>(false)
  const {token, ready: tokenReady} = useAuth()
  const reFetch = useCallback(async () => {
    setReady(false)
    if (tokenReady && token) {
      await client("notifications")?.then((res) => {
        setNotifications(res.result.data)
        setUnReadMassages(res.unread)
        setReady(true)
      })
    }
  }, [tokenReady, token])

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

  const handleReadMassage = useCallback(() => {
    setUnReadMassages(0)
  }, [])

  const value = useMemo(
    () =>
      ({
        notifications,
        reFetch,
        ready,
        clearNotifications,
        unReadMassages,
        handleReadMassage
      } as INotifications),
    [notifications, reFetch, ready, clearNotifications, unReadMassages, handleReadMassage]
  )
  return <Notifications.Provider value={value}>{children}</Notifications.Provider>
}
const useNotifications = function useNotifications() {
  const context = useContext(Notifications)
  if (!context) {
    throw new Error("useNotifications must be used within an NotificationProvider")
  }
  return context
}

export {useNotifications, NotificationProvider}
