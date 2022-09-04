export * from './accepts'
import React from 'react'
import { Accepts } from './accepts'

export type Base64 = string | null | ArrayBuffer

export type JSFile = globalThis.File

export type File = {
  id: string
  base64: Base64
  data: JSFile
}

export type FileInputHelpers = {
  clearFiles: () => void
  requestFiles: () => void
}

export type FileInputRef = FileInputHelpers & {
  files: File[]
  inputRef: React.RefObject<HTMLInputElement>
}

export type FileInputChildrenProps = FileInputHelpers & {
  files: File[]
}

type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'hidden' | 'type' | 'ref' | 'multiple' | 'accept'>

export type FileInputProps = {
  accepts?: Accepts | Accepts[]
  isMultiple?: boolean
  parseBase64?: boolean
  onUpload?: (files: File[], helpers: FileInputHelpers) => void
  children?: React.ReactNode | ((props: FileInputChildrenProps) => React.ReactNode)
  inputProps?: InputProps
}
