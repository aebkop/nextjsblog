// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react'
// Import the Slate editor factory.
import { createEditor, Descendant, Editor, Element, Node, NodeMatch, Text, Transforms } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { CustomEditor, CustomElement, FormattedText, Mark } from '../custom-types'

// Define our own custom set of helpers.
const PostEditor = {
    isMarkActive(editor: CustomEditor, marktype: keyof Mark) {
        const [match] = Editor.nodes(editor, {
            match: n => Text.isText(n) && n[marktype] === true,
            universal: true,
        })
        return !!match
    },

    isBlockActive(editor: CustomEditor, element: CustomElement["type"]) {
        const [match] = Editor.nodes(editor, {
            match: n => Element.isElement(n) && n.type === element,
        })
        return !!match
    },

    toggleMark(editor: CustomEditor, marktype: keyof Mark) {
        const isActive = PostEditor.isMarkActive(editor,marktype)
        Transforms.setNodes<FormattedText>(
            editor,
            { [marktype]: isActive ? false : true },
            { match: n => Text.isText(n), split: true }
        )
    },
    
    toggleBlock(editor: CustomEditor, element: CustomElement["type"]) {
        const isActive = this.isBlockActive(editor, element)
        Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph' : element },
            { match: n => Editor.isBlock(editor, n) }
        )
    },
}


export const Texteditor = (props: any) => {
    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState<Descendant[]>(initialValue)

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback(props => {return <Leaf {...props} />}, [])


    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <div>
            <MarkButton format="bold" text="Bold"/>
            <MarkButton format="italic" text="Italic"/>
            <MarkButton format="underline" text="Underline"/>
            </div>
            <div>
            <ElementButton format="code" text="Code"/>
            </div>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={event => {
                    if (!event.ctrlKey) return
                    switch (event.key) {
                        case '`': {
                            event.preventDefault()
                            PostEditor.toggleBlock(editor,"code")
                            break
                        }
                        case 'b': {
                            event.preventDefault()
                            PostEditor.toggleMark(editor,"bold")
                            break
                        }                       
                    }
                }}
            />
        </Slate>
    )
}

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable plain text, just like a <textarea>!' },
        ],
    },
]

const MarkButton = ({ format, text }: { format: keyof Mark, text: string }) => {
    const editor = useSlate()
    return ( 
    <button onMouseDown={event => {
        event.preventDefault()
        PostEditor.toggleMark(editor,format)
    }}
> 
    <p>{text}</p>
    </button>
    )
}

const ElementButton = ({ format, text }: { format: CustomElement["type"], text: string }) => {
    const editor = useSlate()
    return ( 
    <button onMouseDown={event => {
        event.preventDefault()
        PostEditor.toggleBlock(editor, format)
    }}
> 
    <p>{text}</p>
    </button>
    )
}



const CodeElement = (props: any) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

const DefaultElement = (props: any) => {
    return <p {...props.attributes}>{props.children}</p>
}

const ListElement = (props: any) => {
    return <p {...props.attributes}>{props.children}</p>
}


// Define a React component to render leaves with bold text.
const Leaf = ({ attributes, children, leaf }: any) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
  
    if (leaf.code) {
      children = <code>{children}</code>
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>
    }
  
    if (leaf.underline) {
      children = <u>{children}</u>
    }
  
    return <span {...attributes}>{children}</span>
  }

