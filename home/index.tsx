/// <reference types="vinxi/types/client" />
import ReactDOM from "react-dom/client";
import { RaikouProvider } from '@raikou/system';
import { emotionTransform, RaikouEmotionProvider } from "@raikou/emotion";

import '@raikou/system/styles.css';
import '@stylefusion/react/styles.css';
import { Badge } from "@raikou/core";


function App() {
  return (
    <Badge variant="filled">hello</Badge>
  );
}

function Root() {
  return (
    <RaikouProvider stylesTransform={emotionTransform}>
      <RaikouEmotionProvider>
        <App />
      </RaikouEmotionProvider>
    </RaikouProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
