export type MembershipType =
  | "basic"
  | "local_host"
  | "event_host"
  | "company"
  | "owner"

export interface User {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  membership_type: MembershipType
}
