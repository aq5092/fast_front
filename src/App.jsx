import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'

import Home from './components/Home.jsx'
import ListUser from './components/List.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ListUser />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
