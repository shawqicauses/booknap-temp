import type {AppProps} from "next/app"
import "../styles/globals.css"
import Navbar from "../components/navbar"
import {AuthProvider} from "../stores/auth"

const MyApp = function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}

export default MyApp
