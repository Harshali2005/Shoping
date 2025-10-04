import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartContextProvider} from '../module/CartContext.jsx';
import './App.css';
import Home from "../pages/Home.jsx";
import Item from "../pages/Item.jsx";
import Cart from "../pages/Cart.jsx";
import Order from "../pages/Order.jsx"
function App() {
  return (
    <CartContextProvider>
      <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/item/:id' element={<Item />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<Order />} />
          </Routes>
      </Router>
    </CartContextProvider>
  )
}

export default App
