import React, { useEffect, useState } from "react";
import Api from "../../Api";
import Order from "./Order";
const Orders = ({ history }) => {
  const [orders, setOrders] = useState([]);
  const [fetch, setFetch] = useState(false);
  useEffect(() => {
    _fetchOrders();
  }, []);
  function _fetchOrders() {
    Api.getOrders(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          response.json().then((data) => {
            setOrders(data);
          });
        } else {
          setFetch(false);
          history.push("/login");
        }
      },
      (err) => {
        setFetch(false);
        history.push("/login");
      }
    );
  }
  return (
    <>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
        {orders.map((item) => (
          <Order order={item} key={item._id} />
        ))}
      </ul>
    </>
  );
};

export default Orders;
