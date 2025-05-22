// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import OrderForm from './Components/OrderForm';
import OrderList from './Components/OrderList';
import OrderDetails from './Components/OrderDetails';
import ProductForm from './Components/ProductForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/order-form" element={<OrderForm />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/create-product" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App; // Ensure this export is present