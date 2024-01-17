import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./components/style/GlobalStyle";
import Routers from "./routes/Routers";
import "react-toastify/dist/ReactToastify.css";
import { Zoom } from "react-toastify";
import "./components/style/font.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routers />
      <ToastContainer transition={Zoom} />
    </>
  );
}
export default App;
