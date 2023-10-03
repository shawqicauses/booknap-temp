import type {AppProps} from "next/app"
import "react-toastify/dist/ReactToastify.css"
import {NextUIProvider} from "@nextui-org/react"
import {ToastContainer} from "react-toastify"
import Navbar from "../components/layout/navbar"
import {AuthProvider} from "../stores/auth"
import {CartProvider} from "../stores/cart"
import {UserProvider} from "../stores/user"
import {NotificationProvider} from "../stores/notifications"
import {CurrentBookingOrderProvider} from "../stores/current-booking-order"
import {ThemeProvider} from "../stores/theme"
import Sidebar from "../components/uis/sidebar"
import "../styles/globals.css"
import Footer from "../components/layout/footer"

const MyApp = function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CurrentBookingOrderProvider>
          <CartProvider>
            <UserProvider>
              <NotificationProvider>
                <NextUIProvider>
                  <Navbar />
                  <Sidebar />
                  <div className="w-full">
                    <Component {...pageProps} />
                  </div>
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
                  <Footer />
                </NextUIProvider>
              </NotificationProvider>
            </UserProvider>
          </CartProvider>
        </CurrentBookingOrderProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
