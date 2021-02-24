import React from "react";
import Header from "./Header";
import KegControl from "./KegControl";
import {Container} from 'react-bootstrap';
function App(){
  return(
    <>
      <Container>
          <Header />
          <KegControl />
      </Container>
    </>
  );
}

export default App;