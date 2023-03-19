import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Netflix Clone
      </h1>
      {user && <p className="text-white text-2xl font-bold">Logged in as {user.name}</p>}
      <button
        className="h-10 w-full bg-white"
        onClick={() => { signOut() }}
      >
        Logout
      </button>
    </>
  )
}
