const localStorageKey = "TOKEN"

const client = function client(url: string, options?: RequestInit) {
  let token: string | null = null
  if (typeof window !== "undefined") {
    token = localStorage.getItem(localStorageKey)

    const headers: HeadersInit = {"content-type": "application/json"}
    if (token) headers.Authorization = `Bearer ${token}`

    const config: RequestInit = {
      method: options?.method || "GET",
      headers: {...headers, ...options?.headers}
    }

    if (options?.body) config.body = options?.body
    return fetch(
      !/^(https?:)?\/\//.test(url)
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`
        : url,
      config
    ).then(async (response) => {
      if (response.status === 401) localStorage.removeItem("TOKEN")
      if (response.ok) return await response.json()
      const message = await response.text()
      return Promise.reject(new Error(message))
    })
  }
}

export default client
