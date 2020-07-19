import React from "react";
import { Link } from "react-router-dom";
import Api from "../Api";
const Product = ({ data, _deleteProduct }) => {
  console.log(data);
  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{data.name}</p>
        <p className="precio">$ {data.price} </p>
        {data.image ? (
          <img src={`${Api.getURL()}/${data.image}`} alt={"Imagen/Producto"} />
        ) : null}
      </div>
      <div className="acciones">
        <Link to={`/products/update/${data._id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => _deleteProduct(data._id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
};

export default Product;
