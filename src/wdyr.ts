/// <reference types="@welldone-software/why-did-you-render" />
import React from "react";
import wdyr from "@welldone-software/why-did-you-render";

if (!import.meta.env.VITE_ENVIRONMENT) {
  throw new Error("VITE_ENVIRONMENT must be defined.");
}

if (import.meta.env.VITE_ENVIRONMENT === "development") {
  wdyr(React, {
    include: [/.*/],
    trackHooks: true,
    trackAllPureComponents: true,
    logOwnerReasons: true,
  });
}
