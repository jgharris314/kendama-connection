import Layout from "components/Layout"
import React, { Suspense } from "react"
import { useRoutes } from "react-router-dom"

const Events = React.lazy(() => import("pages/Events"))
const Signup = React.lazy(() => import("pages/auth/Signup"))
const Login = React.lazy(() => import("pages/auth/Login"))

const loading = () => <div>Loading...</div>

type LoadComponentProps = {
  // eslint-disable-next-line no-undef
  component: React.LazyExoticComponent<() => JSX.Element>
}

function LoadComponent({ component: Component }: LoadComponentProps) {
  return (
    <Suspense fallback={loading()}>
      <Component />
    </Suspense>
  )
}

export default function AllRoutes() {
  // to toggle multiple layouts
  // const getLayout = () => {
  //   const layoutCls: React.ComponentType = VerticalLayout
  //   return layoutCls
  // }
  // const Layout = getLayout()

  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "events", element: <LoadComponent component={Events} /> },
        { path: "auth/signup", element: <LoadComponent component={Signup} /> },
        { path: "auth/login", element: <LoadComponent component={Login} /> },
      ],
    },
  ])
}
