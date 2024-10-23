export type AppProps = {
  title?: string
  description?: string
  children: React.ReactNode
}

export const Html = ({ title, description, children }: AppProps) => (
  <html>
    <head>
      <script
        type="importmap"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              imports: {
                react: "https://esm.sh/react@18.2.0",
                "react-dom/": "https://esm.sh/react-dom@18.2.0/",
                "react/jsx-dev-runtime": "https://esm.sh/react@18.2.0/jsx-dev-runtime",
              },
            },
            null,
            2
          ),
        }}
      ></script>

      {/* <script type="module">
        {`
import { hydrateRoot } from "react-dom/client"
console.log("hydrateRoot", hydrateRoot)
`}
      </script> */}

      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      <link rel="stylesheet" href="/styles.css" />
    </head>

    <body className="w-screen h-screen container m-auto max-w-xl">
      <div className="w-full h-full" id="root">
        {children}
      </div>

      {/* <script src="/navigation.js"></script> */}
    </body>
  </html>
)

// <script type="module">
//   import React from "https://esm.sh/react@19.0.0-beta-04b058868c-20240508/?dev"
//   import ReactDOMClient from "https://esm.sh/react-dom@19.0.0-beta-04b058868c-20240508/client/?dev"
// </script>
