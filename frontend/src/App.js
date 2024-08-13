import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Toolbar from "./components/navigation/Toolbar";
import NavDrawer from "./components/navigation/NavDrawer";

export default function App() {

  return (<>
  {<Toolbar />}
  {<NavDrawer />}
      <Routes>
        <Route path="" element={<Home />} />
      </Routes>
  </>);
}

