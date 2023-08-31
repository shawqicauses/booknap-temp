import type {AppProps} from "next/app"
import "../styles/globals.css"
import {NextUIProvider} from "@nextui-org/react"
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import Navbar from "../components/layout/navbar"
import {AuthProvider} from "../stores/auth"
import {CartProvider} from "../stores/cart"
import {UserProvider} from "../stores/user"
import {NotificationProvider} from "../stores/notifications"
import {CurrentBookingOrderProvider} from "../stores/current-booking-order"

const queryClient = new QueryClient()

const MyApp = function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CurrentBookingOrderProvider>
          <CartProvider>
            <UserProvider>
              <NotificationProvider>
                <NextUIProvider>
                  <div className="min-h-screen">
                    <Navbar />
                    <Component {...pageProps} />
                  </div>
                </NextUIProvider>
              </NotificationProvider>
            </UserProvider>
          </CartProvider>
        </CurrentBookingOrderProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
