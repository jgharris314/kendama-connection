import Layout from "components/Layout"
import React, { Suspense } from "react"
import { useRoutes } from "react-router-dom"

const Home = React.lazy(() => import("pages/Home"))
const Events = React.lazy(() => import("pages/Events"))
const Signup = React.lazy(() => import("pages/auth/Signup"))
const Login = React.lazy(() => import("pages/auth/Login"))
const Account = React.lazy(() => import("pages/Account"))

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
  return useRoutes([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <LoadComponent component={Home} /> },
        { path: "events", element: <LoadComponent component={Events} /> },
        { path: "account", element: <LoadComponent component={Account} /> },
        { path: "auth/signup", element: <LoadComponent component={Signup} /> },
        { path: "auth/login", element: <LoadComponent component={Login} /> },
      ],
    },
  ])
}
