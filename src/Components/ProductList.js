import { useEffect, useState } from 'react';
import { GetAllProducts, CreateOrder } from '../Services/Api';

function ProductList() {
  const [products, setProducts] = useState([]); // All available products
  const [selectedProducts, setSelectedProducts] = useState([]); // Store selected product IDs
  const [totalPrice, setTotalPrice] = useState(0); // Track total price dynamically

  useEffect(() => {
    GetAllProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSelect = (id, price) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );

    setTotalPrice((prev) =>
      selectedProducts.includes(id) ? prev - price : prev + price
    );
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
    <div className="container">
      <h2>Select Products to Order</h2>
      <table className="table">
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
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total Price: <strong>${totalPrice.toFixed(2)}</strong></h4>

      <button className="btn btn-primary" onClick={handleCreateOrder}>
        🛒 Create Order
      </button>
    </div>
  );
}




export default ProductList;
