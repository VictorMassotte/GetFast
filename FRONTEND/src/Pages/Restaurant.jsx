import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Fab, Container, Chip, Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import theme from "../Theme/Light";
import Menu from "../Components/Menu";
import Produit from "../Components/Produit";
import Panier from "../Layout/Panier";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Loading from "../Components/Loading";
import API from "../API/API";

function Restaurant(props) {
  const useStyles = makeStyles({
    textMain: {
      color: theme.palette.primary.dark,
      [theme.breakpoints.down("sm")]: {
        fontSize: "30px !important",
      },
    },
    layout : {
      height : "50vh",
      [theme.breakpoints.down('sm')]: {
        height: "30vh",
      }
    }
  });

  const classes = useStyles();
  const params = useParams();
  const restoID = params.restoID;
  const classAPI = new API();
  const [resto, setResto] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [types, setTypes] = React.useState([]);
  const [panierList, setPanierList] = React.useState([]);
  var temp = [];

  const addFunc = (data) => {
    setPanierList([...panierList, data]);
  };

  const removeFunc = (data) => {
    const index = panierList.findIndex((object) => {
      return object.name === data.name;
    });
    if (index > -1) {
      setPanierList(
        panierList.filter(function (value, i) {
          return i !== index;
        })
      );
    }
  };

  const deleteAllFunc = () => {
    setPanierList([])
  }

  // React.useEffect(() => {
  //   console.log(panierList);
  // }, [panierList]);

  React.useEffect(() => {
    classAPI.getRestaurant(restoID).then(function (response) {
      setResto(response);
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

    console.log(resto)
  }, [resto]);
 
  return !loaded ? (
   <Loading/>
  ) : (
    <>
      <Box
        sx={{
          py: theme.spacing(2),
          px: theme.spacing(2),
          backgroundColor: "#758BFD",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "space-between",
            justifyContent: "space-between",
          }}
        >
          <Link href="/">
            <Fab
              size="medium"
              sx={{
                backgroundColor: "primary.dark",
                color: "white",
                mb: theme.spacing(0),
              }}
            >
              <ArrowForwardIcon
                fontSize="large"
                sx={{ transform: "rotate(-180deg)" }}
              />
            </Fab>
          </Link>
          <Typography variant="h4" component="p" sx={{ color: "white" }}>
            {resto.restaurant.name}
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="xl"
        className = {classes.layout}
        sx={{
          backgroundImage: `url(${resto.restaurant.image})`,
          backgroundSize: "100%",
          backgroundPosition: "center",
        }}
      />

      <Container maxWidth="xl" sx={{ my: theme.spacing(2) }}>
        {types.map(function (key, value) {
          return (
            <Link href={"#" + key}>
              <Chip
                label={key}
                clickable
                sx={{
                  mr: theme.spacing(1),
                  mt: theme.spacing(1),
                  color: "white",
                  backgroundColor: "secondary.main",
                  boxShadow: 10,
                  fontSize: "2vh",
                }}
              />
            </Link>
          );
        })}
      </Container>

      <Container maxWidth="xl">
        {resto.menu.length == 0 ? (
          ""
        ) : (
          <>
            <Typography
              variant="h4"
              component="p"
              sx={{ color: "primary.dark" }}
              id="Menus"
            >
              Menus
            </Typography>

            {resto.menu.map((menu) => {
              return (
                <Menu {...menu} addFunc={addFunc} carte={resto} type={types} />
              );
            })}
          </>
        )}

        {types.map(function (value, key) {
          return (
            <>
              <Typography
                variant="h4"
                component="p"
                id={value}
                className={classes.textMain}
                sx={{ textTransform: "capitalize;" }}
              >
                {value}
              </Typography>

              {resto.article.map((produit) => {
                if (produit.type === value) {
                  return (
                    <Produit
                      {...produit}
                      addFunc={addFunc}
                      removeFunc={removeFunc}
                      panier={panierList}
                    />
                  );
                }
              })}
            </>
          );
        })}
      </Container>
      <Panier panier={panierList} removeFunc={removeFunc} deleteAll={deleteAllFunc} restoID={restoID} />
    </>
  );
}

export default Restaurant;
