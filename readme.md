👽 Simple unstyled file input for React.

**Installation**
`yarn add @magrathea42/react-input-file`

---

# Props

**accepts** `string | string[]`
The _accept_ property for the HTML input. Can be any of the pre-defined types or a custom string/array.

_default_: `undefined` (all file types)

---

**isMultiple** `boolean`
Whether or not to allow multiple file entries.

_default_: `false`

---

**onUpload** `function`
The callback function that will be executed after the files were uploaded. It receives the files as the first parameter and helpers functions as the second.

_default_: `undefined`

---

**parseBase64** `boolean`
Whether or not to parse the uploaded files to base64. It happens asynchronously before the `onUpload` callback using the `getFileBase64` function, which is also
exported by the lib if you wish to use it.

_default_: `false`

---

**inputProps** `object`
The HTML input props. These will not overwrite any of the default input settings used by this lib.

_default_: `undefined`

---

**children** `function | ReactNode`
The children will be rendered after the HTML input. It can be a simple ReactNode, or a custom function, which receives the uploaded files and the helpers such as the examples bellow.

_default_: `undefined`

---

# Examples

Here are some simple usage examples, but I bet you can get more creative then this.

---

A really basic usage that will probably attend most of the cases.

```tsx
import { FileInput } from '@magrathea42/react-file-input'

export default function App() {
  return (
    <FileInput onUpload={(files) => console.log(files)}>
      {({ requestFiles }) => (
        <button type='button' onClick={requestFiles}>
          Upload files
        </button>
      )}
    </FileInput>
  )
}
```

---

More of the data provided for the children component.

```tsx
import { FileInput } from '@magrathea42/react-file-input'

export default function App() {
  return (
    <FileInput isMultiple>
      {({ files, requestFiles, clearFiles }) => (
        <>
          <button type='button' onClick={requestFiles}>
            Upload files
          </button>

          {files.length > 0 && (
            <>
              <button type='button' onClick={clearFiles}>
                Remove files
              </button>

              <div>
                Your files:
                <ul>
                  {files.map((file) => (
                    <li key={file.id}>{file.data.name}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </FileInput>
  )
}
```

---

Simple image previewing.

```tsx
import { FileInput } from '@magrathea42/react-file-input'

export default function App() {
  return (
    <FileInput accepts={['.jpg', '.jpeg', '.png']} parseBase64>
      {({ files, requestFiles }) => {
        const imageBase64 = files[0]?.base64 as string

        return (
          <div>
            <button type='button' onClick={requestFiles}>
              Upload profile picture
            </button>

            <br />

            {imageBase64 && <img width='400' src={imageBase64} alt='' />}
          </div>
        )
      }}
    </FileInput>
  )
}
```

---

Using with hooks.

```tsx
import { File, FileInput, FileInputRef } from '@magrathea42/react-file-input'
import { useEffect, useRef, useState } from 'react'

export default function App() {
  const fileInputRef = useRef<FileInputRef>(null)

  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    console.log(files)
  }, [files])

  return (
    <div>
      <FileInput
        ref={fileInputRef}
        accepts='image/*'
        isMultiple
        onUpload={(files, helpers) => {
          setFiles((prev) => [...prev, ...files])
          helpers.clearFiles()
        }}
      />

      <button type='button' onClick={() => fileInputRef.current?.requestFiles()}>
        Upload videos
      </button>
    </div>
  )
}
```

---

Any suggestions and tips will always be welcome!
_**~ magrathea42**_ 🪐
