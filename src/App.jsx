import { useState } from 'react'
import './App.css'
import UserDashboard from './User_dashboard/userdashboard.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserDashboard />
     
    </>
  )
}

export default App
