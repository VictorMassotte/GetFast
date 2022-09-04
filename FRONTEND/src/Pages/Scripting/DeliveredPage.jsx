import Typography from "@mui/material/Typography";
import theme from "../../Theme/Light.jsx";
import React, { useEffect, useState } from "react";
import { Container, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import API from "../../API/API.jsx";
import Loading from "../../Components/Loading.jsx";
import { makeStyles } from "@mui/styles";
import logo from "../../Images/logo.png";
function DeliveredPage(props) {
  const classAPI = new API();
  const [commande, setCommande] = useState();
  const [loaded1, setLoaded1] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [resto, setResto] = useState();
  const [livreur, setLivreur] = useState();
  const params = useParams();
  const idOrder = params.idOrder;
  classAPI.updateOrder(idOrder, "finished");

  const useStyles = makeStyles({
    logo : {
        width : "40px"
    }
  });
  const classes = useStyles();

  useEffect(() => {
    classAPI.getCommande(idOrder).then((res) => {
      setCommande(res);
      console.log(res);
      classAPI.getRestaurant(res.restaurant).then((response) => {
        setResto(response);
        setLoaded1(true);
        console.log(response);
      });
      classAPI.getUser(res.delivery).then((resp) => {
        setLivreur(resp);
        setLoaded(true);
      });
    });
  }, []);


  return (loaded == false || loaded1 == false) ? (
    <Loading />
  ) : ( 
    <Container
      sx={{
        backgroundColor: "secondary.main",
        my: theme.spacing(3),
        py: theme.spacing(5),
        borderRadius : "0px 0px 20px 20px",
        boxShadow : 4
      }}
      maxWidth="sm"
    >
      <Typography variant="h4" sx={{ color: "primary.dark" }}>
        {" "}
        Bon Appétit
      </Typography>
      <Divider sx={{ mt: theme.spacing(3) }} />

      <Typography sx={{ mb: theme.spacing(2) }}>Commande {idOrder}</Typography>

      <Typography variant="h4">{resto.restaurant.name}</Typography>

      <Typography variant="h6" sx={{ fontSize: "14px" }}>
        {resto.restaurant.address}
      </Typography>
      {commande.article.map((article) => {
        return (
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
        );
      })}

      <Typography variant="h4" sx={{ color: "white" }}>
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(commande.price)}
      </Typography>

      <Divider sx={{ mt: theme.spacing(3) }} />

      <Typography sx={{color : "white"}}>
        Livrée par {livreur[0].firstname + " " + livreur[0].lastname}
      </Typography>
      <img src={logo} className={classes.logo} />
    </Container>
  );
}

export default DeliveredPage;
