import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import ScrollToTop from "./components/common/ScrollToTop";

const container = document.getElementById("root")!;
const root = createRoot(container);
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
