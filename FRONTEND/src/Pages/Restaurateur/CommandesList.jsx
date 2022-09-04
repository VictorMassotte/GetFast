import { Container, Typography, Box, Fab } from "@mui/material";
import theme from "../../Theme/Light.jsx";
import API from "../../API/API";
import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function CommandesList(props) {
  const [commandes, setCommandes] = useState([]);
  const [articles, setArticles] = useState([]);
  const classAPI = new API();

  useEffect(() => {
    classAPI
      .getRestaurantByOwner(localStorage.getItem("id"))
      .then((response) => {
        classAPI.getCommandeRestaurant(response.restaurant._id).then((res) => {
          setCommandes(res.restaurant);
          setArticles(res.article);
          console.log(res);
        });
      });
  }, []);

  const refuserCommande = (id) => {
    classAPI
      .updateOrder(id, "declined")
      .then(window.location.replace("/restaurateur/commandes"))
      .catch((err) => console.log(err));
  };

  const accepterCommande = (id) => {
    classAPI
      .updateOrder(id, "cooking")
      .then(window.location.replace("/restaurateur/commandes"))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Typography variant="h6" component="p">
        Commandes en attente
      </Typography>
      {commandes.map((commande) => {
        if (commande.status == "pending" || commande.status == "cooking") {
          return (
            <Container
              sx={{
                backgroundColor: "primary.light",
                py: theme.spacing(2),
                mt: theme.spacing(2),
                borderRadius: "10px",
                boxShadow: 7,
              }}
            >
              <Typography variant="h6">Commande {commande._id}</Typography>
              <Typography>
                Date :{" "}
                {commande.created.split("T")[0] +
                  " " +
                  commande.created.split("T")[1].split(".")[0]}
              </Typography>

              <Box>
                {commande.article.map((article) => {
                  return (
                    <Typography
                      sx={{
                        color: "primary.dark",
                      }}
                    >
                      <li>
                        {
                          articles.find(
                            (element) => element._id === article._id
                          ).name
                        }
                      </li>
                    </Typography>
                  );
                })}

                <Typography>Statut : {commande.status}</Typography>
                <Typography variant="h4" sx={{color : "secondary.main"}}>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(commande.price)}
                </Typography>

                {commande.status == "pending" ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      mt: theme.spacing(2),
                      py : theme.spacing(1),
                      borderRadius : "10px",
                      backgroundColor : "primary.main",
                      boxShadow: 4
                    }}
                  >
                    <Fab
                      size="medium"
                      sx={{
                        backgroundColor: "#66BB6A",
                        "&:hover": {
                          backgroundColor: "#388e3c",
                          opacity: 0.9,
                        },
                        color: "white",
                      }}
                      onClick={() => accepterCommande(commande._id)}
                    >
                      <CheckIcon />
                    </Fab>
                    <Fab
                      size="medium"
                      sx={{
                        backgroundColor: "#F44336",
                        "&:hover": {
                          backgroundColor: "#d32f2f",
                          opacity: 0.9,
                        },
                        color: "white",
                      }}
                      onClick={() => refuserCommande(commande._id)}
                    >
                      <CloseIcon />
                    </Fab>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </Container>
          );
        }
      })}
    </Container>
  );
}

export default CommandesList;
