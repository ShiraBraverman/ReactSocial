import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './css/App.css'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import UserDetails from './pages/UserDetails'
import HomeNav from "./pages/HomeNav"
import { createContext, useState } from 'react';

export const UserContext = createContext();

function App() {

  const [user, setUser] = useState();

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Navigate to="/LogIn" />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/home/*" element={<HomeNav />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}

export default App