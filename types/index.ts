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

export interface ISginIn {
  user: IUser
  success: boolean
  token: string
  booking: Booking
  has_booking: number
}
export interface IProfileRes {
  success: string
  user: IUser
  booking: Booking
  has_booking: number
  massage: string | null
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
export interface IHotel {
  id: number
  name: string
  about: string
  features: string
  logo: string
  banner: null
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
  deleted_at: null
  bot_service: number
  date_start_service: null
  date_end_service: null
  date_stop_service: null
  is_booking: number
  langs: Lang[]
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
export interface Hotel {
  id: number
  name: string
  about: string
  features: string
  logo: string
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
  bot_service: number
  user: User
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
