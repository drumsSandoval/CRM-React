import React from "react";

const QuantityProducts = ({ item, updateQuantityProducts, deleteProduct }) => {
  return (
    <li>
      <div className="texto-producto">
        <p className="nombre">{item.name}</p>
        <p className="precio">${item.price}</p>
      </div>
      <div className="acciones">
        <div className="contenedor-cantidad">
          <i
            className="fas fa-minus"
            onClick={() => {
              updateQuantityProducts({
                type: "decrease",
              });
            }}
          ></i>
          <p>{item.quantity}</p>
          <i
            className="fas fa-plus"
            onClick={() => {
              updateQuantityProducts({
                type: "increase",
              });
            }}
          ></i>
        </div>
        <button
          type="button"
          className="btn btn-rojo"
          onClick={() => deleteProduct(item.product)}
        >
          <i className="fas fa-minus-circle"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
};

export default QuantityProducts;
