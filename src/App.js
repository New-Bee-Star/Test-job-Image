import React from 'react'
import { compose } from 'recompose'
import {
  Route, withRouter, Link, BrowserRouter as Router,
} from 'react-router-dom'
import WithErrors from './hocs/WithErrors'
import Popular from './components/FundamentalComponent'

import Search from './components/Search'
import { SocialIcon } from 'react-social-icons';

const App = () => (
  <Router>
    <div className="router-container">
    <div className="brand">
      <img className="logo" src="" alt="Logo" />
    </div>
      <div className="top-bar">
        <h1>
          Show Unsplash HD Images
        </h1>
      </div>
      <aside className="aside">
        <Search />
      </aside>
      <Route exact path="/" component={Popular} />
      <footer>
        <span className="social--icon">
          <SocialIcon url="http://linkedin.com/in/jaketrent" />
        </span>
        <span className="social--icon">
          <SocialIcon url="http://jaketrent.com" network="tumblr" />
        </span>
        <span className="social--icon">
          <SocialIcon network="twitter" bgColor="#ff5a01" />
        </span>
      </footer>
    </div>
  </Router>
)

export default compose(
  WithErrors,
  withRouter,
)(App)
