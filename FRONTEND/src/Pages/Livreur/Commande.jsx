import { Container, Typography } from "@mui/material";
import NouvelleCommande from "../../Components/NouvelleCommande";
import React, { useState, useEffect } from "react";
import API from "../../API/API";
function Commande(props) {

  const [commandes, setCommandes] = useState([]);
  const classAPI = new API();

  useEffect(() => {
    classAPI.getCommandes().then((res) => {
      setCommandes(res);
      console.log(res);
    });
  }, []);

  return (
    <Container>
      <Typography variant="h6" component="p">
        Commandes en attente
      </Typography>
      {commandes.map((commande) => {
        if (commande.status == "cooking" && commande.delivery == null) {
          return (
            <NouvelleCommande sx={{ bgcolor: "primary.light" }} {...commande} />
          );
        }
      })}
    </Container>
  );
}

export default Commande;
