import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

Office.onReady(() => {
  root?.render(
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  );
});

if (module.hot) {
  module.hot.accept("./components/App", () => {
    void import("./components/App").then(({ default: NextApp }) => {
      root?.render(
        <FluentProvider theme={webLightTheme}>
          <NextApp />
        </FluentProvider>
      );
    });
  });
}
