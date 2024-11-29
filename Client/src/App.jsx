import { Routes , Route, BrowserRouter } from "react-router-dom"
import HomePage from "./Components/HomePage/HomePage"
import AllProblems from "./Components/AllProblems/AllProblems"
import ProblemsPage from "./Components/ProblemsPage/ProblemsPage"
import Signup from "./Components/Signup/Signup"
import Login from "./Components/Login/Login"

import './App.css'

function App() {

  return (
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/problems' element={<AllProblems />}></Route>
        <Route path="/problems/:pid/" element={<ProblemsPage />}></Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  )
}

export default App
 