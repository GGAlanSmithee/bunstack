export type AppProps = {
  title?: string
  description?: string
  children: React.ReactNode
}

export const Html = ({ title, description, children }: AppProps) => (
  <html>
    <head>
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
