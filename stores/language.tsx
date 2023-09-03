// DONE REVIEWING: GITHUB COMMIT 🛠️
import {useRouter} from "next/router"
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import useFetch from "../hooks/use-fetch"
import {ILanguageAPI, ILocalesAPI} from "../types"

/* eslint no-unused-vars: "off" */
export interface ILanguage {
  languages: ILanguageAPI[] | null
  languagesError: Error | undefined
  language: string | null
  setLanguage: Dispatch<SetStateAction<string | null>>
  langid: number | null
  setLangid: Dispatch<SetStateAction<number | null>>
  direction: number | null
  setDirection: Dispatch<SetStateAction<string | null>>
  locales: ILocalesAPI<ILocalesAPI<string>> | null
  localesError: Error | undefined
  t: (key: string) => string | null
}

export const Language = createContext({
  languages: null,
  language: null,
  setLanguage: (language: string) => {},
  langid: null,
  setLangid: (id: number) => {},
  direction: null,
  setDirection: (id: string) => {},
  locales: null,
  t: (key: string) => {}
} as ILanguage)

interface ILanguageProvider {
  children: ReactElement
}

export const LanguageProvider = function LanguageProvider({
  children
}: ILanguageProvider): ReactElement {
  const router = useRouter()
  const [languages, setLanguages] = useState<ILanguageAPI[] | null>(null)
  const [language, setLanguageState] = useState<string | null>(null)
  const [langid, setLangid] = useState<number | null | undefined>(null)
  const [direction, setDirection] = useState<string | null | undefined>(null)
  const [locales, setLocales] = useState<ILocalesAPI<ILocalesAPI<string>> | null>(null)

  const {data: languagesData, error: languagesError} = useFetch<{data: ILanguageAPI[]}>(
    "/locales/langs"
  )

  const {data: localesData, error: localesError} = useFetch<ILocalesAPI<ILocalesAPI<string>>>(
    language ? `/locales/lang/${language}` : ""
  )

  const setLanguage = useCallback(
    (languageSelected: string) => {
      setLanguageState(languageSelected)
      languages?.forEach((languageElement) => {
        if (languageElement.shortname === languageSelected) {
          setLangid(languageElement.id)
          setDirection(languageElement.direction)
          document.documentElement.dir = languageElement.direction
          localStorage.setItem("LANGUAGE", languageElement.shortname)
          router.query.locale = languageElement.shortname
          router.push(router)
        }
      })
    },
    [router, languages]
  )

  const t = useCallback(
    (key: string) => {
      const [file, value] = key.split(".")
      let translation: string | null = null

      if (locales)
        Object.keys(locales).forEach((localeFile) => {
          if (file === localeFile) {
            Object.keys(locales[localeFile]).forEach((localeValue) => {
              if (value === localeValue) {
                translation = locales[localeFile][localeValue]
              }
            })
          }
        })

      if (translation) return translation
      return key
    },
    [locales]
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      const languageStored = localStorage.getItem("LANGUAGE")
      if (router.query.locale && typeof router.query.locale === "string") {
        if (router.query.locale !== languageStored) setLanguage(router.query.locale)
        return
      }

      if (languageStored) setLanguage(languageStored)
      else setLanguage("en")
    }
  }, [router.query.locale, setLanguage])

  useEffect(() => {
    if (languagesData) setLanguages(languagesData.data)
  }, [languagesData])

  useEffect(() => {
    if (localesData) {
      setLocales(localesData)
      setLangid(languages?.find((languageItem) => languageItem.shortname === language)?.id)
      setDirection(
        languages?.find((languageItem) => languageItem.shortname === language)?.direction
      )
    }
  }, [languages, language, localesData])

  const value = useMemo(
    () =>
      ({
        languages,
        languagesError,
        language,
        setLanguage,
        langid,
        setLangid,
        direction,
        setDirection,
        locales,
        localesError,
        t
      } as ILanguage),
    [
      languages,
      languagesError,
      language,
      setLanguage,
      langid,
      setLangid,
      direction,
      setDirection,
      locales,
      localesError,
      t
    ]
  )

  return <Language.Provider value={value}>{children}</Language.Provider>
}
