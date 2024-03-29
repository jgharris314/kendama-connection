import Nav from "components/Layout/Nav"
import SectionContainer from "components/SectionContainer"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

const loading = () => <div className="" />

export default function Layout() {
  return (
    <SectionContainer additionalContentClasses="items-center justify-center w-full">
      <Suspense fallback={loading()}>
        <Nav />
        <div className="pt-20 pb-10">
          <Outlet />
        </div>
      </Suspense>
    </SectionContainer>
  )
}
