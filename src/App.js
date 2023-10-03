//import logo from './logo.svg';
import Login from "./pages/Login"
import SignUp from './pages/Signup';
import  Home from "./pages/Home"
import { Routes, Route } from "react-router-dom";
 


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Signup" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
}
export default App