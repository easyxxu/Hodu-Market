import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import ScrollToTop from "./components/common/ScrollToTop";

const container = document.getElementById("root")!;
const root = createRoot(container);

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <BrowserRouter>
      <RecoilRoot>
        <ScrollToTop />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
} else {
  root.render(
    <BrowserRouter>
      <RecoilRoot>
        <ScrollToTop />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}
