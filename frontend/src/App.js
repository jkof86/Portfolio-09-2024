import { Routes, Route } from "react-router";
import Navbar from "./components/navigation/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Account from "./components/Account";
import Settings from "./components/Settings";
import Calculator from "./components/Calculator";

export default function App() {

  return (<>
  {/* {<Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} */}
   {<Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
  </>);
}

