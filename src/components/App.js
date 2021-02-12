import React from "react";
import Header from "./Header";
// import KegList from "./KegList";
import KegControl from "./KegControl";

function App(){
  return(
    <React.Fragment>
      <div class="header">
        <Header />
        <KegControl />
      </div>
    </React.Fragment>
  );
}

export default App;