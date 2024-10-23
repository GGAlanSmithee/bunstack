import { ClickMe } from "@/components/ClickMe.Button"
import { PageHeader } from "@/components/Page.Header"
import { MainLayout } from "@/layouts/Main.Layout"

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-2 py-4">
        <div>
          <PageHeader>Home</PageHeader>
        </div>

        <div>
          <button onClick={() => console.log("a letter to home")}>CLICK</button>
        </div>

        <div>
          <ClickMe from="Home" />
        </div>

        <div>
          <a className="underline underline-offset-2" href="/about">
            About
          </a>
        </div>
      </div>
    </MainLayout>
  )
}
