import reactRefresh from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import { extendTheme, pigment } from '@stylefusion/vite-plugin';
import { getPigmentCSSTheme } from '@raikou/system';
import { config } from "vinxi/plugins/config";

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
          transformLibraries: ['@raikou/core', '@raikou/system'],
        }),
        reactRefresh(),
        config("custom", {
          resolve: {        
            alias: {
              'prop-types': 'prop-types/prop-types.js',
              'react-is': 'react-is/cjs/react-is.development.js',
              'flush-sync': 'flush-sync/dist/flush-sync.js',
              // 'hoist-non-react-statics': 'hoist-non-react-statics/dist/hoist-non-react-statics.js'
            }  
          }
        }),
      ],
    },
  ],
});
