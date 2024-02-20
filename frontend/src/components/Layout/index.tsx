import Nav from "components/Layout/Nav"
import GlobalContextProvider from "context/Global"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

const loading = () => <div className="" />

export default function Layout() {
  return (
    <GlobalContextProvider isLoggedIn={false} user={{}}>
      <Suspense fallback={loading()}>
        <Nav />
        <Outlet />
      </Suspense>
    </GlobalContextProvider>
  )
}
