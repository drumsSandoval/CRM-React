const URL = "http://localhost:5000";
class Api {
  static getURL() {
    return URL;
  }
  static initSession(jwt) {
    this.jwt = jwt;
  }
  static signIn(credentials, success, error) {
    let url = URL + "/signin";
    const headers = {};
    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";
    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(credentials),
    }).then(
      (response) => {
        if (success) {
          success(response);
        }
      },
      (err) => {
        if (error) {
          error(err);
        }
      }
    );
  }
  // CLIENTES
  // GET *
  static getClients(success, error) {
    let url = URL + "/clients";
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };
    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => {
        if (success) {
          success(response);
        }
      })
      .catch((response) => {
        if (error) {
          error();
        }
      });
  }
  // GET 1
  static getClient(id, success, error) {
    let url = URL + `/clients/${id}`;
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };
    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => {
        if (success) {
          success(response);
        }
      })
      .catch((err) => {
        if (error) {
          error(error);
        }
      });
  }
  // POST
  static addClient(body, success, error) {
    let url = URL + "/clients";

    const headers = {
      Authorization: "Bearer " + this.jwt,
    };

    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (success) {
          success(response);
        }
      })
      .catch((err) => {
        if (error) {
          error(err);
        }
      });
  }
  // PUT
  static updateClient(id, data, success, error) {
    let url = URL + `/clients/${id}`;
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };
    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";
    fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (success) {
          success(response);
        }
      })
      .catch((err) => {
        if (error) {
          error(err);
        }
      });
  }
  // DELETE
  static deleteClient(id, success, error) {
    let url = URL + `/clients/${id}`;
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };
    fetch(url, {
      method: "DELETE",
      headers,
    })
      .then((response) => {
        if (success) {
          success(response);
        }
      })
      .catch((err) => {
        if (error) {
          error(err);
        }
      });
  }
  // Products
  // GET *
  static getItems(success, error) {
    let url = URL + "/products";
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };
    fetch(url, {
      method: "GET",
      headers,
    }).then(
      (response) => {
        if (success) {
          success(response);
        }
      },
      (err) => {
        if (error) {
          error(err);
        }
      }
    );
  }
  static getItem(id, success, error) {
    const url = `${URL}/products/${id}`;
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };
    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => {
        if (success) {
          success(response);
        }
      })
      .catch((err) => {
        if (error) {
          error(error);
        }
      });
  }
  // DELETE
  static deleteProduct(id, success, error) {
    let url = ` ${URL}/products/${id}`;
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };
    fetch(url, {
      method: "DELETE",
      headers,
    }).then(
      (response) => {
        if (success) {
          success(response);
        }
      },
      (err) => {
        if (error) {
          error(err);
        }
      }
    );
  }
  // POST
  static addProduct(formData, success, error) {
    let url = URL + "/products";
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };
    fetch(url, {
      method: "POST",
      headers,
      body: formData,
    }).then(
      (response) => {
        if (response) {
          success(response);
        }
      },
      (err) => {
        if (error) {
          error(err);
        }
      }
    );
  }
  // PUT
  static updateProduct(_id, formData, success, error) {
    let url = ` ${URL}/products/${_id}`;
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };

    fetch(url, {
      method: "PUT",
      headers,
      body: formData,
    })
      .then((response) => {
        if (success) {
          success(response);
        }
      })
      .catch((err) => {
        if (error) {
          error(err);
        }
      });
  }
  static searchProduct(search, success, error) {
    const url = `${URL}/products/search/${search}`;
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };
    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";
    fetch(url, {
      method: "POST",
      headers: headers,
    })
      .then((response) => {
        if (success) {
          success(response);
        }
      })
      .catch((err) => {
        if (error) {
          error(err);
        }
      });
  }
  static createNewOrder(idUser, order, success, error) {
    const url = `${URL}/orders/${idUser}`;
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };
    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(order),
    })
      .then((response) => {
        if (response) {
          success(response);
        }
      })
      .catch((err) => {
        if (error) {
          error(err);
        }
      });
  }
  static getOrders(success, error) {
    const url = `${URL}/orders`;
    const headers = {
      Authorization: "Bearer " + this.jwt,
    };
    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => {
        if (success) {
          success(response);
        }
      })
      .catch((err) => {
        if (error) {
          error(err);
        }
      });
  }
}

module.exports = Api;
