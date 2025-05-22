import { useEffect, useState } from 'react';
import { GetAllProducts, CreateOrder } from '../Services/Api';

function OrderForm() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    GetAllProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleProductSelect = (id, price) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProducts.length === 0) {
      alert('Please select at least one product.');
      return;
    }
    const order = { products: selectedProducts.map((id) => ({ id })) };
    CreateOrder(order)
      .then(() => {
        alert('Order placed successfully!');
        setSelectedProducts([]);
        setTotalPrice(0);
      })
      .catch((error) => console.error('Error creating order:', error));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0">Place Your Order</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Select Products</label>
              {products.map((product) => (
                <div key={product.id} className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleProductSelect(product.id, product.price)}
                  />
                  <label className="form-check-label">
                    {product.name} <span className="badge bg-info">${product.price.toFixed(2)}</span>
                  </label>
                </div>
              ))}
            </div>

            <h4>Total Price: <strong>${totalPrice.toFixed(2)}</strong></h4>

            <h4 className="mt-4">Selected Products:</h4>
            {selectedProducts.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((id) => {
                    const product = products.find((p) => p.id === id);
                    return (
                      <tr key={id}>
                        <td>{product?.name}</td>
                        <td>${product?.price.toFixed(2)}</td>
                        <td>
                          <button
                            type="button"
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
              <p className="text-muted">No products selected yet.</p>
            )}

            <button type="submit" className="btn btn-primary">Confirm Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;