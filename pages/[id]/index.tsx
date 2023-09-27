import {NextPage} from "next"
import {useState, useEffect} from "react"
import {useRouter} from "next/router"
import HotelPageContent from "../../components/bookings/currant-booking"
import Footer from "../../components/layout/footer"
import Booking from "../../components/bookings/currant-booking/booking"
import Protected from "../../components/uis/protected"
import About from "../../components/bookings/currant-booking/about"
import RoomsDetails from "../../components/bookings/currant-booking/rooms-details"
import LoadingDiv from "../../components/uis/loading"
import {useAuth} from "../../stores/auth"
import client from "../../helpers/client"
import Shop from "../../components/bookings/currant-booking/shop"

const tabs = [<Booking />, <RoomsDetails />, <Shop />, <About />]

export interface Datum {
  id: number
  name: string
  slug: string
  shopping_store_id: null
  description: string
  image: null
  created_at: string
  updated_at: string
  deleted_at: null
  hotel_id: number
}
export interface Test {
  message: string
  data: Datum[]
}

const BookingData: NextPage = function BookingData() {
  const router = useRouter()
  const {tab, shopTab} = router.query
  const [categories, setCategories] = useState<Datum[]>()
  const {token} = useAuth()
  const id = Number(router.query.id)
  useEffect(() => {
    if (router.isReady && token) {
      client(`shopping/categories?hotel_id=${id}`)?.then((res: Test) => {
        setCategories(res.data)
      })
    }
  }, [id, router, token])
  if (!shopTab && router.isReady && categories?.length) {
    router.push(`${id}/?tab=2&shopTab=${categories[0].id}`)
  }

  return (
    <Protected>
      <div className="my-container mb-10">
        <HotelPageContent>
          {tab === "2" ? (
            <div className="mt-5">
              <div className="flex border-b-2 border-b-gray-200">
                {categories?.map(({name, id: tabId}) => (
                  <div
                    key={tabId}
                    className={`cursor-pointer px-5 py-1 ${
                      Number(shopTab) === tabId
                        ? "border-b-2 border-b-blue-700"
                        : ""
                    }`}
                    onClick={() => router.push(`${id}/?tab=2&shopTab=${tabId}`)}
                    aria-hidden="true">
                    {name}
                  </div>
                ))}
                <div
                  className={`cursor-pointer px-5 py-1 ${
                    Number(shopTab) === -1 ? "border-b-2 border-b-blue-700" : ""
                  }`}
                  onClick={() => {
                    router.push(`${id}/?tab=2&shopTab=${-1}`)
                  }}
                  aria-hidden="true">
                  Favorites
                </div>
              </div>
            </div>
          ) : null}
        </HotelPageContent>
        {router.isReady ? tabs[Number(tab) || 0] : <LoadingDiv />}
      </div>
      <Footer />
    </Protected>
  )
}

export default BookingData
