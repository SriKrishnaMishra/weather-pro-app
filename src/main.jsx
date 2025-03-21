// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { StateContextProvider } from './Context/index.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StateContextProvider } from './Context/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StateContextProvider>
    <App />
  </StateContextProvider>,
)