import { Routes, Route } from "react-router";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Account from "./components/Account";
import Settings from "./components/Settings";
import NavDrawer from "./components/navigation/NavDrawer";
import Navbar from "./components/navigation/Navbar";

export default function App() {

  return (<>
  {/* {<Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} */}
  {<Navbar />}
  {<NavDrawer />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
  </>);
}

