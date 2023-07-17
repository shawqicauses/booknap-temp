import {useRouter} from "next/router"
import {
  ReactElement,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"

interface IAuth {
  token: string | null
  signOut: () => void
  ready: boolean
}

const Auth = createContext({
  token: null,
  signOut: () => {},
  ready: false
} as IAuth)

interface IAuthProvider {
  children: ReactElement
}

const AuthProvider = function AuthProvider({
  children
}: IAuthProvider): ReactElement {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenStored = JSON.stringify(localStorage.getItem("TOKEN"))
      if (tokenStored) setToken(JSON.parse(tokenStored))
      else setToken(null)
      setReady(true)
    }
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem("TOKEN")
    setToken(null)
    router.push("/")
  }, [router])

  const value = useMemo(
    () => ({token, signOut, ready} as IAuth),
    [token, signOut, ready]
  )
  return <Auth.Provider value={value}>{children}</Auth.Provider>
}

export {Auth, AuthProvider}
