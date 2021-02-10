import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import 'semantic-ui-css/semantic.min.css'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import './App.css';

// import SideMenu from './components/SideMenu'
import Login from './pages/Login';
import Home from "./pages/Home";
import { UserProvider } from "./context/userContext";
import AuthRoute from "./util/AuthRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <Container style={{ marginTop: 20 }}>
          {/* <SideMenu /> */}
          <AuthRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
