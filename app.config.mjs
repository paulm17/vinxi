import reactRefresh from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import { extendTheme, pigment } from '@stylefusion/vite-plugin';
import { getPigmentCSSTheme } from '@raikou/system';
import { config } from "vinxi/plugins/config";
import { dirname } from "node:path";

// get path
const __dirname = dirname(new URL(import.meta.url).pathname);

const { cssTheme, rawTheme } = getPigmentCSSTheme();

const theme = extendTheme({
  cssVarPrefix: 'raikou',
  getSelector: (colorScheme) =>
    colorScheme ? `[data-raikou-color-scheme='${colorScheme}']` : ':root',
  ...cssTheme,
});

export default createApp({
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
          transformLibraries: ['@raikou/core', '@raikou/system', '@raikou/emotion'],
        }),
        reactRefresh(),
        config("custom", {
          resolve: {        
            alias: {
              'prop-types': `${__dirname}/node_modules/prop-types/prop-types.js`,
              'react-is': `${__dirname}/node_modules/react-is/cjs/react-is.development.js`,
              'flush-sync': `${__dirname}/node_modules/flush-sync/dist/flush-sync.js`,
              'hoist-non-react-statics': `${__dirname}/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs`,
              'html-react-parser': `${__dirname}/node_modules/html-react-parser/dist/html-react-parser.js`,
            }  
          }          
        }),
      ],
    },
  ],
});
