import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./components/style/GlobalStyle";
import Routers from "./routes/Routers";
import "react-toastify/dist/ReactToastify.css";
import { Zoom } from "react-toastify";
import "./components/style/font.css";
import { Modals } from "./components/common/Modal/Modals";
import styled from "styled-components";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <Wrap>
      <GlobalStyle />
      <Layout>
        <Routers />
        <ModalContainer>
          <Modals />
        </ModalContainer>
      </Layout>
      <ToastContainer transition={Zoom} />
    </Wrap>
  );
}
export default App;

const Wrap = styled.div`
  position: relative;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;
