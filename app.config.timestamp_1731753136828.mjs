// app.config.mjs
import reactRefresh from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import { extendTheme, pigment } from "@stylefusion/vite-plugin";
import { getPigmentCSSTheme } from "@raikou/system";
import { config } from "vinxi/plugins/config";
import { path } from "node:path";
var { cssTheme, rawTheme } = getPigmentCSSTheme();
var theme = extendTheme({
  cssVarPrefix: "raikou",
  getSelector: (colorScheme) => colorScheme ? `[data-raikou-color-scheme='${colorScheme}']` : ":root",
  ...cssTheme
});
console.log(path);
var app_config_default = createApp({
  routers: [
    {
      name: "client",
      type: "spa",
      handler: "./index.html",
      target: "browser",
      plugins: () => [
        pigment({
          atomic: false,
          theme,
          rawTheme,
          transformLibraries: ["@raikou/core", "@raikou/system", "@raikou/emotion"]
        }),
        reactRefresh(),
        config("custom", {
          resolve: {
            alias: {
              "prop-types": "prop-types/prop-types.js",
              "react-is": "react-is/cjs/react-is.development.js",
              "flush-sync": "flush-sync/dist/flush-sync.js",
              "hoist-non-react-statics": "hoist-non-react-statics/dist/hoist-non-react-statics.cjs",
              "html-react-parser": "/Users/paul/development/src/github/tanstack/vinxi/node_modules/html-react-parser/dist/html-react-parser.js"
            }
          }
        })
      ]
    }
  ]
});
export {
  app_config_default as default
};
