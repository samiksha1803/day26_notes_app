import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Create from "./Create";
import Update from "./Update";
import Show from "./Show";
import NavBar from "./NavBar"; // ✅ Import the new NavBar
import "./App.css";

function App() {
  return (
	<>
	<h1> Notes App </h1>
    <Router>
      <NavBar /> {/* ✅ Use the NavBar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/show/:id" element={<Show />} />
      </Routes>
    </Router>
</>
  );
}

export default App;
