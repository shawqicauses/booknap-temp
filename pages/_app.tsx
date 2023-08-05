import type {AppProps} from "next/app"
import "../styles/globals.css"
import {NextUIProvider} from "@nextui-org/react"
import Navbar from "../components/navbar"
import {AuthProvider} from "../stores/auth"

const MyApp = function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <NextUIProvider>
        <div className="min-h-screen">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </NextUIProvider>
    </AuthProvider>
  )
}

export default MyApp
