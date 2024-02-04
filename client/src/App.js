import React, { useEffect, useState } from 'react';
import HomePage from './Components/HomePage/HomePage'

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return(
    <HomePage />
  )
}

export default App;