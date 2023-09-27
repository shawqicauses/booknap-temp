import {useState, useEffect} from "react"
import {NextPage} from "next"
import {useRouter} from "next/router"
import HotelPageContent from "../../../components/bookings/currant-booking"
import Footer from "../../../components/layout/footer"
import ItemPage from "../../../components/bookings/currant-booking/show-item"
import Protected from "../../../components/uis/protected"
import {useAuth} from "../../../stores/auth"
import {Datum, Test} from "../index"
import client from "../../../helpers/client"

const Booking: NextPage = function Booking() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(1)
  const [categories, setCategories] = useState<Datum[]>()
  const {token} = useAuth()
  const id = Number(router.query.id)
  useEffect(() => {
    if (router.isReady && token) {
      client(`shopping/categories?hotel_id=${id}`)?.then((res: Test) => {
        setCategories(res.data)
        setActiveTab(res?.data[0]?.id)
      })
    }
  }, [id, router, token])
  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber)
  }
  return (
    <Protected>
      <div className="my-container mb-10">
        <HotelPageContent>
          <div className="mt-5">
            <div className="flex border-b-2 border-b-gray-200">
              {categories?.map(({name, id: tabId}) => (
                <div
                  key={tabId}
                  className={`cursor-pointer px-5 py-1 ${
                    activeTab === tabId ? "border-b-2 border-b-blue-700" : ""
                  }`}
                  onClick={() => handleTabClick(tabId)}
                  aria-hidden="true">
                  {name}
                </div>
              ))}
              <div
                className={`cursor-pointer px-5 py-1 ${
                  activeTab === -1 ? "border-b-2 border-b-blue-700" : ""
                }`}
                onClick={() => handleTabClick(-1)}
                aria-hidden="true">
                Favorites
              </div>
            </div>
          </div>
        </HotelPageContent>
        <ItemPage />
      </div>
      <Footer />
    </Protected>
  )
}

export default Booking
