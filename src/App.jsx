import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Components/Body/Body";
import Bottles from "./Components/Bottles/Bottles";
import Header from "./Components/Home/Header";
import CartPage from "./Components/Cart/CartPage"; // Import your CartPage

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/bottles" element={<Bottles />} />
        <Route path="/cart" element={<CartPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
