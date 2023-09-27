import type {AppProps} from "next/app"
import "react-toastify/dist/ReactToastify.css"
import "../styles/globals.css"
import {NextUIProvider} from "@nextui-org/react"
import {ToastContainer} from "react-toastify"
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import Navbar from "../components/layout/navbar"
import {AuthProvider} from "../stores/auth"
import {CartProvider} from "../stores/cart"
import {UserProvider} from "../stores/user"
import {NotificationProvider} from "../stores/notifications"
import {CurrentBookingOrderProvider} from "../stores/current-booking-order"

import {ThemeProvider} from "../stores/theme"

const queryClient = new QueryClient()

const MyApp = function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <CurrentBookingOrderProvider>
            <CartProvider>
              <UserProvider>
                <NotificationProvider>
                  <NextUIProvider>
                    <div className="min-h-screen">
                      <Navbar />
                      <Component {...pageProps} />
                      <ToastContainer
                        position="bottom-left"
                        autoClose={5000}
                        limit={8}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                        theme="colored"
                      />
                    </div>
                  </NextUIProvider>
                </NotificationProvider>
              </UserProvider>
            </CartProvider>
          </CurrentBookingOrderProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
