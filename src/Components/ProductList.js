import { useEffect, useState } from 'react';
import { GetAllProducts, CreateOrder } from '../Services/Api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    GetAllProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSelect = (id, price) => {
    setSelectedProducts((prev) => {
      if (prev.includes(id)) {
        setTotalPrice((prevPrice) => prevPrice - price);
        return prev.filter((p) => p !== id);
      } else {
        setTotalPrice((prevPrice) => prevPrice + price);
        return [...prev, id];
      }
    });
  };

  const handleCreateOrder = () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product.');
      return;
    }
    const order = { products: selectedProducts.map((id) => ({ id })) };
    CreateOrder(order)
      .then(() => {
        alert('Order created successfully!');
        setSelectedProducts([]);
        setTotalPrice(0);
      })
      .catch((error) => console.error('Error creating order:', error));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Select Products to Order</h2>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelect(product.id, product.price)}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total Price: <strong>${totalPrice.toFixed(2)}</strong></h4>

          <button className="btn btn-primary" onClick={handleCreateOrder}>
            🛒 Create Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;