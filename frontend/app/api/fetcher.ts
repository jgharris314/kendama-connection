export default async function fetcher(endpoint: string) {
  const res = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const jsonRes = res.json()
  return jsonRes
}
