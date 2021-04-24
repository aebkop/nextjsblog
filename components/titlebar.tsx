interface TitlebarProps {
    name: string,
}

export const Titlebar = ({ name }: TitlebarProps) => {
    return (
        <>
            <nav> 
                <h1 className="blog-name">{name}</h1>
                <button>Subscribe</button>
            </nav>
            <div className="full-width">
            </div>
            <style jsx> {` 
            .full-width {
                width: 100vw; 
                position: relative;
                left: 50%;
                right: 50%;
                margin-left: -50vw;
                margin-right: -50vw; 
                border-bottom: 1px solid black;
              }
              h1 {
                margin: 0rem;
                padding: 0rem;
              }         
              nav {
                display: flex; 
                justify-content: flex-end;
                align-items: center; 
              }
              .blog-name {
                margin-right: auto;
              }
              .navbar-item {
                height: 4rem;
                width: 4rem;
              }
              button {
                background-color: red;
                color: white;
                text-align: center;
                height: 2rem;
                border-radius: 6px;
                border: 0px;
              }
              button:hover {
                filter: brightness(80%);
              }
            `}
            </style>
        </>
    )
}

const blogName = (props: any) => {

}