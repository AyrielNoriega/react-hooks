import { useState } from 'react'
import './App.css'
import { Characters, Header } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Header />
        <Characters />
    </>
  )
}

export default App
