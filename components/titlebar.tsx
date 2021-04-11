interface TitlebarProps {
    name: string,
}

export const Titlebar = ({ name }: TitlebarProps) => {
    return (
        <div className="full-width">
            <h1>{name}</h1>

            <style jsx> {`
            .full-width {
                width: 100vw;
                position: relative;
                left: 50%;
                right: 50%;
                margin-left: -50vw;
                margin-right: -50vw; 
                border-bottom:1px solid black;
                
              }
              h1 {
                  padding: 0 2rem;

              }         
            `}
            </style>

        </div>
    )

}