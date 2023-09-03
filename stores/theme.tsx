import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"

interface ITheme {
  theme: string | null
  changeTheme: () => void
}

const Auth = createContext({
  theme: null,
  changeTheme: () => {}
} as ITheme)

interface IThemeProvider {
  children: ReactElement
}

const ThemeProvider = function ThemeProvider({
  children
}: IThemeProvider): ReactElement {
  const [theme, setTheme] = useState<string | null>(null)
  const [ready, setReady] = useState<boolean>(false)

  const getTheme = useCallback(() => {
    if (typeof window !== "undefined") {
      const themeStored = localStorage.getItem("THEME")
      if (themeStored) setTheme(themeStored)
      else setTheme("light")
      setReady(true)
    }
  }, [])
  useEffect(() => {
    getTheme()
  }, [getTheme])

  useEffect(() => {
    if (ready && document.body.parentElement) {
      document.body.parentElement.classList.remove(
        theme === "light" ? "dark" : "light"
      )
      document.body.parentElement.classList.add(theme!)
      localStorage.setItem("THEME", theme!)
    }
  }, [theme, ready])

  const changeTheme = useCallback(() => {
    if (theme === "light") setTheme("dark")
    else setTheme("light")
  }, [theme])

  const value = useMemo(
    () => ({theme, changeTheme} as ITheme),
    [theme, changeTheme]
  )
  return <Auth.Provider value={value}>{children}</Auth.Provider>
}
const useTheme = function useTheme() {
  const context = useContext(Auth)
  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider")
  }
  return context
}

export {useTheme, ThemeProvider}
