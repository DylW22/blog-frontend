/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TEST: string;
  readonly VITE_ENVIRONMENT: "production" | "development";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
