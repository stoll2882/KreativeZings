import React, { createContext, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import useGlobalState from './store/useGlobalState';
import Context from './store/context';
import { ReactReduxContext } from 'react-redux';
import UserProvider from './store/context';
import { UserContext } from './store/context';

// class App extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <Router>
//           <Routes />
//         </Router>
//       </React.Fragment>
//     );
//   }
// }

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
