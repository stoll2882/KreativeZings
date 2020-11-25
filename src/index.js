import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React, { useContext } from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import userContext from './store/context';

// export default function Index() {
//   const userName = useContext(userContext);
//   return (
//     <userContext.Provider value={userName}>
//       <App />
//     </userContext.Provider>
//   )
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <Index />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
