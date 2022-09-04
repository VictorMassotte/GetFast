import axios from "axios";

axios.defaults.withCredentials = true;

export default class API {
  url = "http://91.236.239.56/api/v1";
  shortURL = "http://91.236.239.56";

  getRestaurants() {
    return fetch(this.url + "/restaurant", { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
        return text;
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  getUsers() {
    return fetch(this.url + "/users", { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
        return text;
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  getRestaurant(idResto) {
    return fetch(this.url + "/restaurant/" + idResto, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
        return text;
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  getCommandes() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/order/", requestOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
        return text;
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  getCommande(id) {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/order/" + id, requestOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
        return text;
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  getCommandeClient(idClient) {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/order/client/" + idClient, requestOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
        return text;
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  getCommandeRestaurant(id) {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/order/restaurant/" + id, requestOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
        return text;
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  login(email, password) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    var requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
    };

    return fetch(this.url + "/auth/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        localStorage.setItem(
          "access_token",
          JSON.parse(result)["access_token"]
        );
        localStorage.setItem(
          "refresh_token",
          JSON.parse(result)["refresh_token"]
        );
        localStorage.setItem("role", JSON.parse(result)["role"]);
        localStorage.setItem("id", JSON.parse(result)["id"]);
        localStorage.setItem("email", JSON.parse(result)["email"]);
        localStorage.setItem("login", true);
      });
  }

  disconnect() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.setItem("login", false);
  }

  getUser(idUser) {
    return fetch(this.url + "/users/" + idUser, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
        return text;
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  getArticle(id) {
    return fetch(this.url + "/article/" + id, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
        return text;
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  checkPassword(email, password) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    var requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
    };

    return fetch(this.url + "/auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
  }

  updateUser(id, values) {
    var raw = JSON.stringify({
      password: values.password,
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      tel: values.tel,
      status: true,
      address: values.address,
      role: values.role,
    });

    console.log(raw);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );

    var requestOptions = {
      method: "PUT",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/users/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  deleteUser(id, localDelete) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
      mode: "cors",
    };

    if (localDelete) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.setItem("login", false);
    }

    return fetch(this.url + "/users/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  register(values) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", values.email);
    urlencoded.append("password", values.password);
    urlencoded.append("firstname", values.firstname);
    urlencoded.append("lastname", values.lastname);
    urlencoded.append("address", values.address);
    urlencoded.append("tel", values.tel);
    urlencoded.append("status", true);
    urlencoded.append("role", values.role);

    var requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
    };

    return fetch(this.url + "/auth/register", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  updateArticle(values) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("name", values.name);
    urlencoded.append("description", values.description);
    urlencoded.append("price", values.price);
    urlencoded.append("type", values.type);
    urlencoded.append("image", values.image);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );

    var requestOptions = {
      method: "PUT",
      body: urlencoded,
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/article/" + values.id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  createArticle(values) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("name", values.name);
    urlencoded.append("description", values.description);
    urlencoded.append("price", values.price);
    urlencoded.append("type", values.type);
    urlencoded.append("image", values.image);
    urlencoded.append("restaurantId", values.restoID);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );

    var requestOptions = {
      method: "POST",
      body: urlencoded,
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/article/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  deleteArticle(id) {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/article/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  getURL(short) {
    return short ? this.shortURL : this.url;
  }

  getRestaurantByOwner(id) {
    return fetch(this.url + "/restaurant/owner/" + id, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (text) {
        return text;
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  updateRestaurant(values) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("name", values.name);
    urlencoded.append("address", values.address);
    urlencoded.append("opening", values.opening);
    urlencoded.append("closing", values.closing);
    urlencoded.append("status", values.status);
    urlencoded.append("image", values.image);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );

    var requestOptions = {
      method: "PUT",
      body: urlencoded,
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/restaurant/" + values._id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  updateMenu(values, menuContent) {
    var raw = JSON.stringify({
      content: menuContent,
      description: values.description,
      name: values.name,
      price: values.price,
      restaurantId: values.restaurantId,
    });

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PUT",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/menu/" + values._id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  createMenu(values, menuContent) {
    var raw = JSON.stringify({
      content: menuContent,
      description: values.description,
      name: values.name,
      price: values.price,
      restaurantId: values.restaurantId,
    });

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/menu/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  deleteMenu(id) {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/menu/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  createOrder(panier, idUser, idRestaurant, total) {
    var panierTotal = [];

    panier.map((article) => {
      console.log(article.type == "menu");
      if (article.type == "menu") {
        article.description.map((menuArticle) => {
          console.log(menuArticle);
          panierTotal = [...panierTotal, { _id: menuArticle }];
        });
      } else {
        panierTotal = [...panierTotal, { _id: article._id }];
      }
    });

    var raw = JSON.stringify({
      user: idUser,
      delivery: null,
      restaurant: idRestaurant,
      price: total,
      article: panierTotal,
      status: "pending",
    });

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/order", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  updateOrder(id, status, idLivreur) {
    var modif = {};
    if (status !== undefined) {
      modif = { ...modif, status: status };
    }
    if (idLivreur !== undefined) {
      modif = { ...modif, delivery: idLivreur };
    }

    var raw = JSON.stringify(modif);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PUT",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/order/" + id, requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  }

  SendMail(email) {
    var raw = JSON.stringify({
      to: email,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(this.url + "/service/recuperation", requestOptions).then(
      (response) => response.text()
    );
  }

  getUserByMail(email) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/users/email/" + email, requestOptions)
      .then((response) => response.json())
      .then(function (res) {
        return res;
      })
      .catch((error) => console.log("error", error));
  }

  changemdp(id, password, email, firstname, lastname, tel, address, role) {
    var raw = JSON.stringify({
      password: password,
      email: email,
      firstname: firstname,
      lastname: lastname,
      tel: tel,
      status: true,
      address: address,
      role: role,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PUT",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/users/recovery/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  SendParrainage(email) {
    var raw = JSON.stringify({
      to: email,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(this.url + "/service/parainage", requestOptions).then(
      (response) => response.json()
    );
  }

  ///

  testNotif() {
    var raw = JSON.stringify({
      user: "10001",
      delivery: "101",
      _id: "Je92sj93ks10Jd",
      restaurant: "62bacf13d970c189189e3ab4",
      status: "finished",
      price: 493,
      article: [{ _id: "abcde" }, { _id: "abcdee" }],
    });

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    return fetch(this.url + "/notifications/testnotif", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
}
