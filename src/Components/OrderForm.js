import { useEffect, useState } from 'react';
import { GetAllProducts, CreateOrder } from '../Services/Api';

function OrderForm() {
  const [products, setProducts] = useState([]); // Store all available products
  const [selectedProducts, setSelectedProducts] = useState([]); // Store selected product IDs
  const [totalPrice, setTotalPrice] = useState(0); // Track total price

  useEffect(() => {
    GetAllProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleProductSelect = (id, price) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );

    setTotalPrice((prev) =>
      selectedProducts.includes(id) ? prev - price : prev + price
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProducts.length === 0) {
      alert('Please select at least one product.');
      return;
    }
    const order = { products: selectedProducts.map((id) => ({ id })) };
    CreateOrder(order)
      .then(() => alert('Order placed successfully!'))
      .catch((error) => console.error('Error creating order:', error));
  };

  return (
    <div className="container">
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Products</label>
          {products.map((product) => (
            <div key={product.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleProductSelect(product.id, product.price)}
              />
              <label className="form-check-label">
                {product.name} (${product.price})
              </label>
            </div>
          ))}
        </div>

        <h4>Total Price: <strong>${totalPrice.toFixed(2)}</strong></h4>

        <h4>Selected Products:</h4>
        {selectedProducts.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((id) => {
                const product = products.find((p) => p.id === id);
                return (
                  <tr key={id}>
                    <td>{product?.name}</td>
                    <td>${product?.price}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleProductSelect(id, product.price)}
                      >
                        ❌ Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No products selected yet.</p>
        )}

        <button type="submit" className="btn btn-primary">Confirm Order</button>
      </form>
    </div>
  );
}
// order
export default OrderForm;
