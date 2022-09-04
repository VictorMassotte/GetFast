import * as React from "react";
import Loading from "../../Components/Loading";
import API from "../../API/API";
import theme from "../../Theme/Light";
import {
  Container,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ProduitEdit from "../../Components/ProduitEdit";
import MenuEdit from "../../Components/MenuEdit";
import { type } from "@testing-library/user-event/dist/type";

function MonResto(props) {
  const [resto, setResto] = React.useState({});
  const [loaded, setLoaded] = React.useState(false);
  const [types, setTypes] = React.useState([]);
  const classAPI = new API();
  var temp = [];

  const updateResto = () => {
    classAPI.updateRestaurant(resto.restaurant).then((response) => {
      console.log(response);
    });
  };

  React.useEffect(() => {
    classAPI
      .getRestaurantByOwner(localStorage.getItem("id"))
      .then(function (response) {
        setResto(response);
        console.log(response);
        setLoaded(true);
      });
  }, []);

  React.useEffect(() => {
    if (loaded) {
      resto.article.forEach((article) => {
        temp = [...temp, article.type];
      });
      setTypes([...new Set(temp)]);
    }

    console.log(resto);
  }, [resto]);

  

  return !loaded ? (
    <Loading />
  ) : (
    <> 
      <Container sx={{ py: theme.spacing(2) }} maxWidth="md">
        <Typography
          variant="h4"
          component="p"
          sx={{ color: "primary.dark" }}
          id="Menus"
        >
          Informations Générales
        </Typography>

        <Container
          sx={{
            backgroundColor: "primary.light",
            py: theme.spacing(3),
            borderRadius: "10px",
          }}
        >
          <TextField
            id="Nom du restaurant"
            label="Nom du restaurant"
            variant="filled"
            value={resto.restaurant.name}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ py: theme.spacing(1) }}
            onChange={(e) => {
              setResto({
                ...resto,
                restaurant: { ...resto.restaurant, name: e.target.value },
              });
            }}
          />

          <TextField
            id="Adresse"
            label="Adresse"
            variant="filled"
            value={resto.restaurant.address}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ py: theme.spacing(1) }}
            onChange={(e) => {
              setResto({
                ...resto,
                restaurant: {
                  ...resto.restaurant,
                  address: e.target.value,
                },
              });
            }}
          />

          <TextField
            id="Image"
            label="Image (URL)"
            variant="filled"
            value={resto.restaurant.image}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ py: theme.spacing(1) }}
            onChange={(e) => {
              setResto({
                ...resto,
                restaurant: { ...resto.restaurant, image: e.target.value },
              });
            }}
          />

          <TextField
            id="Open"
            label="Horaire d'ouverture"
            variant="filled"
            value={resto.restaurant.opening.slice(0, 5)}
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ py: theme.spacing(1) }}
            onChange={(e) => {
              setResto({
                ...resto,
                restaurant: { ...resto.restaurant, opening: e.target.value },
              });
            }}
          />

          <TextField
            id="Open"
            label="Horaire de fermeture"
            variant="filled"
            value={resto.restaurant.closing.slice(0, 5)}
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ py: theme.spacing(1) }}
            onChange={(e) => {
              setResto({
                ...resto,
                restaurant: { ...resto.restaurant, closing: e.target.value },
              });
            }}
          />

          <FormControlLabel
            control={
              <Switch
                onChange={(e) => {
                  setResto({
                    ...resto,
                    restaurant: {
                      ...resto.restaurant,
                      status: e.target.checked ? "open" : false,
                    },
                  });
                }}
                defaultChecked={resto.restaurant.status === "open" ? true : false}
              />
            }
            label="Ouvert"
          />

          <Button
            variant="contained"
            sx={{
              borderRadius: 8,
              backgroundColor: "secondary.main",
              textTransform: "capitalize",
              height: "70%",
              mt: theme.spacing(1),
            }}
            onClick={updateResto}
          >
            Modifier
          </Button>
        </Container>

        <Typography
          variant="h4"
          component="p"
          sx={{ color: "primary.dark", mt: theme.spacing(2) }}
          id="Menus"
        >
          Articles
        </Typography>

        <Container
          sx={{
            backgroundColor: "primary.light",
            py: theme.spacing(3),
            borderRadius: "10px",
          }}
        >
          {resto.article.map((article) => {
            return <ProduitEdit {...article} restoID={resto.restaurant._id} />;
          })}

          <ProduitEdit new={true} restoID={resto.restaurant._id} />
        </Container>

        <Typography
          variant="h4"
          component="p"
          sx={{ color: "primary.dark", mt: theme.spacing(2) }}
          id="Menus"
        >
          Menus
        </Typography>

        <Container
          sx={{
            backgroundColor: "primary.light",
            py: theme.spacing(3),
            borderRadius: "10px",
          }}
        >
          {resto.menu.map((menu) => {
            return <MenuEdit {...menu} types={types} />;
          })}

          <MenuEdit new={true} types={types} restaurantId={resto.restaurant._id}/>
        </Container>
      </Container>
    </>
  );
}

export default MonResto;
