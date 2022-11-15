import "./style.css";
import TheNav from "./Components/TheNav";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ErrorPage from "./Components/ErrorPage";
import LoginPage from "./Components/LoginPage";
import TheCart from "./Components/TheCart";
function App() {
  return (
    <div className="App">
      <TheNav />
      <Routes>
        <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<TheCart />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
