import React from 'react'
import Homepage from './Homepage/Homepage'
import SignUp from './SignUp/SignUp'
import Login from './Login/Login'

import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Homepage/>}/>
        <Route path={'/signup'} element={<SignUp/>} />
        <Route path={'/login'} element={<Login/>} />
      </Routes>
      
    </div>
  )
}

export default App
