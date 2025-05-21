import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProductForm from './Components/ProductForm';
import OrderList from './Components/OrderList';
import OrderForm from './Components/OrderForm';
import OrderDetails from './Components/OrderDetails';
import ProductList from './Components/ProductList';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/create-product" element={<ProductForm />} /> 
        <Route path="/products" element={<ProductList />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/create-order" element={<OrderForm />} />

      </Routes>
    </Router>
  );
}
//added urikanh

export default App;