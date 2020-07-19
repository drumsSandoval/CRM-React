import React, { useContext } from "react";
import { CRMContext } from "../../context";
import { withRouter } from "react-router-dom";
const Header = (props) => {
  const [auth, setAuth] = useContext(CRMContext);

  return (
    <header className="barra">
      <div className="contenedor">
        <div className="contenido-barra">
          <h1>CRM - Administrador de Clientes</h1>
          {auth.auth && (
            <button
              type="button"
              className="btn btn-rojo"
              onClick={() => {
                setAuth({ jwt: "", auth: "" });
                localStorage.setItem("token", "");
                props.history.push("/login");
              }}
            >
              <i className="far fa-times-circle"></i>
              Cerrar Sesion
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
