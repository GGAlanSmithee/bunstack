import type { PropsWithChildren } from "react"

export const  MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-w-full min-h-full flex flex-col">
      <nav className="bg-gray-800 text-white py-4">
        <ul className="flex gap-4">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>

          <li>
            <a href="/about" className="hover:underline">
              About
            </a>
          </li>

          <li>
            <a href="/login" className="hover:underline">
              Login
            </a>
          </li>
        </ul>
      </nav>

      <main className="flex-1 h-full">{children}</main>
    </div>
  )
}
