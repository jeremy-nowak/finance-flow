import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import AuthScreen from './screens/AuthScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthScreen/>
      <div><p>Starter app</p></div>
    </>
  )
}

export default App
