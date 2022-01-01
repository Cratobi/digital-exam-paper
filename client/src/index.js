// Bareminimum React
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'

// React Router
import { BrowserRouter as Router } from 'react-router-dom'

// Redux
import { Provider } from 'react-redux'
import store from './store'

import App from './features/App'
import './style/index.scss'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
