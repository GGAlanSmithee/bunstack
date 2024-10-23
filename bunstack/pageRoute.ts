import { mkdir } from "node:fs/promises"
import { capitalize, toLower } from "lodash"

const oneWeek = 60 * 60 * 24 * 7

const isDev = process.env.NODE_ENV !== "production"
const generatedPagesFolder = `${process.cwd()}/bunstack/.generated/pages`

const codeInput = (path: string, component: string) =>
  `
import { hydrateRoot } from "https://esm.sh/react-dom@18.2.0/client"
import ${component} from "${path}";

hydrateRoot(document.getElementById("root")!, <${component} />);
`.trim()

const writeToIntermediaryFolder = async (page: string) => {
  try {
    const path = `@/pages/${page}/${page}.page`
    const component = capitalize(page)

    await mkdir(generatedPagesFolder, { recursive: true })

    await Bun.write(`${generatedPagesFolder}/${page}.tsx`, codeInput(path, component))
  } catch (error) {
    console.error(error)
  }
}

const getCode = async (page: string) => {
  try {
    const { outputs, success, logs } = await Bun.build({
      entrypoints: [`${generatedPagesFolder}/${page}.tsx`],
      external: ["react", "react-dom/client", "react/jsx-dev-runtime"],
      minify: !isDev,
      target: "browser",
      format: "esm",
    })

    if (!success) {
      console.error(logs)
      return null
    }

    const code = await outputs[0]?.text()

    return code
  } catch (error) {
    console.error(error)
    return null
  }
}

export const pageRoute = async ({
  params: { page },
}: {
  params: {
    page: string
  }
}) => {
  try {
    const normalizedPage = toLower(page.replace(/\.js$/, ""))

    await writeToIntermediaryFolder(normalizedPage)
    const code = await getCode(normalizedPage)

    if (!code) {
      return new Response("Not Found!", { status: 404 })
    }

    // Externalize react/jsx-dev-runtime, because bun does not handle it do: investigate
    const externalizedCode = code.replaceAll("react/jsx-dev-runtime", "https://esm.sh/react@18.2.0/jsx-dev-runtime")

    return new Response(externalizedCode, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": isDev ? "no-cache" : `public, max-age=${oneWeek}`,
      },
    })
  } catch (error) {
    console.error(error)

    return new Response("Not Found!", { status: 404 })
  }
}
