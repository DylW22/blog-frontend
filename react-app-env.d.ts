// src/react-app-env.d.ts
import * as React from "react";

declare module "react" {
  interface FunctionComponent {
    whyDidYouRender?: boolean;
  }
}
