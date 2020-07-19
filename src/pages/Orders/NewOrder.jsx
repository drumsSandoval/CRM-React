import React, { useState, useEffect } from "react";
import Api from "../../Api";
import Search from "../../components/Search";
import swal from "sweetalert";
import QuantityProducts from "../../components/QuantityProducts";
import { withRouter } from "react-router-dom";
const NewOrders = (props) => {
  const { idClient } = props.match.params;
  const [client, setClient] = useState({});
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    function _getClient() {
      Api.getClient(
        idClient,
        (response) => {
          console.log("Response Cliente: ", response);
          if (response.status === 200) {
            response
              .json()
              .then((data) => {
                console.log("data cliente: ", data);
                setClient(data.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
    if (Object.keys(client).length === 0) {
      console.log("entro");
      _getClient();
    }
    updateTotal();
  }, [products]);
  const _searchProduct = (e) => {
    e.preventDefault();
    console.log("Entra");
    Api.searchProduct(
      search,
      (response) => {
        console.log(response);
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.data[0]) {
              let newProduct = data.data[0];
              newProduct["product"] = data.data[0]._id;
              newProduct["quantity"] = 0;
              setProducts([...products, newProduct]);
            } else {
              swal("No hay resultados", "", "error");
            }
          });
        } else {
          swal("No hay resultados", "", "error");
        }
      },
      (err) => {
        swal("Error en la busqueda", "", "error");
      }
    );
  };
  const _readSearchData = (e) => setSearch(e.target.value);
  const updateQuantityProducts = (index, action) => {
    switch (action.type) {
      case "increase": {
        const newProducts = [...products];
        newProducts[index].quantity++;
        return setProducts(newProducts);
      }
      case "decrease": {
        const newProducts = [...products];
        if (newProducts[index].quantity === 0) return;
        newProducts[index].quantity--;
        return setProducts(newProducts);
      }
      default:
        return;
    }
  };
  const updateTotal = () => {
    if (products.length === 0) {
      return setTotal(0);
    }
    let newTotal = 0;
    products.map((product) => (newTotal += product.quantity * product.price));
    setTotal(newTotal);
  };
  const deleteProduct = (id) => {
    const newProducts = products.filter((item) => item.product !== id);
    setProducts(newProducts);
  };
  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      client: idClient,
      products: products,
      total,
    };
    console.log("Order : ", order);
    Api.createNewOrder(
      idClient,
      order,
      (response) => {
        if (response.status === 200) {
          swal("Orden Creada", "Vuelve a intertarlo", "success");
        } else {
          swal("Hubo un error", "Vuelve a intertarlo", "error");
        }
        props.history.push("/orders");
      },
      (err) => {
        swal("Hubo un error", "Vuelve a intertarlo", "error");
        props.history.push("/orders");
      }
    );
  };
  return (
    <>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          Nombre: {client.name} {client.lastName}
        </p>
        <p>Tel: {client.phone}</p>
      </div>
      <Search
        _searchProduct={_searchProduct}
        _readSearchData={_readSearchData}
      />
      <ul className="resumen">
        {products.map((item, index) => (
          <QuantityProducts
            item={item}
            key={item.product}
            updateQuantityProducts={(action) =>
              updateQuantityProducts(index, action)
            }
            deleteProduct={deleteProduct}
          />
        ))}
      </ul>
      <p className="total">
        Total a Pagar: <span>$ {total}</span>
      </p>
      {total > 0 && (
        <form onSubmit={createOrder}>
          <input
            type="submit"
            className="btn btn-verde btn-block"
            value="Realizar Pedido"
          />
        </form>
      )}
    </>
  );
};

export default withRouter(NewOrders);
