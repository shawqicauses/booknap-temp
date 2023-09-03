import React, {useEffect} from "react"
import {useRouter} from "next/router"
import {useAuth} from "../../stores/auth"
import LoadingDiv from "./loading"

const Protected = function Protected({children}: {children: React.ReactNode}) {
  const {token, ready} = useAuth()
  const rout = useRouter()
  useEffect(() => {
    if (ready && !token) {
      rout.push("/")
    }
  }, [token, rout, ready])
  if (token) return <div>{children}</div>
  return <LoadingDiv />
}

export default Protected
