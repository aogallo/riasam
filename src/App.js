import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import 'semantic-ui-css/semantic.min.css'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import './App.css';

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

// import SideMenu from './components/SideMenu'
import Login from './pages/Login';
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container style={{ marginTop: 20 }}>
          {/* <SideMenu /> */}
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
        </Container>
      </Router>
    </AuthProvider>

  );
}

export default App;
