import React, { useState, useContext } from "react";
import Api from "../Api";
import { CRMContext } from "../context";
import swal from "sweetalert";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [auth, setAuth] = useContext(CRMContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email,
      password,
    };
    Api.signIn(
      credentials,
      (response) => {
        console.log(response);
        response.json().then((data) => {
          if (response.status !== 200) {
            swal(data.msn, "", "error");
          } else {
            localStorage.setItem("token", data.token);
            setAuth({ auth: true, jwt: data.token });
            Api.initSession(data.token);
            swal("Perfecto", "Haz Iniciado Sesion :3", "success");
            props.history.push("/");
          }
        });
      },
      (err) => {
        swal("Error", "Hubo un error :(", "error");
      }
    );
  }
  return (
    <div className="login">
      <h2>Iniciar Sesion</h2>
      <div className="contenedor-formulario">
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="excample@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="campo">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <input
            type="submit"
            className="btn btn-verde btn-block"
            onChange={() => {}}
          />
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
