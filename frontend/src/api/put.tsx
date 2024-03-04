export default async function put<T>(endpoint: string, data: T) {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}${endpoint}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )

  return response
}
