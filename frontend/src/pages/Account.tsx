import { useUser } from "hooks/useUser"
export default function AccountPage() {
  const user = useUser()

  return <div>{user.user?.username}</div>
}
