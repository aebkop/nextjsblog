import { GetStaticPaths, GetStaticProps } from 'next'
import { Titlebar } from '../../components/titlebar'


const post = (props : any) => {
  return (
    <>
      <Titlebar name = "Test"/>
      <h1>{props.title}</h1>
    </>
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

export default post