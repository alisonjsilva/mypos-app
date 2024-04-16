import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Transactions from "@/components/Transactions/Transactions";
import { BiLogOut } from "react-icons/bi";



export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  return (
    <main className="">
      <LogoutLink className="flex gap-2 justify-between p-4 items-center">
        <div>

        </div>
        <div className="flex gap-2 items-center">
          <BiLogOut /> Sair
        </div>
      </LogoutLink>
      <Transactions />
    </main >
  )
}
