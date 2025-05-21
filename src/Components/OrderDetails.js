import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetOrderById } from '../Services/Api';

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    GetOrderById(id)
      .then((response) => setOrder(response.data))
      .catch((error) => console.error('Error fetching order jay:', error));
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Order Details</h2>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>Date:</strong> {order.orderDate}</p>
      <p><strong>Total Price:</strong> ${order.totalPrice}</p>
      <h4>Products</h4>
      <ul>
        {order.products.map((product) => (
          <li key={product.id}>{product.name} (${product.price})</li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetails;