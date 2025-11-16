import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import Metrics from "./pages/Metrics";
import Models from "./pages/Models";
import Passenger from "./pages/Passenger";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/models" element={<Models />} />
          <Route path="/passenger" element={<Passenger />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App

