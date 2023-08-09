import type {AppProps} from "next/app"
import "../styles/globals.css"
import {NextUIProvider} from "@nextui-org/react"
import Navbar from "../components/navbar"
import {AuthProvider} from "../stores/auth"
import {CartProvider} from "../stores/cart"

const MyApp = function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <NextUIProvider>
          <div className="min-h-screen">
            <Navbar />
            <Component {...pageProps} />
          </div>
        </NextUIProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default MyApp
