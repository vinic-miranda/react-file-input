import React, { useCallback, forwardRef, useRef, useState, useImperativeHandle, useMemo } from 'react'
import { FileInputProps, FileInputRef, getFileBase64, createFileId, File, FileInputHelpers } from '..'

const FileInputInner = (
  { accepts, isMultiple, parseBase64, children, inputProps, onUpload }: FileInputProps,
  ref?: React.ForwardedRef<FileInputRef>,
) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [files, setFiles] = useState<File[]>([])

  const requestFiles = useCallback(() => inputRef.current?.click(), [])

  const clearFiles = useCallback(() => {
    setFiles([])

    if (!inputRef.current) return
    inputRef.current.value = ''
    inputRef.current.files = null
  }, [])

  const helpers: FileInputHelpers = useMemo(
    () => ({
      clearFiles,
      requestFiles,
    }),
    [clearFiles, requestFiles],
  )

  useImperativeHandle(
    ref,
    () => ({
      files,
      inputRef,
      ...helpers,
    }),
    [files, helpers],
  )

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const jsFiles = Array.from(event.target.files || [])

    const promises = jsFiles.map(async (data) => {
      const file: File = {
        id: createFileId(),
        data,
        base64: parseBase64 ? await getFileBase64(data) : null,
      }

      return file
    })

    const files = await Promise.all(promises)
    setFiles(files)
    onUpload?.(files, helpers)
  }

  return (
    <>
      <input
        {...inputProps}
        hidden
        type='file'
        ref={inputRef}
        accept={typeof accepts === 'string' ? accepts : accepts?.join(',')}
        multiple={isMultiple}
        onChange={(event) => {
          inputProps?.onChange?.(event)
          onChange(event)
        }}
      />

      {typeof children == 'function' ? children({ files, ...helpers }) : children}
    </>
  )
}

export const FileInput = forwardRef<FileInputRef, FileInputProps>(FileInputInner)
