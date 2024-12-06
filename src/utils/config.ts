const environmentMode: "production" | "development" = import.meta.env
  .VITE_ENVIRONMENT;
if (!environmentMode) {
  throw new Error("Env variable VITE_ENVIRONMENT must be defined.");
}

export const baseURL =
  environmentMode === "development"
    ? "http://127.0.0.1:3000"
    : "https://nodejs-server-neon-iota.vercel.app";

/*
const envVariable: envType = "development";
export const baseURL =
  envVariable === "development"
    ? "http://127.0.0.1:3000"
    : "http://nodejs-server-neon-iota.vercel.app";
*/
