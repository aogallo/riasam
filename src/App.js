import React from "react";
import { Container } from "semantic-ui-react";

import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import SidebarExampleVisible from './components/SideMenu'
import Login from './pages/Login';

function App() {
  return (
    <Container>
      <Login/>
    </Container>

  );
}

export default App;
