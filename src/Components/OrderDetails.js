import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetOrderById } from '../Services/Api';

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    GetOrderById(id)
      .then((response) => setOrder(response.data))
      .catch((error) => console.error('Error fetching order:', error));
  }, [id]);

  if (!order) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Order Details</h2>
        </div>
        <div className="card-body">
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
          <h4>Products</h4>
          <ul className="list-group">
            {order.products.map((product) => (
              <li key={product.id} className="list-group-item">
                {product.name} <span className="badge bg-secondary ms-2">${product.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;