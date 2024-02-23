export default async function get(endpoint: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}${endpoint}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  return await response.json()
}
