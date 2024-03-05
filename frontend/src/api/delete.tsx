export default async function deleteReq(endpoint: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}${endpoint}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  return response
}
