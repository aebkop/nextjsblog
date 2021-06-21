import { GetStaticPaths, GetStaticProps } from 'next'
import { Postsum } from '../../components/postsummary'
import { Layout } from  '../../components/layout' 
import { Titlebar } from '../../components/titlebar'
 

const home = ({ userid, data }: any ) => {
    if (!data) data = []
    return (
        <Layout>
            <Titlebar name="My Blog"/> 
            {data.map((a: any, index: number) => (
                <Postsum key={a.id} authorid={a.userId} postid={a.id} author={"Test"} title={a.title} summary={a.body} />
            ))}
        </Layout>
      )
}

export const getStaticProps: GetStaticProps = async ({ params = null }) => {
    if (params === null) return { notFound: true, }
    const userid = params.user
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=1`)
    const data = await res.json()
    if (data === null) return { notFound: true, }
    console.log(data)
    return {
      props: {
          userid,
          data,
      }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export default home