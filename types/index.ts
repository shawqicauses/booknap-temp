export interface IUser {
  avatar: string | null
  created_at: string | null
  current_team_id: number | null
  deleted_at: string | null
  dob: string | null
  email: string | null
  email_verified_at: string | null
  first_name: string | null
  gauth_id: number | null
  gauth_type: number | null
  gender: 1 | 2 | null
  id: number
  last_name: string | null
  last_online_date: string | null
  last_session: string | null
  mobile: string | null
  name: string
  online: number | null
  profile_photo_path: string | null
  profile_photo_url: string
  two_factor_confirmed_at: string | null
  type: 1
  stars: number
  updated_at: string | null
}

interface room {
  type: number
  number: number
}

export interface IBookingReq {
  date_from: string
  date_to: string
  lat: number
  lng: number
  distance: number
  children: number
  adults: number
  notes?: string
  country_id: number
  city_id: number
  rooms: Array<room>
}

export interface IGListBookingOffersHotel {
  data: []
}
export interface Room {
  type: number
  number: number
}
export interface Booking {
  id: number
  date_from: string
  date_to: string
  children: number
  adults: number
  rooms: Room[]
  notes: string
  cancel: number
  canceled_at: string
  cancel_reason: number
  cancel_reason_other: string
  status: number
  country_id: number
  city_id: number
  offer_id: number
  hotel_id: number | number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at: string
  ignore: number
  date_ignore: string
  lat: string
  lng: string
  distance: number
  rooms_no: number
}

export interface Lang {
  id: number
  name: string
  about: string
  address: string
  lang_id: number
  hotel_id: number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface IRoom {
  type: number
  number: number
}
export interface User {
  id: number
  name: string
  avatar: string
  type: number
  mobile: string
  created_at: string
  updated_at: string
  online: number
  stars: number
  profile_photo_url: string
}
interface Option {
  id: number
  checked: boolean
}

interface Feature {
  id: number
  options: Option[]
}

interface Media {
  id: number
  name: string
  file: string
  type: string
  extension: string
  path: string
  size: number
  status: number
  sortable: number
  likes: number
  views: number
  token: string | null
  title: string | null
  hotel_id: number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}
export interface Hotel {
  id: number
  name: string
  about: string
  features: Feature[]
  logo: string
  banner: {id: number; image: string}[]
  lat: string
  lng: string
  address: string
  phone: string
  website: string
  stars: number
  country_id: number
  city_id: number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  bot_service: number
  date_start_service: string | null
  date_end_service: string | null
  date_stop_service: string | null
  langs: Lang[]
  is_booking: number
  media: Media[]
}
export interface IBooking {
  id: number
  date_from: string
  date_to: string
  children: number
  adults: number
  rooms: IRoom[]
  rooms_no: number | null
  hotel: Hotel | null
}

export interface HotelRating {
  id: number
  date_from: string
  date_to: string
  children: number
  adults: number
  rooms: Room[]
  notes: string
  cancel: number
  canceled_at: null
  cancel_reason: number
  cancel_reason_other: null
  status: number
  country_id: number
  city_id: number
  offer_id: number
  hotel_id: number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at: null
  ignore: number
  date_ignore: null
  lat: string
  lng: string
  distance: number
  rooms_no: number
  is_renew: number
  is_rated: number
  hotel: Hotel
}
export interface IProfileRes {
  success: string
  user: IUser
  booking: Booking
  has_booking: number
  massage: string | null
  hotel_rating: HotelRating
}
export interface ISginIn {
  user: IUser
  success: boolean
  token: string
  booking: Booking
  has_booking: number
  hotel_rating: HotelRating
}
export interface ICheckSitting {
  result: {
    check_in: string
    check_out: string
    min_area: string
    max_area: string
  }
}

interface product_feature {
  id: number
  shopping_product_id: number
  name_en: string
  name_ar: string
  created_at: string
  updated_at: string
  deleted_at: null
  hotel_id: number
  values: Array<{
    id: number
    feature_id: number
    name_ar: string
    name_en: string
    created_at: string
    updated_at: string
    product_id: number
    hotel_id: number
    deleted_at: null
  }>
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
  product_features: Array<product_feature>
  hotel_id: number
  is_favourite: number
}
