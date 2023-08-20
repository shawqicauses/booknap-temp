import {Url} from "next/dist/shared/lib/router/router"

export interface IItem {
  id: number
  image?: string
  product?: string
  price?: number
  quantity?: number
}
// 29|vOl8X1Iuoh8z3QRoa3SPsWgt7cyQaNsfDJ1vtSoy

export interface ISignInRes {
  token: string
  user: {
    created_at: string
    id: number
    mobile: string
    name: string
    profile_photo_url: Url
    type: "1"
    updated_at: string
  }
}
// token: "29|vOl8X1Iuoh8z3QRoa3SPsWgt7cyQaNsfDJ1vtSoy"
// user: Object { name: "Ahmed Al-khateeb", mobile: "+972592546772", type: "1", … }
// created_at: "2023-08-20T08:34:03.000000Z"
// id: 18
// mobile: "+972592546772"
// name: "Ahmed Al-khateeb"
// profile_photo_url: "https://ui-avatars.com/api/?name=A+A&color=7F9CF5&background=EBF4FF"
// type: "1"
// updated_at: "2023-08-20T08:34:03.000000Z"
