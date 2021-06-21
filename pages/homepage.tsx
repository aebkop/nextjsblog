import { signIn, signOut, useSession } from 'next-auth/client'
import { createBlog } from './api/blog/createblog'
import { useForm } from "react-hook-form";


export default function Page() {
    const [session, loading] = useSession()
    const handleSubmit = (data: any) => {

    }
    if (session) {
        return (
        <> 
            <form onSubmit={handleSubmit(onSubmit)}>
                
            </form>
        </>
        )
    }

    else return (<button onClick={() => signIn()}>Sign in</button>)

}