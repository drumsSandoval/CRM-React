import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import Api from "../../Api";
import { withRouter } from "react-router-dom";
import Spinner from "../../components/Spinner";
const UpdateProduct = (props) => {
  const { id } = props.match.params;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [fetchProduct, setFetchProduct] = useState(true);
  const [fetchUpdate, setFetchUpdate] = useState(false);
  const [complete, setComplete] = useState(false);
  const [changeImage, setChangeImage] = useState({});
  useEffect(() => {
    if (fetchUpdate) {
      _updateProduct();
    } else if (fetchProduct) {
      _fetchItem();
    }
  }, [fetchProduct, fetchUpdate]);

  const _fetchItem = () => {
    Api.getItem(
      id,
      (response) => {
        console.log(response);
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.data) {
              setImage(data.data.image);
              setPrice(data.data.price);
              setName(data.data.name);
            }
          });
        }
        setFetchProduct(false);
      },
      (err) => {
        setFetchProduct(false);
      }
    );
  };

  function _validateForm() {
    if (!image || name.trim() === "" || !price) {
      return !complete ? null : setComplete(false);
    }
    return complete ? null : setComplete(true);
  }
  function _updateProduct() {
    var formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (changeImage.name) {
      formData.append("image", changeImage);
    } else {
      formData.append("image", image);
    }
    setTimeout(() => {
      Api.updateProduct(
        id,
        formData,
        (response) => {
          console.log("response: ", response);
          if (response.status === 200) {
            swal("Producto Actualizado", "", "success");

            props.history.push("/products");
          } else {
            swal("Hubo un error", "Vuelve a intertalo", "error");
          }
          setFetchUpdate(false);
        },
        (err) => {
          swal("Hubo un error", "Vuelve a intertalo", "error");
          setFetchUpdate(false);
          console.log(err);
        }
      );
    }, 2000);
  }
  return fetchProduct ? (
    <Spinner />
  ) : (
    <>
      <h2>Editar Producto</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFetchUpdate(true);
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
        <div className="campo">
          <label>Imagen:</label>
          {changeImage.name ? (
            <img
              src={URL.createObjectURL(changeImage)}
              alt="Imagen de tu producto"
            />
          ) : (
            <img src={`${Api.getURL()}/${image}`} alt={"Imagen/Producto"} />
          )}
          <input
            type="file"
            name="image"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setChangeImage(e.target.files[0]);
            }}
            onBlur={_validateForm}
          />
        </div>
        {!fetchUpdate ? (
          <div className="enviar">
            <input
              type="submit"
              className="btn btn-azul"
              value="Actualizar"
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

export default withRouter(UpdateProduct);
