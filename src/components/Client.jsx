import React from "react";
import { Link } from "react-router-dom";
const Client = ({ data, _deleteClient }) => {
  console.log(data);

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">{data.name + " " + data.lastName}</p>
        <p className="empresa">{data.business}</p>
        <p>{data.email}</p>
        <p>Tel: {data.phone}</p>
      </div>
      <div className="acciones">
        <Link to={`/client/update/${data._id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>
        <Link to={`/order/new/${data._id}`} className="btn btn-amarillo">
          <i className="fas fa-plus"></i>
          Nuevo Pedido
        </Link>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => _deleteClient(data._id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
};

export default Client;
