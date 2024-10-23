import { Html } from "@/Html"
import React, { Children, cloneElement, isValidElement, type PropsWithChildren, type ReactElement } from "react"
import { renderToReadableStream } from "react-dom/server"

export type RouteProps<T extends {}> = PropsWithChildren<T>
export type RouteComponent<T extends {}> = React.FC<RouteProps<T>>
export type PageComponent<T extends {}> = React.FC<T>

const isDev = process.env.NODE_ENV !== "production"

const defaultCacheTime = 60 * 60 * 24 * 7
const cacheControl = (cacheDev: boolean = false, cacheTime: number = defaultCacheTime) => {
  if (isDev && !cacheDev) {
    return "no-cache"
  }

  return `public, max-age=${cacheTime}`
}

const renderChildWithProps = (child: ReactElement, props: any) =>
  isValidElement(child) ? cloneElement(child, props) : child

const Page = async ({ children, title, description, ...props }: PropsWithChildren<any>) => {
  const htmlProps = { title, description }
  const content = Children.map(children, (child) => renderChildWithProps(child, props))

  return <Html {...htmlProps}>{content}</Html>
}

const oneWeek = 60 * 60 * 24 * 7

export type RouteOptions = {
  bootstrapModules?: string[]
  cache?: number
  cacheDev?: boolean
  title?: string
  description?: string
}

const defaultOptions: RouteOptions = {
  bootstrapModules: [],
  cache: oneWeek,
  cacheDev: false,
  title: "",
  description: "",
}

export const renderRoute = async (Comp: ReactElement, options: RouteOptions) => {
  const { bootstrapModules, cache, cacheDev, title, description } = { ...defaultOptions, ...options }

  const pageProps = { title, description }

  return new Response(
    await renderToReadableStream(<Page {...pageProps}>{Comp}</Page>, {
      bootstrapModules,
      identifierPrefix: "bunstack",
    }),
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": cacheControl(cacheDev, cache),
      },
    }
  )
}
