import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "./assets/Home";
import { About } from "./assets/About";
import { Register } from "./assets/Register";
import { Login } from "./assets/Login";
import { Logout } from "./assets/Logout";
import { Navbar } from "./components/Navbar";
import {Contact} from "./assets/Contact";
import { Service } from "./assets/Service";
const App = ()=>{
  return <>
    
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Service />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  
  </>
};



export default App;