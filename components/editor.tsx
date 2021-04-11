// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react'
// Import the Slate editor factory.
import { createEditor, Descendant, Editor, Element, Node, NodeMatch, Text, Transforms } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import type { CustomEditor, CustomElement, Mark } from '../custom-types'

// Define our own custom set of helpers.
const PostEditor = {
    isMarkActive(editor: CustomEditor, marktype: keyof Mark) {
        const [match] = Editor.nodes(editor, {
            match: n => Text.isText(n) && n[marktype] === true,
            universal: true,
        })
        return !!match
    },

    isBoldMarkActive(editor: CustomEditor) {
        return this.isMarkActive(editor,"bold")
    },

    isBlockActive(editor: CustomEditor, element: CustomElement["type"]) {
        const [match] = Editor.nodes(editor, {
            match: n => Element.isElement(n) && n.type === element,
        })
        return !!match
    },

    isCodeBlockActive(editor: CustomEditor) {
        return this.isBlockActive(editor,"code")
    },
    
    toggleMark(editor: CustomEditor, marktype: keyof Mark) {
        const isActive = PostEditor.isMarkActive(editor,marktype)
        Transforms.setNodes(
            editor,
            { bold: isActive ? false : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleBoldMark(editor: CustomEditor) {
        const isActive = PostEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? false : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleCodeBlock(editor: CustomEditor) {
        const isActive = PostEditor.isCodeBlockActive(editor)
        Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph' : 'code' },
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

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])


    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <div>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        PostEditor.toggleBoldMark(editor)
                    }}
                >
                    Bold
                </button>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        PostEditor.toggleCodeBlock(editor)
                    }}
                >
                    Code Block
                </button>
            </div>

            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={event => {
                    if (!event.ctrlKey) return
                    switch (event.key) {
                        case '`': {
                            event.preventDefault()
                            PostEditor.toggleCodeBlock(editor)
                            break
                        }
                        case 'b': {
                            event.preventDefault()
                            PostEditor.toggleBoldMark(editor)
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

// Define a React component to render leaves with bold text.
const Leaf = (props: any) => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
            {props.children}
        </span>
    )
}



