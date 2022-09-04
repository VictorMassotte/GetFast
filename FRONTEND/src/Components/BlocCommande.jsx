import Typography from "@mui/material/Typography";
import theme from "../Theme/Light.jsx";
import { Grid } from "@mui/material";
import * as React from "react";
import API from "../API/API";
import Loading from "../Components/Loading";

function BlocCommande(props) {
  console.log(props);
  const classAPI = new API();
  const [resto, setResto] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const idResto = props.restaurant;

  React.useEffect(() => {
    classAPI.getRestaurant(idResto).then(function (response) {
      setResto(response);
      setLoaded(true);
    });
  }, []);

  return !loaded ? (
    <Loading />
  ) : (
    <Grid
      sx={{
        backgroundColor: "primary.light",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: 0.8,
        },
        px: theme.spacing(3),
        py: theme.spacing(1),
        boxShadow: 7,
        borderRadius: "10px",
        my: theme.spacing(2),
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="p"
            sx={{ color: "secondary.main" }}
          >
            {resto.restaurant.name}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", alignContent: "center", flexWrap: "wrap" }}
        >
          <Typography
            variant="h6"
            component="p"
            sx={{ fontSize: "16px", color: "primary.dark" }}
          >
            {"Commande : " + props._id}
          </Typography>
        </Grid>
      </Grid>
      <Grid sx={{ display: "flex" }}>
        <Grid container>
          <Grid item xs={6}>
            {props.article.map((article) => (
              <Typography sx={{ color: "white" }}>
                {
                  resto.article.find((element) => element._id === article._id)
                    .name
                }
              </Typography>
            ))}
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ color: "white" }}>
              Total :{" "}
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(props.price)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ color: "primary.dark" }}>
              {props.created.split("T")[0] +
                " " +
                props.created.split("T")[1].split(".")[0]}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ color: "primary.dark" }}>
              {props.status == "cooking"
                ? "En cuisine"
                : props.status == "delivering"
                ? "En livraison"
                : props.status == "finished"
                ? "Terminé"
                : props.status == "pending"
                ? "En attente"
                : "refusée"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BlocCommande;
