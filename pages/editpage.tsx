import { GetStaticPaths, GetStaticProps } from 'next'
import { Texteditor } from '../components/editor'
import { Layout } from '../components/layout'


const editpage = (props : any) => {
  return (
    <Layout> 
        <Texteditor></Texteditor>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
      // const res = await fetch('http://localhost:3000/posts')
    // const posts = await res.json
    return {
      props: {
        "author": "TEWetgted",
        "title": "asdasd",
        "post_data": "This is a blog post about X"
      },
      revalidate: 1
    }
    

}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export default editpage