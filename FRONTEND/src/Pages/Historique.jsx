import { Typography, Container } from "@mui/material";
import BlocCommande from "../Components/BlocCommande";
import * as React from "react";
import API from "../API/API";
import Loading from "../Components/Loading";

function Historique(props) {
  const classAPI = new API();
  const [commande, setCommande] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    classAPI.getCommandeClient(localStorage.getItem('id')).then(function (response) {
      setCommande(response);
      setLoaded(true);
    });
  }, []);

  return !loaded ? (
    <Loading/>
   ) :(
    <Container>
      <Typography variant="h6" component="p">
        Historique des commandes
      </Typography>
      {commande.map((commande) => {
        return <BlocCommande sx={{ bgcolor: "primary.light" }} {...commande} />;
      })}
    </Container>
    );
}

export default Historique;
