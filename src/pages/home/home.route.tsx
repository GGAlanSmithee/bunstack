import { type RouteComponent, type RouteOptions } from "@bunstack"
import HomePage from "./home.page"

const config: RouteOptions = {
  title: "Bunstack | Home",
  description: "Bunstack | Home page",
  bootstrapModules: ["js/home"], // automate this with {pageName}.page.tsx
}

const HomeRoute: RouteComponent<{ text: string }> = async (props) => {
  return <HomePage />
}

export default HomeRoute
export { config }
