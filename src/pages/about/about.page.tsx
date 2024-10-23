import type { PageComponent } from "@bunstack"
import { ClickMe } from "@/components/ClickMe.Button"
import { PageHeader } from "@/components/Page.Header"
import { MainLayout } from "@/layouts/Main.Layout"

const AboutPage: PageComponent<{}> = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-2 py-4">
        <div>
          <PageHeader>About</PageHeader>
        </div>

        <div>
          <ClickMe from="About" />
        </div>
      </div>
    </MainLayout>
  )
}

export default AboutPage
