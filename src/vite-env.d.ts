/// <reference types="vite/client" />
//

interface ImportMetaEnv {
  readonly ENDPOINT: string
  // more env variables...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
