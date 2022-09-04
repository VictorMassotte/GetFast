import { Typography, Container, Box, Fab, Divider } from "@mui/material";
import theme from "../Theme/Light.jsx";
import CheckIcon from "@mui/icons-material/Check";
import React, { useState, useEffect } from "react";
import API from "../API/API.jsx";
import Loading from "../Components/Loading";

function NouvelleCommande(props) {
  const [resto, setResto] = useState();
  const [client, setClient] = useState();
  const [loaded, setLoaded] = useState(false);
  const [loaded1, setLoaded1] = useState(false);
  const classAPI = new API();

  const handleAccept = () => {
    classAPI
    .updateOrder(props._id, "cooking", localStorage.getItem("id"))
    .then(() => {
      window.location.replace("/livreur/livraisonrestaurant/"+props._id)
    })

  }

  useEffect(() => {
    classAPI.getUser(props.user).then((res) => {
      setClient(res);
      setLoaded(true);
    });
    classAPI.getRestaurant(props.restaurant).then((res) => {
      setResto(res);
      setLoaded1(true);
    });
  }, []);

  return loaded == false || loaded1 == false ? (
    <Loading />
  ) : (
    <Container
      sx={{
        backgroundColor: "primary.light",
        py: theme.spacing(2),
        mt: theme.spacing(2),
        borderRadius: "10px",
        boxShadow: 7,
      }}
    >
      <Box>
        <Typography variant="h6" component="p">
          Commande {props._id}
        </Typography>

        <Divider sx={{ mb: theme.spacing(2) }} />

        <Typography variant="h6" component="p">
          Client :
        </Typography>
        <Typography
          sx={{
            lineHeight: 1,
            color: "primary.dark",
          }}
        >
           {client[0].firstname + " " + client[0].lastname}
        </Typography>
        <Typography variant="h6" component="p">
          Adresse de livraison :
        </Typography>
        <Typography
          sx={{
            lineHeight: 1,
            color: "primary.dark",
          }}
        >
          {client[0].address}
        </Typography>
        <Typography variant="h6" component="p">
          Numéro de Téléphone :
        </Typography>
        <Typography
          sx={{
            lineHeight: 1,
            color: "primary.dark",
          }}
        >
          {client[0].tel}
        </Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{
            color: " #ffffff",
            lineHeight: 1,
            mt: theme.spacing(2),
            mb: theme.spacing(0),
          }}
        >
          {resto.restaurant.name}
        </Typography>

        <Typography variant="h6" component="p">
          Adresse du restaurant :
        </Typography>
        <Typography
          sx={{
            lineHeight: 1,
            color: "primary.dark",
            mb: theme.spacing(5),
          }}
        >
          {resto.restaurant.address}
        </Typography>

        {props.article.map((article) => (
          <Typography
            sx={{
              color: "primary.dark",
            }}
          >
            <li>
              {
                resto.article.find((element) => element._id === article._id)
                  .name
              }
            </li>
          </Typography>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            mt: theme.spacing(2),
            py: theme.spacing(1),
            borderRadius: "10px",
            backgroundColor: "primary.main",
            boxShadow: 4,
          }}
        >
          <Fab
            onClick={handleAccept}
            size="medium"
            sx={{
              backgroundColor: "#66BB6A",
              "&:hover": {
                backgroundColor: "#388e3c",
                opacity: 0.9,
              },
              color: "white",
            }}
          >
            <CheckIcon />
          </Fab>
        </Box>
      </Box>
    </Container>
  );
}

export default NouvelleCommande;
