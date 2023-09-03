import {useState} from "react"
import {NextPage} from "next"
import Sidebar from "../../../components/uis/sidebar"
import HotelPageContent from "../../../components/bookings/currant-booking"
import Shop from "../../../components/bookings/currant-booking/shop"
import Footer from "../../../components/layout/footer"
import Protected from "../../../components/uis/protected"

const shopTabs = ["restaurant", "clothes", "favorite"]

const Booking: NextPage = function Booking() {
  const [activeTab, setActiveTab] = useState(1)

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber)
  }
  return (
    <Protected>
      <div className="flex">
        <Sidebar />
        <div className="my-container">
          <HotelPageContent>
            <div className="mt-5">
              <div className="flex border-b-2 border-b-gray-200">
                <div
                  className={`cursor-pointer px-4 py-2 ${
                    activeTab === 1 ? "border-b-2 border-b-blue-700" : ""
                  }`}
                  onClick={() => handleTabClick(1)}
                  aria-hidden="true">
                  Restaurant
                </div>
                <div
                  className={`cursor-pointer px-4 py-2 ${
                    activeTab === 2 ? "border-b-2 border-b-blue-700" : ""
                  }`}
                  onClick={() => handleTabClick(2)}
                  aria-hidden="true">
                  Clothes
                </div>
                <div
                  className={`cursor-pointer px-4 py-2 ${
                    activeTab === 3 ? "border-b-2 border-b-blue-700" : ""
                  }`}
                  onClick={() => handleTabClick(3)}
                  aria-hidden="true">
                  Favorite
                </div>
              </div>
            </div>
          </HotelPageContent>
          <Shop tab={shopTabs[activeTab]} />
        </div>
      </div>
      <Footer />
    </Protected>
  )
}

export default Booking
