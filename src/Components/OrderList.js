import { useEffect, useState } from 'react';
import { GetAllOrders } from '../Services/Api';
function OrderList() {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    GetAllOrders()
      .then((response) => setOrders(response.data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div className="container">
      <h2>Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderDate}</td>
              <td>${order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;