export const Layout = (props: any) => {
    return (
        <div className="page-layout">
            {props.children}
            <style jsx>
                {`
                div {
                    max-width: 100%;
                    margin: 0 auto;
                }
            `}
            </style>
            <style jsx global>{`
                body {
                    margin: 0;
                    padding: 0;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 1.8;
                    color: #333;
                    font-family: sans-serif;
                }
                h1 {
                    font-weight: 700;
                }
        `}</style>
        </div>
    )
}

