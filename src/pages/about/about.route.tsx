import { sleep } from "bun"
import { type RouteComponent, type RouteOptions } from "@bunstack"
import AboutPage from "./about.page"

const config: RouteOptions = {
  title: "Bunstack | About",
  description: "Bunstack | About page",
  bootstrapModules: ["js/about"],
}

const AboutRoute: RouteComponent<{}> = async () => {
  await sleep(1000)

  return <AboutPage />
}

export default AboutRoute
export { config }
