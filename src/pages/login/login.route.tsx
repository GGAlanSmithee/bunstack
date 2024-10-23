import { type RouteComponent, type RouteOptions } from "@bunstack"
import LoginPage from "./login.page"

const config: RouteOptions = {
  title: "Bunstack | Login",
  description: "Bunstack | Login page",
  bootstrapModules: ["js/login"], // automate this with {pageName}.page.tsx
}

const LoginRoute: RouteComponent<{}> = () => {
  return <LoginPage />
}

export default LoginRoute
export { config }
