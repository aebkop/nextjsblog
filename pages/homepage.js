import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
  const [ session, loading ] = useSession()

  if(session) {
    return <>

    
     </>
  }

  return <a href="/api/auth/signin">Sign in</a>
}