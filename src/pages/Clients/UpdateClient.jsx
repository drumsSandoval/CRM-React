import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import Api from "../../Api";
import { withRouter } from "react-router-dom";

const UpdateClient = (props) => {
  const { id } = props.match.params;
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [complete, setComplete] = useState(true);
  const [loading, setLoading] = useState(true);
  function _fetchClient() {
    Api.getClient(
      id,
      (response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.data) {
              setBusiness(data.data.business);
              setEmail(data.data.email);
              setLastName(data.data.lastName);
              setName(data.data.name);
              setPhone(data.data.phone);
              setLoading(false);
            }
          });
        } else {
          props.history.push("/");
        }
      },
      (err) => {
        props.history.push("/");
      }
    );
  }
  useEffect(() => {
    if (loading) {
      _fetchClient();
    } else {
      validateForm();
    }
  }, [loading]);
  const validateForm = () => {
    if (
      name.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      business.trim() === "" ||
      phone.trim() === ""
    ) {
      return complete ? null : setComplete(true);
    }
    return !complete ? null : setComplete(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (complete) {
      return;
    }
    setComplete(true);
    const client = {
      name,
      lastName,
      email,
      business,
      phone,
    };
    Api.updateClient(
      id,
      client,
      (response) => {
        if (response.status === 200) {
          response
            .json()
            .then((data) => {
              console.log("Data: ", data);
              swal(
                "Actualizacion Exitosa",
                "Se actualizo la informacion",
                "success"
              );
              props.history.push("/");
            })
            .catch((err) => console.log("err: ", err));
        } else {
          swal("Hubo un error", "Intentalo mas tarde", "error");
          setEmail("");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <>
      <h2>Modificar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="name"
            onChange={(e) => {
              validateForm();
              setName(e.target.value);
            }}
            onBlur={() => validateForm()}
            value={name}
          />
        </div>
        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="lastName"
            onChange={(e) => {
              validateForm();
              setLastName(e.target.value);
            }}
            onBlur={() => validateForm()}
            value={lastName}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="business"
            onChange={(e) => {
              validateForm();
              setBusiness(e.target.value);
            }}
            onBlur={() => validateForm()}
            value={business}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={() => {}}
            value={email}
            onBlur={() => validateForm()}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            onBlur={() => validateForm()}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={complete}
          />
        </div>
      </form>
    </>
  );
};

export default withRouter(UpdateClient);
