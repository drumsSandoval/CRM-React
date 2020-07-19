import React, { useState, useEffect, useContext } from "react";
import swal from "sweetalert";
import { withRouter } from "react-router-dom";
import Api from "../../Api";
import Spinner from "../../components/Spinner";
import { CRMContext } from "../../context";

const NewProduct = ({ history }) => {
  const [auth, _] = useContext(CRMContext);
  useEffect(() => {
    if (!auth.auth) {
      history.push("/login");
    }
  }, [auth.auth]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [complete, setComplete] = useState(false);
  const [fetch, setFetch] = useState(false);
  function _validateForm() {
    if (!image || name.trim() === "" || price.trim() === "") {
      return !complete ? null : setComplete(false);
    }
    return complete ? null : setComplete(true);
  }
  useEffect(() => {
    if (fetch) {
      _addProduct();
    }
  }, [fetch]);
  function _addProduct() {
    var formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    setTimeout(() => {
      Api.addProduct(
        formData,
        (response) => {
          console.log("response: ", response);
          if (response.status === 200) {
            swal("Producto Agregado", "", "success");
            setFetch(false);
            history.push("/products");
          } else {
            swal("Hubo un error", "Vuelve a intertalo", "error");
            setFetch(false);
            history.push("/login");
          }
        },
        (err) => {
          swal("Hubo un error", "Vuelve a intertalo", "error");
          setFetch(false);
          history.push("/login");
        }
      );
    }, 2000);
  }
  return (
    <>
      <h2>Nuevo Producto</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFetch(true);
        }}
      >
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            onBlur={_validateForm}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            onBlur={_validateForm}
          />
        </div>
        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            min="0.00"
            step="0.1"
            placeholder="Precio"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
            onBlur={_validateForm}
          />
        </div>

        {!fetch ? (
          <div className="enviar">
            <input
              type="submit"
              className="btn btn-azul"
              value="Agregar Producto"
              disabled={!complete}
            />
          </div>
        ) : (
          <Spinner />
        )}
      </form>
    </>
  );
};

export default withRouter(NewProduct);
