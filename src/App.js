import React, { Fragment, useEffect } from 'react'
import './App.css'
import Home from './components/Home'
import { SET_THEME } from './state/actions'
import { useStateValue } from './state/AppDataProvider'
import ReactGA from 'react-ga'


function App() {

  const [{ }, dispatcher] = useStateValue()

  useEffect(() => {
    ReactGA.initialize('G-4D856L25B6')
    const time = new Date().getHours()
    if (time < 15 && time > 6) {
      dispatcher({
        type: SET_THEME
      })
    }
  }, [])

  return (
    <Fragment>
      <Home />
    </Fragment>
  )
}

export default App
