import React, { createContext, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    // <UserContext.Provider value={userName}>
      <Router>
        <Routes />
      </Router>
    // </UserContext.Provider>
  );
}

export default App;
