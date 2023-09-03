/* eslint-disable camelcase */
import {Progress} from "@nextui-org/react"
import {HiMiniClipboardDocumentList} from "react-icons/hi2"
import React, {useEffect, useMemo, useState} from "react"
import {AiTwotoneCalendar} from "react-icons/ai"
import {useRouter} from "next/router"
import Image from "next/image"
import MyButton from "../../uis/button"
import {Result, res} from "./index"
import LoadingDiv from "../../uis/loading"
import client from "../../../helpers/client"

export interface Lang {
  id: number
  shopping_product_id: number
  lang_id: number
  name: string
  description: string
  created_at: string
  updated_at: string
  deleted_at: null
  user_id: number
}
export interface Product {
  id: number
  shopping_category_id: null
  name: string
  description: string
  price: string
  discount_price: string
  color: string
  on_sale: number
  quantity: number
  featured: number
  in_stock: number
  created_at: string
  updated_at: string
  deleted_at: null
  image: string
  langs: Lang[]
}
export interface OrderItme {
  id: number
  shopping_order_id: number
  shopping_product_id: number
  color: null
  size: null
  qty: string
  price: number
  created_at: string
  updated_at: string
  deleted_at: null
  product: Product
}

export interface User {
  id: number
  name: string
  avatar: string
  type: number
  first_name: string
  last_name: string
  mobile: string
  dob: string
  gender: number
  email: string
  email_verified_at: null
  two_factor_confirmed_at: null
  last_session: null
  current_team_id: null
  profile_photo_path: null
  created_at: string
  updated_at: string
  deleted_at: null
  online: number
  last_online_date: null
  gauth_id: null
  gauth_type: null
  stars: number
  profile_photo_url: string
}
export interface Order {
  id: number
  user_id: number
  date: string
  status: string
  notes: null
  amount: number
  order_number: string
  invoice_no: string
  confirmed_date: null
  delivered_date: null
  cancel_date: null
  cancel_reason: null
  created_at: string
  updated_at: string
  deleted_at: null
  hotel_booking_id: number
  user: User
  order_itmes: OrderItme[]
}

export interface Test {
  message: string
  data: Order[]
}

const calc = (date1: string | number | Date, date2: string | number | Date) => {
  const startDate = new Date(date1)
  const endDate = new Date(date2)
  const timeDifference = endDate.valueOf() - startDate.valueOf()
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24) + 1
  return parseInt(`${daysDifference}`, 10)
}

const calc2 = (date1: string, date2: string) => {
  const startDate = new Date(`${date1}`)
  const endDate = new Date(`${date2}`)
  const timeDifference = endDate.valueOf() - startDate.valueOf()
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24)
  return daysDifference.toFixed(2)
}

const calcStyle = (index: number, completedDays: string) => {
  const progress = index + 1 <= parseFloat(completedDays) ? 100 : 0
  const inProgress =
    parseFloat(completedDays) > index &&
    !(parseFloat(completedDays) >= index + 1)
      ? parseInt(completedDays.split(".")[1], 10)
      : null
  return inProgress || progress
}

const Booking = function Booking() {
  const [showChild, setShowChild] = useState(false)
  const router = useRouter()
  const [result, setResult] = useState<Result>()
  const [orders, setOrders] = useState<Order[]>()
  const totalDays = useMemo(
    () => calc(result?.date_from!, result?.date_to!),
    [result]
  )
  const id = Number(router.query.id)

  const completedDays = useMemo(
    () => calc2(result?.date_from!, new Date().toISOString()),
    [result]
  )

  useEffect(() => {
    if (id > -1) {
      client(`hotels/bookings/show/${id}`)?.then((response: res) => {
        setResult(response.result)
      })
    }
  }, [id])

  useEffect(() => {
    if (id > -1) {
      client(`shopping/orders?hotel_booking_id=${id}`)?.then(
        (response: Test) => {
          setOrders(response.data)
        }
      )
    }
  }, [id])

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild || !orders) {
    return <LoadingDiv />
  }
  return (
    <>
      <div className="p-3 bg-gray-100 dark:bg-mirage rounded-lg my-4">
        <div className="flex gap-2 mb-4">
          {Array.from({length: totalDays}).map((_, index) => {
            return (
              <Progress
                size="sm"
                color="danger"
                key={Math.random()}
                aria-label="Loading..."
                value={calcStyle(index, completedDays)}
                className="max-w-md"
              />
            )
          })}
        </div>
        <div className="flex gap-3 md:gap-10 flex-wrap">
          <div className="flex gap-3 items-center">
            <AiTwotoneCalendar className="h-5 w-5 text-gray-400" />
            <p className="flex gap-2">
              {result?.date_from.split(" ")[0]}
              <span className="font-semi-bold">To</span>
              {result?.date_to.split(" ")[0]}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <HiMiniClipboardDocumentList className="h-5 w-5 text-gray-400" />
            <p className="flex gap-1">
              <span>{result?.adults} Adults</span>
              <span>- {result?.children} Children</span>
              <span>- {result?.rooms_no} Room</span>
            </p>
          </div>
          <div className="flex flex-1 justify-end">
            <MyButton disableAnimation>Renewal</MyButton>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4 my-4 min-h-[400px]">
        {orders.map(({id: orderId, created_at, order_itmes}) => (
          <div
            className="bg-gray-100 dark:bg-mirage rounded-lg p-3"
            key={orderId}>
            <div className="my-flex-between py-2 text-gray-400">
              <span className=" inline-block px-2 py-1 font-semi-bold">
                Order {orderId}
              </span>
              <span className="inline-block px-2 py-1">{created_at}</span>
            </div>
            <div className="divide-y-2">
              {order_itmes.map(({id: itemId, price, product}) => (
                <div key={itemId} className="flex p-1 py-3 gap-3">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                    <Image src={product.image} alt={`item ${itemId}`} fill />
                  </div>
                  <div>
                    <p className="body-sm">{product.description}</p>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <span className="text-red-500 font-semi-bold text-xl">
                      {price}$
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Booking
