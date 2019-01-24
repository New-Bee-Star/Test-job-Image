import React from 'react'
import Movies from './Movies'

const Popular = () => (
  <div className="container">
    <div className="app">
      <div className="app__header">
        <h1>Popular Images</h1>
      </div>
    </div>
    <Movies type="popular" />
  </div>
)

export default Popular;