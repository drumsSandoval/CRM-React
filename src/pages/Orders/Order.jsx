import React from "react";
import Api from "../../Api";

const Order = ({ order }) => {
  console.log(order);
  const { client, products } = order;
  return (
    <li className="pedido">
      <div className="info-pedido">
        <p className="id">ID: {order._id}</p>
        <p className="nombre">Cliente: {client.name + " " + client.lastName}</p>

        <div className="articulos-pedido">
          <p className="productos">Artículos Pedido: </p>
          <ul>
            {products.map((item, index) => {
              const { product } = item;
              return (
                <li key={order._id + index}>
                  <img src={`${Api.getURL()}/${product.image}`} />
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {product.name} <br />
                    Precio:{" "}
                    <span style={{ color: "red" }}>${product.price}</span>{" "}
                    <br />
                    Cantidad: {item.quantity} <br />
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="total">Total: ${order.total} </p>
      </div>
      <div className="acciones">
        <button type="button" className="btn btn-rojo btn-eliminar">
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  );
};

export default Order;
