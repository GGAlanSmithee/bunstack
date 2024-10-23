import { PageHeader } from "@/components/Page.Header"
import { MainLayout } from "@/layouts/Main.Layout"

const Login = () => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center gap-2 py-4">
        <PageHeader>Login</PageHeader>

        <form className="flex flex-col gap-4">
          <input className="py-1 px-2 rounded" type="text" placeholder="Username" />
          <input className="py-1 px-2 rounded" type="password" placeholder="Password" />
          <button
            className="rounded py-1 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition-colors duration-200 text-slate-800"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </MainLayout>
  )
}

export default Login
