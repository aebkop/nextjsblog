import Image from 'next/image'
import Link from 'next/link'

interface PostsumProp {
    key: any,
    author: string,
    authorid: number,
    postid: number,
    title: string,
    summary: string,
    image?: string,
}

export const Postsum = ({ author, title, summary, authorid, postid }: PostsumProp) => {
    return (
        <Link href={{
            pathname: '/[user]/[post]/',
            query: { user: authorid, post: postid }
        }}  > 
        <div className="row">
            <div className="image-wrapper">  
                <Image src={"/test.png"} width="500" height="400" layout="responsive" objectFit="scale-down" objectPosition={"50% 50%"} className="post-image"/>
            </div> 
            <div className="post-info">
                <h2>{title}</h2>
                <p>{summary}</p>
                <p className="author">{author}</p>
            </div>
            <style jsx>
                {`
                .row {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    height: 10rem;
                    width: 60rem;
                    position: "relative";
                    align-items: flex-start;
                    margin: 1rem;
                }
                h1, h2, p {
                    margin-block-end: 0.5rem;
                    margin-block-start: 0.5rem;
                }
                h2 {
                    margin: 0rem;
                }
                .post-info {
                    width: 60%;
                }
                .image-wrapper {
                    width:200px;
                    padding-right: 1rem

                }
                .author {
                    font-size:1rem;
                }
                `}
            </style>

        </div>
        </Link>             
    )

}