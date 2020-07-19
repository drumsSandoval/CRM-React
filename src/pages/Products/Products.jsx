import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Api from "../../Api";
import Product from "../../components/Product";
import Spinner from "../../components/Spinner";
const Products = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [fetch, setFetch] = useState(true);
  function _fetchItems() {
    Api.getItems(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          response
            .json()
            .then((data) => {
              setProducts(data.data);
              setFetch(false);
            })
            .catch((err) => {
              console.log(err);
              setFetch(false);
              history.push("/login");
            });
        } else {
          setFetch(false);
          history.push("/login");
        }
      },
      (err) => {
        console.log(err);
        setFetch(false);
        history.push("/login");
      }
    );
  }
  useEffect(() => {
    if (fetch) {
      _fetchItems();
    }
  }, [fetch]);
  const _deleteProduct = (_id) => {
    swal({
      title: "¿Estas Seguro?",
      text: "Un producto eliminado no se puede recuperar",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willdelete) => {
      if (willdelete) {
        Api.deleteProduct(
          _id,
          (response) => {
            console.log(response);
            if (response.status === 200) {
              response.json().then((data) => {
                console.log(data);
                setFetch(true);
                swal("Producto Eliminado!", data.msn, "success");
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  };
  return fetch ? (
    <Spinner />
  ) : (
    <>
      <h2>Productos</h2>
      <Link to="/products/new" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {products.map((product) => (
          <Product
            key={product._id}
            data={product}
            _deleteProduct={_deleteProduct}
          />
        ))}
      </ul>
    </>
  );
};

export default Products;
