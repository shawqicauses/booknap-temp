import type {AppProps} from "next/app"
import "../styles/globals.css"
import Navbar from "../components/navbar"

const MyApp = function MyApp({Component, pageProps}: AppProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
