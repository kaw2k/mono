let authToken = ''

export const ajax = {
  async post<Response = any, Body extends object = {}>(
    url: string,
    body?: Body
  ): Promise<Response> {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body || {}),
      headers: {
        Authorization: authToken,
      },
    })

    return await res.json()
  },

  async patch<Response = any, Body extends object = {}>(
    url: string,
    body?: Body
  ): Promise<Response> {
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body || {}),
      headers: {
        Authorization: authToken,
      },
    })

    return await res.json()
  },

  async get<Response = any>(url: string, query: any = {}): Promise<Response> {
    let queryParams = []
    for (let key in query) {
      queryParams.push(`${key}=${query[key]}`)
    }

    const res = await fetch(`${url}/?${queryParams.join('&')}`, {
      headers: {
        Authorization: authToken,
      },
    })

    return await res.json()
  },

  setAuthToken(token: string) {
    authToken = token
  },

  clearAuthToken() {
    authToken = ''
  },
}
