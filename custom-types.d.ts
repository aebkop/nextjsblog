// TypeScript Users only add this code
import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'


export type CodeElement = {
  type: 'code'
  children: CustomText[]
}

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type Mark = {
  bold?: boolean
}



export type CustomElement = ParagraphElement | CodeElement 
export type FormattedText = Mark & { text: string }
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor


export type CustomText = FormattedText


declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}

