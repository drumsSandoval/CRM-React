import React, { useContext } from "react";
import { CRMContext } from "../../context";
import { Link } from "react-router-dom";

const Aside = () => {
  const [auth, _] = useContext(CRMContext);
  if (!auth.auth) return null;
  return (
    <aside className="sidebar col-3">
      <h2>Administración</h2>
      <nav className="navegacion">
        <Link to="/" className="clientes">
          Clientes
        </Link>
        <Link to="/products" className="productos">
          Productos
        </Link>
        <Link to="/orders" className="pedidos">
          Pedidos
        </Link>
      </nav>
    </aside>
  );
};

export default Aside;
