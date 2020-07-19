import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Aside from "./components/layout/Aside";
import Clients from "./pages/Clients/Clients";
import NewClient from "./pages/Clients/NewClient";
import UpdateClient from "./pages/Clients/UpdateClient";
import Products from "./pages/Products/Products";
import UpdateProduct from "./pages/Products/UpdateProduct";
import NewProduct from "./pages/Products/NewProduct";
import Orders from "./pages/Orders/Orders";
import NewOrder from "./pages/Orders/NewOrder";
import Login from "./pages/Login";
import { CRMContext, CRMProvider } from "./context";
function App() {
  return (
    <BrowserRouter>
      <CRMProvider>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Aside />
          <main className="caja-contenido col-9">
            <Switch>
              <Route exact path="/" component={Clients} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/products/new" component={NewProduct} />
              <Route
                exact
                path="/products/update/:id"
                component={UpdateProduct}
              />
              <Route exact path="/orders" component={Orders} />
              <Route exact path="/client/new" component={NewClient} />
              <Route exact path="/client/update/:id" component={UpdateClient} />
              <Route exact path="/order/new/:idClient" component={NewOrder} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </main>
        </div>
      </CRMProvider>
    </BrowserRouter>
  );
}

export default App;
