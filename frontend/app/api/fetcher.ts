export default async function fetcher(endpoint: string, body?: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    {
      cache: "no-store",
      method: body ? "POST" : "GET",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    }
  )
  const resJson = await res.json()

  if (!res.ok) {
    throw new Error(resJson.error)
  }

  return resJson
}
