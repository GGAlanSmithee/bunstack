// import { buildStyles } from "./styles/buildStyles";
// import { buildRoutes } from "./routes/buildRoutes";

import { Elysia } from "elysia"
import { staticPlugin } from "@elysiajs/static"
import { pageRoute, renderRoute, buildStyles } from "@bunstack"
import AboutRoute, { config as aboutConfig } from "@/pages/about/about.route"
import HomeRoute, { config as homeConfig } from "@/pages/home/home.route"
import LoginRoute, { config as loginConfig } from "@/pages/login/login.route"

new Elysia()
  .get("/js/:page", pageRoute)
  .get("/", () => renderRoute(<HomeRoute text="hello" />, homeConfig))
  .get("/about", () => renderRoute(<AboutRoute />, aboutConfig))
  .get("/login", () => renderRoute(<LoginRoute />, loginConfig))
  .use(
    staticPlugin({
      prefix: "/", // default is "/public"
      resolve: (...pathSegments) => `../public/${pathSegments.join("/")}`,
      noCache: process.env.NODE_ENV !== "production",
    })
  )
  .onStart(async ({ server }) => {
    buildStyles().then(console.info).catch(console.error)

    console.info(`🚀 BunStack live on ${server?.url ?? "http://localhost:4200"}`)
  })
  .listen(4200)
