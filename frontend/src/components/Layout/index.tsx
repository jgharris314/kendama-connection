import Nav from "components/Layout/Nav"
import SectionContainer from "components/SectionContainer"
import GlobalContextProvider from "context/Global"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

const loading = () => <div className="" />

export default function Layout() {
  return (
    <GlobalContextProvider isLoggedIn={false} user={{}}>
      <SectionContainer
        bgClasses="!w-screen"
        additionalContentClasses="items-center justify-center w-full"
      >
        <Suspense fallback={loading()}>
          <Nav />
          <div className="pt-20">
            <Outlet />
          </div>
        </Suspense>
      </SectionContainer>
    </GlobalContextProvider>
  )
}
