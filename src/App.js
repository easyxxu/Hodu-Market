import styled from "styled-components";
import { GlobalStyle } from "./components/style/GlobalStyle";
import Login from "./pages/Login/Login";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      {/* <Home /> */}
      <Login />
    </Container>
  );
}
export default App;
