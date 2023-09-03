import {useRouter} from "next/router"
import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"

interface IAuth {
  token: string | null
  signIn: () => {}
  signOut: () => void
  ready: boolean
}

const Auth = createContext({
  token: null,
  signIn: () => {},
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

  const signIn = useCallback(() => {
    if (typeof window !== "undefined") {
      const tokenStored = localStorage.getItem("TOKEN")
      if (tokenStored) setToken(tokenStored)
      else setToken(null)
      setReady(true)
    }
  }, [])

  useEffect(() => {
    signIn()
  }, [signIn])

  const signOut = useCallback(() => {
    localStorage.removeItem("TOKEN")
    setToken(null)
    router.push("/")
  }, [router])

  const value = useMemo(
    () => ({token, signIn, signOut, ready} as IAuth),
    [token, signIn, signOut, ready]
  )
  return <Auth.Provider value={value}>{children}</Auth.Provider>
}
const useAuth = function useAuth() {
  const context = useContext(Auth)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export {Auth, useAuth, AuthProvider}
