import { Base64, JSFile } from '.'

export async function getFileBase64(file: JSFile) {
  return new Promise<Base64>((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('error', reject)
    reader.addEventListener('load', () => {
      const base64 = reader.result
      resolve(base64)
    })

    reader.readAsDataURL(file)
  })
}

export function createFileId() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const length = 15

  const res: string[] = []

  for (let i = 0; i < length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)]
    res.push(char)
  }

  return res.join('')
}
