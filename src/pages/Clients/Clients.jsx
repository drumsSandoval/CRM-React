import React, { useEffect, useState, useContext } from "react";
import Client from "../../components/Client";
import Api from "../../Api";
import { CRMContext } from "../../context";
import { Link, withRouter } from "react-router-dom";
import swal from "sweetalert";
import Spinner from "../../components/Spinner";

const Clients = (props) => {
  const [clients, setClients] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [auth, setAuth] = useContext(CRMContext);

  function _fetchClients() {
    const { jwt } = auth;
    Api.getClients(
      (response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.data) setClients(data.data);
            setFetch(false);
          });
        } else {
          setFetch(false);
          props.history.push("/login");
        }
      },
      (err) => {
        setFetch(false);
        console.log("err: ", err);
        props.history.push("/login");
      },
      jwt
    );
  }
  useEffect(() => {
    if (auth.jwt !== "") {
      if (fetch) _fetchClients();
    } else {
      props.history.push("/login");
    }
  }, [fetch, auth.jwt]);

  function _deleteClient(_id) {
    swal({
      title: "¿Estas Seguro?",
      text: "Un cliente eliminado no se puede recuperar",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willdelete) => {
      if (willdelete) {
        Api.deleteClient(
          _id,
          (response) => {
            console.log(response);
            if (response.status === 200) {
              response.json().then((data) => {
                console.log(data);
                setFetch(true);
                swal("Cliente Eliminado!", data.msn, "success");
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
  return fetch ? (
    <Spinner />
  ) : (
    <>
      <h2>Clientes</h2>
      <Link to="/client/new" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {clients.map((client) => (
          <Client
            key={client._id}
            data={client}
            _deleteClient={_deleteClient}
          />
        ))}
      </ul>
    </>
  );
};

export default withRouter(Clients);
