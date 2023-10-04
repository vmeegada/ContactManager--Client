//import logo from './logo.svg';
import Login from "./pages/Login"
import SignUp from './pages/Signup';
import  Home from "./pages/Home"
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
 


function App() {
  const [user, setUser] = useState('');
  const [userContacts, setUserContacts] = useState([]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login user={user} setUser={setUser} setUserContacts={setUserContacts}/>} />
        <Route path="Signup" element={<SignUp />} />
        <Route path="/Home" element={<Home userId={user} setUser={setUser} userContacts={userContacts} />} />
      </Routes>
    </div>
  );
}
export default App